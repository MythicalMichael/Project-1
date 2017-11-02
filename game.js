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
  self.leftWallX = 40;
  self.rightWallX = 350;
  self.wallWidth = 10;
  self.playerWidth = 20;
  self.playerHeight = 40;
  self.groundY = self.height - (self.playerHeight / 2);
  self.picPlayer = new Image();
  self.picPlayer.src = 'img/player.png';


  self.playerJumpingRight = null;
  self.playerJumpingLeft = null;
  self.isRunning = false;
  self.playerCollision = false;
  self.levelUpInterval = 1000;
  self.obstacleInterval = 2000;
  self.level = 1;

  // -- creating the start button -- //

  // @todo uncomment later:

  var button = document.createElement('button');
  button.innerText = 'PLAY';
  button.classList.add('start-button');
  button.classList.add('btn');
  button.classList.add('btn:hover');
  self.container.appendChild(button);

  // @todo uncomment later:

  button.addEventListener("click", function() {
    self.start();
    button.style.display = "none";
  });


  // ---- LEVEL UP INTERVAL ---- //


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
  if (width > 250) {
    width = 250;
  }
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
  var self = this;

  for (var ix = 0; ix < self.obstacles.length; ix++) {
    var obstacle = self.obstacles[ix];
    var isRight = self.playerX + self.playerWidth >= obstacle.x;
    var isLeft = self.playerX <= obstacle.x + obstacle.width;
    var topBorder = self.playerY <= obstacle.y + obstacle.height;
    var botBorder = self.playerY + self.playerHeight >= obstacle.y;

    if (isRight && isLeft && topBorder && botBorder) {
      self.playerCollision = true;
      self.gameOver();
    }
  }

};

Game.prototype.updateCollisionAnimation = function() {
  var self = this;


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
  self.ctx.fillStyle = "rgb(255,255,255)";
  self.ctx.drawImage(self.picPlayer, self.playerX, self.playerY, self.playerWidth, self.playerHeight);
};
//ctx.drawImage(img, 0, 0, 500, 500);
Game.prototype.drawWalls = function() {
  var self = this;

  self.ctx.fillStyle = "rgba(0,0,0,0)";
  self.ctx.fillRect(self.leftWallX, 0, self.wallWidth, self.height);
  self.ctx.fillRect(self.rightWallX, 0, self.wallWidth, self.height);

};

Game.prototype.drawGround = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(0, 0, 0)";
  self.ctx.fillRect(0, self.groundY, self.width, self.playerHeight / 2);
};

Game.prototype.collisionAnimation = function() {
  var self = this;
  //  ctx.setTransform()
  self.drawPlayer();
  // self.ctx.fillStyle = "rgb(204, 0, 0)";
  // self.ctx.fillRect(0, 0, self.width, self.height);

};

//--------DRAW-------//
Game.prototype.draw = function() {
  var self = this;

  //-----movement and redrawning of objects-----//

  if (self.playerCollision) {
    // @todo update collision animation
    self.updateCollisionAnimation();
  } else {
    self.updatePlayer();
    if (!self.backgroundMoving) {
      self.updateGround();
    }
    self.obstacles.forEach(function(obstacle) {
      obstacle.update();
    });

    self.detectCollision();
  }

  //---clearing canvas----//
  self.ctx.clearRect(0, 0, self.width, self.height);

  // ---redraw--- //
  self.showScore();
  self.drawWalls();
  if (!self.backgroundMoving) {
    self.drawGround();
  }

  if (self.playerCollision) {
    // @todo draw collision animation

    self.collisionAnimation();

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

  self.levelUpIntervalId = setInterval(function() {
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

};


Game.prototype.showScore = function() {
  var self = this;
  self.ctx.font = "25px sans-serif";
  self.ctx.fillStyle = "white ";
  self.ctx.fillText("Score: " + self.level, 160, 50);

};

// Game Over

Game.prototype.gameOver = function() {
  var self = this;

  clearInterval(self.levelUpIntervalId);
  var button = document.createElement('button');
  button.innerText = 'PLAY AGAIN';
  button.classList.add('reset-button');
  button.classList.add('btn');
  button.classList.add('btn:hover');
  self.container.appendChild(button);


  var gameOverMessage = document.createElement('h1');
  gameOverMessage.innerText = 'GIT GUD SCRUB';
  gameOverMessage.classList.add('game-over-message');
  self.container.appendChild(gameOverMessage);



  button.addEventListener("click", function() {
    window.location.reload();
    button.style.display = "none";
  });


};
