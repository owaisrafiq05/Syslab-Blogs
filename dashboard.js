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



  window.addEventListener("load", async function () {
    console.log("blog load");
    var uid = localStorage.getItem("uid");
    console.log(uid, "uid");
  
    if (!uid) {
      location.replace("./index.html");
      return;
    }
    var BlogArr = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(function (doc) {
      // console.log(doc.data().tilte);
      // console.log(doc.id);
      // BlogArr.push(doc.data());
      BlogArr.push({
      user: doc.data().user,  
      title: doc.data().title,
      description: doc.data().description,
      uid: doc.data().uid,
      link: doc.data().link,
      image: doc.data().image,
      timestamp: doc.data().timestamp,
      });
    });
    console.log(BlogArr, "BlogArr");
  
    // for of loop
  
    for (var value of BlogArr) {
      // renderCardUI(title, desc, image, id)
          parent.innerHTML += createUI(
            user.value, 
            title.value, 
            description.value, 
            image, 
            link.value,
            docRef.id, 
            timestamp
          );
        }
      }
    );
  




  var parent = document.getElementById("parent");
  async function addpost() {
    
    var fileinput = document.getElementById("file-input");
    var imageURL;
  
    if (fileinput.files[0]) {
      imageURL = await imageUpload(fileinput.files[0]);
    } else {
      imageURL = "https://firebasestorage.googleapis.com/v0/b/my-first-project-1-c98da.appspot.com/o/images%2Fclose-up-elegant-decoration-house-1.jpg?alt=media&token=3757c49e-cbc0-452f-8408-ced38f5d6eff";
    }
  
    var user = document.getElementById("user");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var link = document.getElementById("link");
    var file = document.getElementById("file-input");
    var uid = localStorage.getItem("uid");
  
    // Add a timestamp field
    // var timestamp = firebase.firestore.FieldValue.serverTimestamp();
    var timestamp = new Date().getTime();
    var postObj = {
      user: user.value,  
      title: title.value,
      description: description.value,
      uid: uid,
      link: link.value,
      image: imageURL,
      timestamp: timestamp
      // timestamp: timestamp,
    };
    console.log(postObj);
    const docRef = await addDoc(collection(db, "posts"), postObj);
    //  var userCredit = await getImageofUser(uid);
    // timestamp = calculateTimeAgo(timestamp);
    parent.innerHTML += createUI(user.value, title.value, description.value, imageURL, link.value,
    docRef.id, timestamp)
    myModal.hide();
    user.value="";
    title.value = "";
    description.value = "";
    link.value = "";
    file.value = "";
  }
  
  window.addpost = addpost;


  function createUI(user,title,description,image,link,timestamp) {
    var length = description.length;
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