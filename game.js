'use strict';

function Game(container) {
  var self = this;
  self.container = container;
  self.canvas = document.getElementById('game');
  self.ctx = self.canvas.getContext('2d');

  self.height = self.canvas.height;
  self.width = self.canvas.width;

  self.obstacles = [];

  self.obstacleMinWidth = 50;
  self.obstacleWidthPerLevel = 30;

  self.speedPerLevel = 0.2;

  self.backgroundMoving = false;
  self.leftWallX = 30;
  self.rightWallX = 360;
  self.wallWidth = 10;
  self.playerWidth = 20;
  self.playerHeight = 40;
  self.groundY = self.height - (self.playerHeight / 2);

  self.playerJumpingRight = null;
  self.playerJumpingLeft = null;
  self.isRunning = false;

  self.levelUpInterval = 5000;
  self.obstacleInterval = 5000;

  self.level = 1;

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


  // ---- LEVEL UP INTERVAL ---- //

  self.levelUpIntervalId = window.setInterval(function() {
    self.level++;

    console.log("LEVEL UP", self.level);

    self.levelUpWarningCounter = 50;

    self.obstacles.forEach(function(obstacle) {
      obstacle.setSpeed(1 + self.level * self.speedPerLevel);
    });

    // @todo make obstacleInterval smaller (multiply by 0.9)
    // @todo clear the obstacle interval
    // @todo set the obstacle interval again

  }, self.levelUpInterval);


}

//------SPAWNING INTERVAL------//

Game.prototype.setObstacleInterval = function() {
  var self = this;

  self.obstacleIntervalId = window.setInterval(function() {

    var left = Math.round(Math.random());
    var width = self.randomizeObstacleWidth();
    var speed = 1 + self.level * self.speedPerLevel;
    var x;
    if (left) {
      x = self.leftWallX + self.wallWidth;
    } else {
      x = self.rightWallX - width;
    }

    var newObstacle = new Obstacle(self.ctx, x, width, speed);
    self.obstacles.push(newObstacle);
  }, self.obstacleInterval);

};


// ----- UTILITY FUNCTIONS -----


Game.prototype.randomizeObstacleWidth = function() {
  var self = this;
  var width = self.obstacleMinWidth + Math.floor(Math.random() * self.level * self.obstacleWidthPerLevel);
  return width;
};

// ----- UPDATE STATE -----


Game.prototype.updatePlayer = function() {
  var self = this;
  if (self.playerJumpingRight === true) {
    self.isRunning = true;
    self.playerX += 2 + self.level * self.speedPerLevel;
    if (self.playerX >= (self.rightWallX - self.playerWidth)) {

      self.playerJumpingRight = null;
      self.isRunning = false;
      self.playerX = self.rightWallX - self.playerWidth;
    }
  }

  if (self.playerJumpingLeft === true) {
    self.isRunning = true;
    self.playerX -= 2 + self.level * self.speedPerLevel;
    if (self.playerX <= self.leftWallX + self.wallWidth) {

      self.playerJumpingLeft = null;
      self.isRunning = false;
      self.playerX = (self.leftWallX + self.wallWidth);
    }
  }
};

Game.prototype.detectCollision = function() {
  // @todo if blab bla or bla bla or bla this.playerCollision = true;
};

Game.prototype.updateGround = function() {
  var self = this;
  self.groundY += 1;
  if (self.groundY > self.height) {
    self.backgroundMoving = true;
    self.setObstacleInterval();
  }
};


// ----- DRAW PLAYER / WALLS / BOTTOM BORDER----- //

Game.prototype.drawPlayer = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(50,50,250)";
  self.ctx.fillRect(self.playerX, self.playerY, self.playerWidth, self.playerHeight);
};

Game.prototype.drawWalls = function() {
  var self = this;

  self.ctx.fillStyle = "rgb(255,50,50)";
  self.ctx.fillRect(self.leftWallX, 0, self.wallWidth, self.height);
  self.ctx.fillRect(self.rightWallX, 0, self.wallWidth, self.height);

};

Game.prototype.drawGround = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(102, 0, 102)";
  self.ctx.fillRect(0, self.groundY, self.width, self.playerHeight / 2);
};


//--------DRAW-------//
Game.prototype.draw = function() {
  var self = this;

  //-----movement and redrawning of objects-----//

  if (self.playerCollision) {
    // @todo update collision animation
  } else {
    self.updatePlayer();
    if (!self.backgroundMoving) {
      self.updateGround();
    }
    self.obstacles.forEach(function(obstacle) {
      obstacle.update();
    });

    self.detectCollision(); // self.playerCollision = true;
  }

  //---clearing canvas----//
  self.ctx.clearRect(0, 0, self.width, self.height);

  // ---redraw--- //
  self.drawWalls();
  if (!self.backgroundMoving) {
    self.drawGround();
  }

  if (self.playerCollision) {
    // @todo draw collision animation
  } else {
    self.drawPlayer();
    self.obstacles.forEach(function(obstacle) {
      obstacle.draw();
    });
  }

  // request the browser to update/draw again as soon as possible
  window.requestAnimationFrame(function() {
    self.draw();
  });
};


// ------- START -------

Game.prototype.start = function() {
  var self = this;

  // prepare the game status
  self.playerX = self.leftWallX + self.wallWidth;
  self.playerY = self.height - (self.playerHeight * 1.5);
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
