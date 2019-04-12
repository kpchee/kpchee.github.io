//sign up
function adduser(){
  alert("adding user!");
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email,
  password).catch(function(error) {
    // Handle Errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("error: "+ errorMessage);
  });
};
//sign in
function signIn(){
  var email = document.getElementById("username").value;
  var password = document.getElementById("loginpassword").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    alert("Error signing in");
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
  //closes modal on log in
  $('#closemodal').click(function() {
    $('#modalwindow').modal('hide');
  });
};
//sign out
function signOut(){
  firebase.auth().signOut().then(function() {
    alert("Signed out!");
  }).catch(function(error) {
    // An error happened.
    var errorMessage = error.message;
    alert(errorMessage)
  });
};
// change password
function change() {
  var user = firebase.auth().currentUser;
  var newPassword = document.getElementById("newpass");
  user.updatePassword(newPassword.value).then(function() {
    alert('Password updated!')
    newPassword.value = ''
  }).catch(function(error) {
    alert('Must enter a name and password fields')
  });
}
// stores email and pictures together in a 2D array
var profiles = []
function getProfile() {
  var db = firebase.firestore();
  db.collection("profiles").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      profiles.push([doc.data().profile_user, doc.data().profile_image]);
    })
  })
}
//checks if signed in or not and changes login button accordingly
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // adds html depending on signed in or not
    document.getElementById("loginbutton").innerHTML = ""
    document.getElementById("loginbutton").innerHTML = `<a href="#" class="nav-link" onclick="signOut()">Logout</a>`
    document.getElementById("registerbutton").innerHTML = ""
    document.getElementById("registerbutton").innerHTML = `<a href="profile.html" class="nav-link">Profile<img src="images/blankprofile.png" class="ml-2 pb-1 d-inline-block align-top" alt="profile pic" height="30" width="30" id="profilepic"></a>`
    document.getElementById("secretcats").innerHTML = `<a href="cat.html" class="nav-link">Secret Cats</a>`
    getProfile()
    setTimeout(updatePic, 7000)
  } else {
    // No user is signed in.
    // removes html if signed out
    document.getElementById("loginbutton").innerHTML = ""
    document.getElementById("loginbutton").innerHTML = `<a href="#" class="nav-link" data-toggle="modal" data-target="#login">Login</a>`
    document.getElementById("registerbutton").innerHTML = ""
    document.getElementById("registerbutton").innerHTML = `<a href="register.html" class="nav-link">Register</a>`
  }
});
function updatePic() {
  var user = firebase.auth().currentUser;
  for (i=0;i<profiles.length;i++) {
    if (profiles[i][0] === user.email) {
      document.getElementById("profilepic").src = profiles[i][1]
    }
  }
}
