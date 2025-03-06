document.addEventListener("DOMContentLoaded", () => {
    const videoUrlInput = document.getElementById("videoUrl");
    const fetchInfoBtn = document.getElementById("fetchInfoBtn");
    const previewSection = document.getElementById("previewSection");
    const videoThumbnail = document.getElementById("videoThumbnail");
    const videoTitle = document.getElementById("videoTitle");
    const videoDuration = document.getElementById("videoDuration");
    const progressModal = document.getElementById("progressModal");
    const progressValue = document.getElementById("progressValue");
    const progressFill = document.getElementById("progressFill");
    const estimatedTime = document.getElementById("estimatedTime");
    const downloadLinkContainer = document.getElementById("downloadLink");
    const downloadAnchor = downloadLinkContainer.querySelector("a");
  
    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
      });
    });
  
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
    // Socket.IO connection
    const socket = io(location.protocol + "//" + document.domain + ":" + location.port + "/progress");
  
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  
    socket.on("conversion_progress", (data) => {
        progressValue.innerText = `${data.percentage}%`;
        progressFill.style.width = `${data.percentage}%`;
        if (data.estimated !== undefined) {
            estimatedTime.innerText = "Estimated time remaining: " + formatTime(data.estimated);
        }
    });
  
  
    socket.on("conversion_complete", (data) => {
        progressModal.style.display = "none";
        downloadAnchor.href = data.download_url;
        downloadAnchor.style.display = "block";
        downloadAnchor.innerText = "Download complete! Thank you for using our service.";
        // Optionally, automatically trigger the download
        downloadAnchor.click();
    });
  
  
    socket.on("conversion_error", (data) => {
      alert("Conversion error: " + data.error);
      progressModal.style.display = "none";
    });
  
    fetchInfoBtn.addEventListener("click", async () => {
      const url = videoUrlInput.value.trim();
      if (!url) {
        alert("Please enter a URL");
        return;
      }
      try {
        const resp = await fetch("/get_info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await resp.json();
        if (data.error) {
          alert(data.error);
          return;
        }
        videoThumbnail.src = data.thumbnail;
        videoTitle.innerText = data.title;
        videoDuration.innerText = data.duration;
        previewSection.style.display = "block";
      } catch (err) {
        alert("Error fetching info: " + err);
      }
    });
  
    document.addEventListener("click", async (e) => {
      if (!e.target.classList.contains("downloadBtn")) return;
      const format = e.target.getAttribute("data-format");
      const url = videoUrlInput.value.trim();
      if (!url) {
        alert("Please fetch the video info first or enter a URL.");
        return;
      }
      progressModal.style.display = "flex";
      progressValue.innerText = "0%";
      progressFill.style.width = "0%";
      estimatedTime.innerText = "Estimated time remaining: -- s";
      try {
        const response = await fetch("/start_conversion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, format }),
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
          progressModal.style.display = "none";
        }
      } catch (error) {
        alert(error.message || "An error occurred while starting the conversion");
        progressModal.style.display = "none";
      }
    });
  });
  