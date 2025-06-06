function expandBox(originalDiv) {
  // Remove any existing modal
  const existing = document.querySelector('.fullscreen');
  if (existing) existing.remove();

  // Create overlay
  const fullscreenDiv = document.createElement('div');
  fullscreenDiv.className = 'fullscreen';

  // Create modal content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'fullscreen-content';
  contentDiv.innerHTML = `<h2>${originalDiv.textContent}</h2>`;

  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerText = 'Close';
  closeBtn.onclick = () => {
    document.body.removeChild(fullscreenDiv);
    document.body.style.overflow = 'auto';
  };

  contentDiv.appendChild(closeBtn);
  fullscreenDiv.appendChild(contentDiv);
  document.body.appendChild(fullscreenDiv);

  // Prevent background scroll
  document.body.style.overflow = 'hidden';
}
