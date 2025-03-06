import eventlet
import os, shutil, tempfile, threading, uuid, time, re, sys, logging, subprocess, glob, json
from flask import Flask, render_template, request, send_file, jsonify
from flask_socketio import SocketIO, emit
import yt_dlp as youtube_dl
import eventlet.timeout

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins='*', logger=True, engineio_logger=True)


## Setup logging
from logging.handlers import RotatingFileHandler
#log_handler = RotatingFileHandler('app.log', maxBytes=100000, backupCount=5)
#log_handler.setLevel(logging.INFO)
#formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
#log_handler.setFormatter(formatter)
#app.logger.addHandler(log_handler)
#app.logger.setLevel(logging.INFO)

# Global store for conversion jobs
jobs = {}

# Set paths for FFmpeg/FFprobe – adjust as needed
if os.name == 'nt':
    FFMPEG_PATH = os.path.abspath(r"C:\ffmpeg\bin\ffmpeg.exe")
    FFPROBE_PATH = os.path.abspath(r"C:\ffmpeg\bin\ffprobe.exe")
else:
    FFMPEG_PATH = "ffmpeg"
    FFPROBE_PATH = "ffprobe"

def clean_ansi(text):
    """Remove ANSI escape sequences from a string."""
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return ansi_escape.sub('', text).strip()

def extract_percentage(percent_str):
    """Extract a float percentage from a string."""
    try:
        clean_str = clean_ansi(percent_str)
        match = re.search(r'(\d+\.?\d*)', clean_str)
        return float(match.group(1)) if match else 0.0
    except Exception as e:
        app.logger.error(f"Error extracting percentage: {e}")
        return 0.0

def get_duration(file_path):
    """Return duration (in seconds) of the media file using ffprobe."""
    try:
        cmd = [FFPROBE_PATH, "-v", "error", "-show_entries", "format=duration",
               "-of", "default=noprint_wrappers=1:nokey=1", file_path]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        return float(result.stdout.strip())
    except Exception as e:
        app.logger.error(f"Error getting duration for {file_path}: {e}")
        return 0.0

def schedule_cleanup(job_id, delay=60):
    """Schedule deletion of the temporary job folder after a delay (in seconds)."""
    def cleanup_job():
        time.sleep(delay)
        job = jobs.get(job_id)
        if job:
            try:
                shutil.rmtree(job['temp_dir'], ignore_errors=True)
                del jobs[job_id]
                app.logger.info(f"Cleaned up job {job_id}")
            except Exception as e:
                app.logger.error(f"Cleanup error for job {job_id}: {e}")
    threading.Thread(target=cleanup_job, daemon=True).start()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect', namespace='/progress')
def on_connect():
    app.logger.info(f"Client connected: {request.sid}")
    emit('connect_response', {'status': 'connected'})

@socketio.on('disconnect', namespace='/progress')
def on_disconnect():
    app.logger.info(f"Client disconnected: {request.sid}")

def send_progress(job_id, percent, eta=None):
    try:
        with app.app_context():
            socketio.emit(
                'conversion_progress',
                {
                    'job_id': job_id,
                    'percentage': round(percent, 2),
                    'estimated': eta
                },
                namespace='/progress'
            )
            app.logger.info(f"Emitted progress: {percent}% with ETA: {eta}s for job {job_id}")

    except Exception as e:
        app.logger.error(f"Error sending progress update: {e}")

@app.route('/get_info', methods=['POST'])
def get_info():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'error': 'Missing URL'}), 400
    try:
        opts = {'quiet': True, 'skip_download': True, 'noplaylist': True}
        with youtube_dl.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(url, download=False)
        return jsonify({
            'title': info.get('title', 'No Title'),
            'thumbnail': info.get('thumbnail', ''),
            'duration': info.get('duration', 0)
        })
    except Exception as e:
        app.logger.error(f"Error fetching video info: {e}")
        return jsonify({'error': str(e)}), 400

