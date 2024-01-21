// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-7UeCLuaHnycVQi5ak9HZwkGfz186b6c",
  authDomain: "syslab-blogs.firebaseapp.com",
  projectId: "syslab-blogs",
  storageBucket: "syslab-blogs.appspot.com",
  messagingSenderId: "16046735004",
  appId: "1:16046735004:web:80f4539a703fd45d763759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function signupFunc(event) {
  event.preventDefault();
  console.log("signupFunc");
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      console.log(user, "success");
      alert("Account has been created successfully!");
      window.location.href = "./index.html";
    })
    .catch(function (error) {
      console.log(error, "error");
    });
}

function loginFunc(event) {
  event.preventDefault();
  console.log("login");

  const email_login = document.getElementById("email").value;
  const password_login = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email_login, password_login)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem("uid", user.uid);
      alert("Successfully Login");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorCode}: ${errorMessage}`);
    });
}

window.addEventListener("load", function () {
  console.log("blog load");
  var uid = localStorage.getItem("uid");
  console.log(uid, "uid");

  if (uid) {
    alert("Successfully Login");
    location.replace("./dashboard.html");
    return;
  }
});

// Function assignments
window.signupFunc = signupFunc;
window.loginFunc = loginFunc;
