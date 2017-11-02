'use strict';

//after pressing play button or after game Over
//button click calls Start
/*
my variables
-speed of movement
-width height walls
-width height character
-direction my character is facing
-random wall positioning
-current score
...
*/
//var startButton = document.getElementsByClassName("start-button");

function init() {
  var container = document.getElementById('container');
  var game = new Game(container);
}


document.addEventListener("DOMContentLoaded", function() {
  init();
});
