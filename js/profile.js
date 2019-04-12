var fileButton = document.getElementById("fileButton");
//get a ref to Firebase Storage
var storage = firebase.storage();
function getImageForPath(p){
  var db = firebase.firestore();
  var storageRef = firebase.storage().ref();
  var spaceRef = storageRef.child(p);
  var user = firebase.auth().currentUser;
  storageRef.child(p).getDownloadURL().then(function(url) {
    var fullurl = url;
    var myPic = document.getElementById('profilepic');
    myPic.src = fullurl
    db.collection("profiles").add({
      profile_user: user.email,
      profile_image: fullurl
    })
  }).catch(function(error) {
    //catch error here
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
/////////////
fileButton.addEventListener('change', function(e){
  //get the file
  var file = e.target.files[0];
  //create the storage ref
  var storageRef = firebase.storage().ref('profilepics/'+ file.name);
  //upload the file
  var task = storageRef.put(file);
  task.on('state_changed',
  function progress(snapshot) {
  },
  function error(err){
    console.log(err);
  },
  function complete(){
    alert("upload complete");
    getImageForPath('profilepics/' + file.name);
  }
  );
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("registerbutton").innerHTML = `<a href="profile.html" class="nav-link active">Profile</a>`
  }
});