@app.route('/start_conversion', methods=['POST'])
def start_conversion():
    data = request.get_json()
    url = data.get('url')
    fmt = data.get('format')
    supported_formats = ['mp3_128', 'mp3_256', 'mp3_320', 'mp4_best', 'mp4_720', 'mp4_1024']
    if not url or fmt not in supported_formats:
        return jsonify({'error': 'Invalid URL or unsupported format'}), 400

    temp_dir = tempfile.mkdtemp()
    job_id = str(uuid.uuid4())
    jobs[job_id] = {'temp_dir': temp_dir, 'file_path': None, 'cleanup_scheduled': False}
    app.logger.info(f"Starting job {job_id} for format {fmt}")

    def yt_progress_hook(status):
        if status.get('status') == 'downloading' and '_percent_str' in status:
            try:
                percent = extract_percentage(status['_percent_str'])
                eta = status.get('eta', 0)
                send_progress(job_id, percent, status.get('eta'))
            except Exception as e:
                app.logger.error(f"Progress hook error: {e}")

    if fmt.startswith('mp3'):
        output_template = os.path.join(temp_dir, '%(title)s.%(ext)s')
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_template,
            'progress_hooks': [yt_progress_hook],
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': fmt.split('_')[1],
            }],
            'ffmpeg_location': FFMPEG_PATH,
            'ffprobe_location': FFPROBE_PATH,
            'restrictfilenames': True,
        }
        final_ext = '.mp3'
    else:
        output_template = os.path.join(temp_dir, '%(title)s.mp4')
        if fmt == 'mp4_best':
            video_fmt = 'bestvideo+bestaudio/best'
        elif fmt == 'mp4_720':
            video_fmt = 'bestvideo[height<=720]+bestaudio/best'
        elif fmt == 'mp4_1024':
            video_fmt = 'bestvideo[height<=1024]+bestaudio/best'
        else:
            video_fmt = 'bestvideo+bestaudio/best'
        ydl_opts = {
            'format': video_fmt,
            'outtmpl': output_template,
            'progress_hooks': [yt_progress_hook],
            'merge_output_format': 'mp4',
            'ffmpeg_location': FFMPEG_PATH,
            'ffprobe_location': FFPROBE_PATH,
            'restrictfilenames': True,
            'keep_fragments': True,
        }
        final_ext = '.mp4'

    def conversion_thread(job_id, url, opts):
        try:
            with eventlet.timeout.Timeout(300):
                with youtube_dl.YoutubeDL(opts) as ydl:
                    info = ydl.extract_info(url, download=True)
            final_file = info.get('_filename')
            if final_file and os.path.exists(final_file):
                app.logger.info(f"Final file found: {final_file}")
                send_progress(job_id, 100, 0)
            else:
                # For MP3 conversion, check for the extracted mp3 file
                if opts.get('postprocessors'):
                    mp3_files = glob.glob(os.path.join(jobs[job_id]['temp_dir'], "*.mp3"))
                    if len(mp3_files) == 1:
                        final_file = mp3_files[0]
                        app.logger.info("Single MP3 file found; using it directly.")
                        send_progress(job_id, 100, 0)
                    elif len(mp3_files) > 1:
                        final_file = max(mp3_files, key=os.path.getsize)
                        app.logger.info("Multiple MP3 files found; using the largest one.")
                        send_progress(job_id, 100, 0)
                    else:
                        raise Exception("Conversion failed: MP3 file not found")
                else:
                    # MP4 branch: try to locate an MP4 file
                    mp4_files = glob.glob(os.path.join(jobs[job_id]['temp_dir'], "*.mp4"))
                    if len(mp4_files) == 1:
                        final_file = mp4_files[0]
                        app.logger.info("Single MP4 file found; using it directly without merging.")
                        send_progress(job_id, 100, 0)
                    elif len(mp4_files) > 1:
                        final_file = max(mp4_files, key=os.path.getsize)
                        app.logger.info("Multiple MP4 files found; using the largest one.")
                        send_progress(job_id, 100, 0)
                    else:
                        app.logger.info("Merged file not found; attempting manual merge with progress updates.")
                        parts = glob.glob(os.path.join(jobs[job_id]['temp_dir'], "*.webm"))
                        if len(parts) < 2:
                            raise Exception("Merging failed: not enough parts found for manual merge.")
                        parts.sort(key=lambda p: os.path.getsize)
                        video_file = parts[-1]
                        audio_file = parts[0]
                        manual_merge = os.path.join(jobs[job_id]['temp_dir'], os.path.basename(output_template).replace('.mp4', '_manual.mp4'))
                        total_duration = get_duration(video_file)
                        total_duration_ms = total_duration * 1000
                        ffmpeg_cmd = [
                            FFMPEG_PATH, "-y", "-i", video_file, "-i", audio_file,
                            "-c", "copy", "-movflags", "faststart",
                            "-progress", "pipe:1", "-nostats", manual_merge
                        ]
                        app.logger.info("Running manual merge: " + " ".join(ffmpeg_cmd))
                        proc = subprocess.Popen(ffmpeg_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
                        for line in proc.stdout:
                            line = line.strip()
                            if line.startswith("out_time_ms="):
                                try:
                                    out_time_ms = int(line.split("=")[1])
                                    if total_duration_ms > 0:
                                        percent = (out_time_ms / total_duration_ms) * 100
                                        send_progress(job_id, percent, None)
                                except Exception as e:
                                    app.logger.error(f"Error parsing progress: {e}")
                            if "progress=end" in line:
                                break
                        proc.wait()
                        if proc.returncode != 0 or not os.path.exists(manual_merge):
                            stderr = proc.stderr.read()
                            app.logger.error("Manual merge failed: " + stderr)
                            raise Exception("Manual merge failed")
                        final_file = manual_merge
                        send_progress(job_id, 100, 0)
            jobs[job_id]['file_path'] = final_file
            app.logger.info(f"Job {job_id} completed. Final file at {final_file}")
            download_url = f"/download_file/{job_id}"
            # Send a conversion_complete event with a Thank You message
            with app.app_context():
                socketio.emit(
                    'conversion_complete',
                    {
                        'job_id': job_id,
                        'download_url': download_url,
                        'message': "Conversion complete! Thank you for using our service."
                    },
                    namespace='/progress'
                )
        except Exception as e:
            app.logger.error(f"Conversion error in job {job_id}: {e}")
            with app.app_context():
                socketio.emit(
                    'conversion_error',
                    {'job_id': job_id, 'error': str(e)},
                    namespace='/progress'
                )

    # Start the conversion in a background task
    socketio.start_background_task(conversion_thread, job_id, url, ydl_opts)
    return jsonify({'job_id': job_id})

@app.route('/download_file/<job_id>')
def download_file(job_id):
    job = jobs.get(job_id)
    if not job or not job.get('file_path'):
        return "Job not found or conversion not complete", 404
    file_path = job['file_path']
    filename = os.path.basename(file_path)
    if not job.get('cleanup_scheduled'):
        job['cleanup_scheduled'] = True
        schedule_cleanup(job_id, delay=60)
    mimetype = 'video/mp4' if file_path.endswith('.mp4') else (
        'video/x-matroska' if file_path.endswith('.mkv') else 'audio/mpeg')
    try:
        return send_file(file_path, as_attachment=True, download_name=filename, mimetype=mimetype)
    except Exception as e:
        app.logger.error(f"Error sending file for job {job_id}: {e}")
        return "Error sending file", 500

if __name__ == '__main__':
    if not os.path.exists(FFMPEG_PATH):
        print(f"ERROR: FFmpeg not found at {FFMPEG_PATH}")
        sys.exit(1)
    print(f"Using FFmpeg from: {FFMPEG_PATH}")
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
