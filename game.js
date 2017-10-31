'use strict';

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */


function Game(container) {
  var self = this;

  self.container = container;
  self.canvas = document.getElementById('game');
  self.ctx = self.canvas.getContext('2d');

  self.height = self.canvas.height;
  self.width = self.canvas.width;
  //------ HELP-------
  //self.obstacle = obstacle1;
  //------------------

  self.leftWallX = 50;
  self.rightWallX = 350;
  self.wallWidth = 10;

  self.plaverWidth = 20;
  self.plaverHeight = 50;
  self.bottomBorderY = self.height - (self.plaverHeight / 2);
  //self.playerSpeed = 2;

  self.playerJumpingRight = null;
  self.playerJumpingLeft = null;

  self.isRunning = false;


  // -- create the start button

  // var button = document.createElement('button');
  // button.innerText = 'start';
  // button.classList.add('start-button');
  // self.container.appendChild(button);
  //
  // // @todo uncomment later
  // self.start();
  // button.style.display = 'none';
  //
  // button.addEventListener("click", function() {
  //   self.start();
  //   button.style.display = "none";
  // });
}


// ----- UPDATE STATE -----


Game.prototype.updatePlayer = function() {
  var self = this;
  if (self.playerJumpingRight === true) {
    self.isRunning = true;
    self.plaverX++;
    console.log("right ", self.plaverX);
    if (self.plaverX >= (self.rightWallX - self.plaverWidth)) {

      self.playerJumpingRight = null;
      self.isRunning = false;
      self.plaverX = self.rightWallX - self.plaverWidth;

    }
  }

  if (self.playerJumpingLeft === true) {
    self.isRunning = true;
    self.plaverX--;
    console.log("left ",
      self.plaverX);
    if (self.plaverX <= self.leftWallX + self.wallWidth) {

      self.playerJumpingLeft = null;
      self.isRunning = false;
      self.plaverX = (self.leftWallX + self.wallWidth);

    }
  }
};



// ----- DRAW -----

Game.prototype.drawPlayer = function() {
  var self = this;

  // if plaver jumping right // if (self.playerJumpingRight) { .... }
  //   playerX++
  //   if player reached the right side
  //     player not moving right anymore

  self.ctx.fillStyle = "rgb(50,50,250)";
  self.ctx.fillRect(self.plaverX, self.plaverY, self.plaverWidth, self.plaverHeight);
};

Game.prototype.drawWalls = function() {
  var self = this;

  self.ctx.fillStyle = "rgb(255,50,50)";
  self.ctx.fillRect(self.leftWallX, 0, self.wallWidth, self.height);
  self.ctx.fillRect(self.rightWallX, 0, self.wallWidth, self.height);
  self.ctx.fillRect(0, self.bottomBorderY, self.width, self.plaverHeight / 2);
};


Game.prototype.draw = function() {
  var self = this;

  self.ctx.clearRect(0, 0, self.width, self.height);

  self.updatePlayer();

  self.drawWalls();
  self.drawPlayer();

  window.requestAnimationFrame(function() {
    self.draw();
  });
};



Game.prototype.background = function() {




};



// ------- START -------



Game.prototype.start = function() {
  var self = this;




  // prepare the game status


  self.plaverX = self.leftWallX + self.wallWidth;
  self.plaverY = self.height - (self.plaverHeight * 1.5);
  self.playerJumpingRight = false;

  // prepare the game event listeners






  document.addEventListener('keyup', function(e) {
    var keyPressed = e.keyCode;
    if (keyPressed === 37 && !self.isRunning) {
      self.playerJumpingLeft = true;

      if (self.playerJumpingLeft === true) {
        self.playerJumpingRight = false;

      }



    } else if (keyPressed === 39 && !self.isRunning) {
      self.playerJumpingRight = true;

      if (self.playerJumpingRight === true) {
        self.playerJumpingLeft = false;
      }
    }
  });






  // start the animation loop
  //-----attention when uncomenting draw function uncomment this----//
  self.draw();
};


//--------- if (self.plaverX < self.rightWallX - self.plaverWidth) {}
