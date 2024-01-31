// All the coding done by Owais Rafiq 
// linkedin id: https://www.linkedin.com/in/owais-rafiq-639494253/


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
} from "../firebase.js";

var blogerId = localStorage.getItem("newblogid");
console.log(blogerId);
// const querySnapshot = await getDocs(collection(db, "posts"));
// querySnapshot.forEach(function (doc) {
//   // console.log(doc.data().tilte);
//   // console.log(doc.id);
//   // BlogArr.push(doc.data());
//   BlogArr.push({
//     user: doc.data().user,
//     id: doc.data().id,
//     title: doc.data().title,
//     description: doc.data().description,
//     uid: doc.data().uid,
//     link: doc.data().link,
//     image: doc.data().image,
//     timestamp: doc.data().timestamp,
//   });
// });

window.onload = async function () {
  var content = document.getElementById("parent2");
  console.log("postpage");

  var name;
  var blgerUID;
  var authname;
  // var userarray = [];
  console.log(blogerId);
  var BlogArr = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach(function (doc) {
    BlogArr.push({
      title: doc.data().title,
      desc: doc.data().description,
      uid: doc.data().uid,
      image: doc.data().image,
      timestamp: doc.data().timestamp,
      blogId: doc.id,
      user: doc.data().user
    });
  });
  console.log(BlogArr);
  for (var i = 0; i < BlogArr.length; i++) {
    console.log("BlogID Isent", blogerId);
    var blog = BlogArr[i];
    if (blog.blogId == blogerId) {
      console.log(blog);
      var title = blog.title;
      var image = blog.image;
      var author = blog.user;
      var timestamp = blog.timestamp;
      var description = blog.desc;
      blgerUID = blog.uid;
      break;
    }
  }
  content.innerHTML +=createUi (
    title,
    image,
    author,
    timestamp,
    description
  );
};
function createUi(title,image,authname,timestamp,description) {
  var ui = `
      <h1 class="heading">${title}</h1>
      <div class="hero-container">
      <div class="author">
          <img src="../OIP.jpg" alt="" class="author_img">
          <div class="desc">
          <h4>${authname}</h4>
          <small>Student of FAST NUCES</small>
          </div>
      </div>
  
      <div class="posted">
          <p>Posted on ${timestamp}</p>
      </div>
      </div>
  
  
      <div class="header-line"></div> 
  
      <div class="image">
          <img src=${image} alt="">
      </div>
  
      <div class="content">
          <p>${description}</p>
      </div>
      `;
      return ui;
}
