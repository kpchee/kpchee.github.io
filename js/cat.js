var fileButton = document.getElementById("fileButton");
function getImageForPath(p){
  var uploader = document.getElementById("uploader");
  var holder = document.getElementById("holder");
  //get a ref to Firebase Storage
  var storage = firebase.storage();
  var storageRef = firebase.storage().ref();
  var spaceRef = storageRef.child(p);
  storageRef.child(p).getDownloadURL().then(function(url) {
    var fullurl = url;
    var myCarousel = document.getElementById('images');
    myCarousel.innerHTML += `
    <div class="carousel-item">
      <img class="d-block w-100" src="${fullurl}" height="900px">
    </div>
    `
  }).catch(function(error) {
    //catch error here
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
fileButton.addEventListener('change', function(e){
  //get the file
  var file = e.target.files[0];
  //create the storage ref
  var storageRef = firebase.storage().ref('images/'+ file.name);
  //uplaod the file
  var task = storageRef.put(file);
  //update the progress bar
  task.on('state_changed',
  function progress(snapshot) {
  },
  function error(err){
    console.log(err);
  },
  function complete(){
    alert("upload complete");
    getImageForPath('images/' + file.name);
  }
  );
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("secretcats").innerHTML = `<a href="cat.html" class="nav-link active">Secret Cats</a>`
  }
});
