var num = Math.round(Math.random()*100);
function guess() {
  var yourGuess = document.getElementById("yourGuess").value
  var hint = document.getElementById("hint")
  if (yourGuess<num) {
    hint.innerHTML = 'Too low!'
  } else if (yourGuess>num) {
    hint.innerHTML = 'Too high!'
  } else {
    'Not a number!'
  }
  if (yourGuess==num) {
    hint.innerHTML = 'You win!'
  }
}
