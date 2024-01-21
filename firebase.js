import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

import{
    push,
    child,
}
from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-7UeCLuaHnycVQi5ak9HZwkGfz186b6c",
    authDomain: "syslab-blogs.firebaseapp.com",
    projectId: "syslab-blogs",
    storageBucket: "syslab-blogs.appspot.com",
    messagingSenderId: "16046735004",
    appId: "1:16046735004:web:80f4539a703fd45d763759"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);
const storage = getStorage();

export{
    initializeApp,
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    app,
    auth,
    getDownloadURL,
    ref,
    storage,
    push,
    child,
    serverTimestamp,
    uploadBytesResumable,
}