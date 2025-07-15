
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
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
const db = getFirestore(app);

window.signup = async () => {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (!fullName || !email || !password || !confirmPassword) {
    message.textContent = "Please fill out all fields.";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: fullName });

    await setDoc(doc(db, "users", userCred.user.uid), {
      fullName,
      email,
      role: "user"
    });

    message.style.color = "#99ff99";
    message.textContent = "Signup successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (err) {
    message.textContent = "Error: " + err.message;
  }
};
