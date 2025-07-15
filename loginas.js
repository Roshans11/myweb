
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


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4nxSgmQNGKuVYz2Ky-pZNO3yQA74Khm0",
  authDomain: "talenttue1.firebaseapp.com",
  projectId: "talenttue1",
  storageBucket: "talenttue1.firebasestorage.app",
  messagingSenderId: "817921616402",
  appId: "1:817921616402:web:254062709e55de0fd746cb",
  measurementId: "G-M1HTSTE4DW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!email || !password) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    message.style.color = "#00ff99";
    message.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html"; // or home page after login
    }, 2000);
  } catch (err) {
    message.style.color = "#ff6666";
    message.textContent = "Error: " + err.message;
  }
};
