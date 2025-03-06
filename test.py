import subprocess

def check_ffmpeg():
    try:
        result = subprocess.run(
            [r"C:\ffmpeg\bin\ffmpeg.exe", "-version"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
            text=True  # Returns output as a string in Python 3.7+
        )
        print("FFmpeg is working!")
        print(result.stdout.splitlines()[0])  # Prints the first line, e.g., version info
    except subprocess.CalledProcessError as e:
        print("FFmpeg call failed:", e.stderr)
    except FileNotFoundError:
        print("FFmpeg is not found. Make sure it is installed and in your PATH.")

if __name__ == "__main__":
    check_ffmpeg()
