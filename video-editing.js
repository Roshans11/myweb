function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function uploadVideo() {
  const input = document.getElementById("fileInput");
  const gallery = document.getElementById("gallery");
  const status = document.getElementById("uploadStatus");

  if (!input.files.length) {
    status.textContent = "Please select a file!";
    return;
  }

  const file = input.files[0];
  const videoURL = URL.createObjectURL(file);

  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `
    <video controls src="${videoURL}"></video>
    <div class="actions">
      <i class="fas fa-thumbs-up" onclick="likeVideo(this)"></i>
      <i class="fas fa-comment" onclick="commentVideo()"></i>
      <i class="fas fa-share" onclick="shareVideo('${videoURL}')"></i>
      <i class="fas fa-trash" onclick="this.parentElement.parentElement.remove()"></i>
    </div>
  `;

  gallery.prepend(card);
  input.value = '';
  status.textContent = "Upload successful!";
}

function likeVideo(el) {
  el.classList.toggle('liked');
  el.style.color = el.classList.contains('liked') ? '#e17055' : '#636e72';
}

function commentVideo() {
  const comment = prompt("Leave a comment:");
  if (comment) {
    alert("Comment added: " + comment);
  }
}

function shareVideo(link) {
  navigator.clipboard.writeText(link);
  alert("Video link copied to clipboard!");
}
