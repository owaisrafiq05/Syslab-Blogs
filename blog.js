import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  db,
  getDownloadURL,
  ref,
  storage,
  uploadBytesResumable,
  app,
} from "./firebase.js";



const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach(function (doc) {
  // console.log(doc.data().tilte);
  // console.log(doc.id);
  // BlogArr.push(doc.data());
  BlogArr.push({
    user: doc.data().user,
    id: doc.data().id,
    title: doc.data().title,
    description: doc.data().description,
    uid: doc.data().uid,
    link: doc.data().link,
    image: doc.data().image,
    timestamp: doc.data().timestamp,
  });
});
BlogArr.map((item, id) => {
  let parent2 = document.getElementById("parent2");
  return (parent2.innerHTML += `
      <h1 class="heading">${item.title}</h1>
      <div class="hero-container">
      <div class="author">
          <img src="OIP.jpg" alt="" class="author_img">
          <div class="desc">
          <h4>${item.user}</h4>
          <small>Student of FAST NUCES</small>
          </div>
      </div>
  
      <div class="posted">
          <p>Posted on ${item.timestamp}</p>
      </div>
      </div>
  
  
      <div class="header-line"></div> 
  
      <div class="image">
          <img src=${item.image} alt="">
      </div>
  
      <div class="content">
          <p>${item.description}</p>
      </div>
      `);
});