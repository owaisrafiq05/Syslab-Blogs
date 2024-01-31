// All the coding done by Owais Rafiq 
// linkedin id: https://www.linkedin.com/in/owais-rafiq-639494253/
// to access to the dashboard only use google account
// email: blog@syslab.ai
// Password: Blog@ai321!
//else you cannot to access in the dashboard so it is necesssary to login with this account


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
   signInWithPopup, 
   GoogleAuthProvider,
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


let google = document.getElementById("google");
const provider = new GoogleAuthProvider();
google.addEventListener("click",() => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      if(user.uid === "9MMFjmwUloSzSh55BLasqFZo2cy1"){
      localStorage.setItem("uid", user.uid);
      window.location.href = "dashboard.html";
      }
      else{
        alert("You are not authorized to access this dashboard.");
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})





// function signupFunc(event) {
//   event.preventDefault();
//   console.log("signupFunc");
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(function (userCredential) {
//       var user = userCredential.user;
//       console.log(user, "success");
//       alert("Account has been created successfully!");
//       window.location.href = "./index.html";
//     })
//     .catch(function (error) {
//       console.log(error, "error");
//     });
// }

function loginFunc(event) {
  event.preventDefault();
  console.log("login");

  const email_login = document.getElementById("email").value;
  const password_login = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email_login, password_login)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if(user.uid === "9MMFjmwUloSzSh55BLasqFZo2cy1"){
        localStorage.setItem("uid", user.uid);
        alert("Successfully Login");
        window.location.href = "dashboard.html";
        }
        else{
          alert("You are not authorized to access this dashboard.");
        }
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
