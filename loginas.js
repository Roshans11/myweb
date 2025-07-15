
  document.querySelectorAll('.login-box').forEach(box => {
    box.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      setTimeout(() => ripple.remove(), 600);
    });
  });


