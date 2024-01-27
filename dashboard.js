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


  var exampleModal1 = document.getElementById("exampleModal");

  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    keyboard: false,
  });


  function logout() {
    localStorage.removeItem("uid");
    window.location.href = "index.html";
  }
  window.logout = logout;


  document.getElementById('close-btn').addEventListener('click', function (event) {
    event.preventDefault();
    // Additional code if needed
  });
  

  function redirect() {
    console.log("count");
  }
  
  
  
  
  // upload image function
  // document.getElementById('upload-btn').addEventListener('click', function (event) {
  //   // Prevent the default button behavior, which may be closing the modal
  //   event.preventDefault();
  
  //   // Trigger click on the hidden file input
  //   document.getElementById('file-input').click();
  // });
  
  // Handle file selection
  document.getElementById('file-input').addEventListener('change', function () {
    // Access the selected file(s) using this.files
    var selectedFiles = this.files;
  
    // Display the file name
    var fileNameDisplay = document.getElementById('file-name');
    if (selectedFiles.length > 0) {
      fileNameDisplay.textContent = 'Selected File: ' + selectedFiles[0].name;
    } else {
      fileNameDisplay.textContent = 'No file selected';
    }
  });


  var BlogArr = [];

  window.addEventListener("load", async function () {
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log(uid, "uid");
  
    if (!uid) {
      location.replace("./index.html");
      return;
    }
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(function (doc) {
      // console.log(doc.data().tilte);
      // console.log(doc.id);
      // BlogArr.push(doc.data());
      BlogArr.push({
        user: doc.data().user,  
        id:doc.data().id,
      title: doc.data().title,
      description: doc.data().description,
      uid: doc.data().uid,
      link: doc.data().link,
      image: doc.data().image,
      timestamp: doc.data().timestamp,
      blogId: doc.id,
      });
    });
    // console.log(blogId);

    function handleReadMoreClick(blogId) {
      console.log('Button clicked for item with id:', blogId);
      // Add your logic for handling the click event here
    }
    BlogArr.map((item, index) => {
      console.log(item);
      let blogid = item.blogId;
      console.log(blogid);
      window.localStorage.setItem("blogId", blogid);
    
      let parent = document.getElementById("parent");
      parent.innerHTML += `
        <div key=${index} class="card col-lg-4">
            <div class="card__header">
              <img src=${item.image} alt="card__image" class="card__image" width="600">
            </div>
            <div class="card__body">
              <span class="tag">News</span>
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </div>
            <button data-id=${blogid} class="read-more">Read More</button>
            <div class="card__footer">
              <div class="user">
                <img src="https://i.pravatar.cc/40" alt="user__image" class="user__image">
                <div class="user__info">
                  <h5>${item.user}</h5>
                  <small>${item.timestamp}</small>
                </div>
              </div>
            </div>
        </div>
      `;

    });
    window.localStorage.removeItem("mewblogid");
    
    



    let readMoreButtons = parent.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
      button.onclick = function(event) {
        var id = event.target.dataset.id;
           // Use event.target.dataset.id to get the data-id attribute
    window.location.reload();

        localStorage.setItem("newblogid", id);
        // Call the function to handle the click event
        // let blogid = localStorage.getItem("blogid");
        window.location.href='./blogs/index.html'
        // handleReadMoreClick(blogid);
      };
    });

    
    


// let readMoreButtons = document.getElementsByClassName("read-more");
// let buttonsArray = Array.from(readMoreButtons);

// buttonsArray.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     let blogId = e.target.getAttribute("data-id");
//     this.localStorage.setItem('blogID' ,blogId );
//     console.log(blogId);
//   });
// });
// console.log(readMoreButton)

