'use strict';

function Game(container) {
  var self = this;
  self.container = container;
  self.canvas = document.getElementById('game');
  self.ctx = self.canvas.getContext('2d');

  self.height = self.canvas.height;
  self.width = self.canvas.width;

  self.obstacle = new Obstacle();

  self.leftWallX = 30;
  self.rightWallX = 360;
  self.wallWidth = 10;
  self.plaverWidth = 20;
  self.plaverHeight = 40;
  self.bottomBorderY = self.height - (self.plaverHeight / 2);

  self.playerJumpingRight = null;
  self.playerJumpingLeft = null;
  self.isRunning = false;

  // -- creating the start button -- //

  // @todo uncomment later:

  var button = document.createElement('button');
  button.innerText = 'start';
  button.classList.add('start-button');
  self.container.appendChild(button);

  // @todo uncomment later:

  button.addEventListener("click", function() {
    self.start();
    button.style.display = "none";
  });

  //------SPAWNING INTERVAL------//
  self.intervalSpawn = window.setInterval(function() {

    var newObstacle = new Obstacle();



  });
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

Game.prototype.updateBorder = function() {
  var self = this;
  //-----not sure about this when create many obstacles the border may appear again!!!!!----//
  if (self.obstacle.speed > (self.height / 3)) {
    self.bottomBorderY += 1;
    if (self.bottomBorderY === self.height) {
      self.bottomBorderY += 0;
    }
  }
};


// ----- DRAW PLAYER / WALLS / BOTTOM BORDER----- //

Game.prototype.drawPlayer = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(50,50,250)";
  self.ctx.fillRect(self.plaverX, self.plaverY, self.plaverWidth, self.plaverHeight);
};

Game.prototype.drawWalls = function() {
  var self = this;

  self.ctx.fillStyle = "rgb(255,50,50)";
  self.ctx.fillRect(self.leftWallX, 0, self.wallWidth, self.height);
  self.ctx.fillRect(self.rightWallX, 0, self.wallWidth, self.height);

};

Game.prototype.drawBorder = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(102, 0, 102)";
  self.ctx.fillRect(0, self.bottomBorderY, self.width, self.plaverHeight / 2);
};


//--------DRAW-------//
Game.prototype.draw = function() {
  var self = this;
  //---clearing canvas----//
  self.ctx.clearRect(0, 0, self.width, self.height);
  //-----movement and redrawning of objects-----///
  self.updatePlayer();
  self.updateBorder();
  self.obstacle.draw();
  self.drawWalls();
  self.drawBorder();
  self.drawPlayer();
  self.obstacle.updateObstacle();
  window.requestAnimationFrame(function() {
    self.draw();

  });
};


// ------- START -------

Game.prototype.start = function() {
  var self = this;

  // prepare the game status
  self.plaverX = self.leftWallX + self.wallWidth;
  self.plaverY = self.height - (self.plaverHeight * 1.5);
  self.playerJumpingRight = false;


  // prepare the game event listeners binding keys
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
  self.draw();
};
