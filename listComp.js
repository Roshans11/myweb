function expandBox(originalDiv) {
    // Create overlay element
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.classList.add('fullscreen');

    // Copy the original div content
    fullscreenDiv.innerHTML = originalDiv.innerHTML;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.textContent = 'Close';

    // Attach close logic
    closeBtn.onclick = () => {
      document.body.removeChild(fullscreenDiv);
    };

    // Add the button inside the fullscreen box
    fullscreenDiv.appendChild(closeBtn);

    // Append to body
    document.body.appendChild(fullscreenDiv);
  }
  document.body.style.overflow = 'hidden';  // when opened
  document.body.style.overflow = 'auto';    // when closed