// console.log(readMoreButton)


    

    // console.log(BlogArr, "BlogArr");
  
    // for of loop
  
    for (var value of BlogArr) {
      // renderCardUI(title, desc, image, id)
          // parent.innerHTML += createUI(
          //   user.value, 
          //   title.value, 
          //   description.value, 
          //   // image, 
          //   link.value,
          //   docRef.id, 
          //   timestamp
          // );
        }
      }
    );


  

  //    ` 
  //         <div key=${id} class="col-lg-4">
  //   <a href=${item.link} target="_blank">
  //   <div class="card">
  //     <div class="card-image"><img src=${item.image} alt="" ></div>
  //     <p class="card-title">${item.title}</p>
  //     <p class="card-body">
  //       ${item.description}
  //     </p>
  //     <p class="footer">Written by <span class="by-name">${item.user}</span> on <span class="date">${item.timestamp}</span></p>
  //   </div>
  // </a>
  // </div>
  //       `





  var parent = document.getElementById("parent");
  async function addpost() {
    
    var fileinput = document.getElementById("file-input");
    var imageURL;
  
    if (fileinput.files[0]) {
      imageURL = await imageUpload(fileinput.files[0]);
    } else {
      // imageURL = "https://firebasestorage.googleapis.com/v0/b/my-first-project-1-c98da.appspot.com/o/images%2Fclose-up-elegant-decoration-house-1.jpg?alt=media&token=3757c49e-cbc0-452f-8408-ced38f5d6eff";
      imageURL =
        " https://firebasestorage.googleapis.com/v0/b/syslab-blogs.appspot.com/o/images%2Fno-image.jpg?alt=media&token=016b2c13-9540-42fc-8f71-1e9d6a0c59f9";
    }
  
    var user = document.getElementById("user");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var link = document.getElementById("link");
    var file = document.getElementById("file-input");
    var uid = localStorage.getItem("uid");
  
    // Add a timestamp field
    // var timestamp = firebase.firestore.FieldValue.serverTimestamp();
    var timestamp = new Date();
    var postObj = {
      id: timestamp.getTime(),
      user: user.value,
      title: title.value,
      description: description.value,
      uid: uid,
      link: link.value,
      image: imageURL,
      timestamp: timestamp.toLocaleString(),
      // blogId: doc.id

      // timestamp: timestamp,
    };
    console.log(postObj);
    const docRef = await addDoc(collection(db, "posts"), postObj);
    //  var userCredit = await getImageofUser(uid);
    // timestamp = calculateTimeAgo(timestamp);
    parent.innerHTML += createUI(user.value, title.value, description.value, imageURL, link.value,
    docRef.id, timestamp);
    myModal.hide();
    user.value="";
    title.value = "";
    description.value = "";
    link.value = "";
    file.value = "";
    window.location.reload();
    // window.location.reload();
  }
  
  window.addpost = addpost;


  function createUI(user,title,description,image,link,DocrefId,timestamp) {
    var length = description.length;
    timestamp = new Date().toLocaleString();
    // Unique ID for each card
    // console.log(unID);
    if(!image)
    {
      image="https://firebasestorage.googleapis.com/v0/b/my-first-project-1-c98da.appspot.com/o/images%2Fscreen-shot-2023-04-13-at-10-35-31-am.webp?alt=media&token=b014caf2-8194-4b96-b122-49c06b561240"
    }
    var UI = `<div class="col-lg-4">
    <a href=${link} target="_blank">
    <div class="card">
      <div class="card-image"><img src=${image} alt="" ></div>
      <p class="card-title">${title}</p>
      <p class="card-body">
        ${description}
      </p>
      <button data-id=${timestamp} class="read-more">Read More</button>
      <p class="footer">Written by <span class="by-name">${user}</span> on <span class="date">${timestamp}</span></p>
    </div>
  </a>
  </div>`;
  
    return UI;
    
  }
  
  window.createUI = createUI;



  function imageUpload(file) {
    return new Promise(function (resolve, reject) {
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
  
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
  
            // ...
  
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  }
  window.imageUpload = imageUpload;