'use strict';

function Obstacle(positionLeftX, positionLeftY) {
  var self = this;
  self.canvas = document.getElementById('game');
  self.ctx = self.canvas.getContext('2d');
  //this.position = position;
  self.width = self.canvas.width;
  self.height = self.canvas.height;
  //--------------------
  //self.randomPosition = Math.floor(Math.random() * 2);

  self.rHeight = self.randomizeHeight();
  if (self.rHeight > 50) {
    self.rHeight = 30;
  } else if (self.rHeight < 3) {
    self.rHeight = 5;
  }

  self.rWidthRight = self.randomizeWidth();
  self.rWidthLeft = self.randomizeWidth();
  self.heightRight = self.rHeight;
  self.heightLeft = self.rHeight;
  // X & Y Postion RIGHT //
  self.positionRightX = (self.width - 40 - self.rWidthRight);
  self.positionRightY = 0;
  // X & Y Postion LEFT //
  self.positionLeftX = 40;
  self.positionLeftY = 0;

  self.leftObastacle = null;
  self.rightObstacle = null;

  self.speed = 0;

  //---LEFT---//


  //---RIGHT---//

  var positionRightX = self.positionRightX;
  var positionRightY = self.positionRightY;

}



//-----DRAWING------//

Obstacle.prototype.draw = function() {
  var self = this;
  self.ctx.clearRect(0, self.height, self.width, self.height);
  self.drawRightObject();
  self.drawLeftObject();

  window.requestAnimationFrame(function() {
    self.draw();
  });
};

//-------DRAWING-BOTH-OBSTACLES-------//
Obstacle.prototype.drawLeftObject = function() {
  var self = this;

  self.ctx.fillStyle = "rgb(0, 204, 153)";
  self.ctx.fillRect(self.positionLeftX, self.speed, self.rWidthLeft, self.heightLeft);
};

Obstacle.prototype.drawRightObject = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(0, 204, 153)";
  self.ctx.fillRect(self.positionRightX, self.speed, self.rWidthRight, self.heightRight);
};

//----UPDATE-OBSTACLES-----//
Obstacle.prototype.updateObstacle = function() {
  var self = this;
  self.speed += 2;

  //---ONLY IF RUN AGAIN THE SAME OBSTACLE---//
  // self.rWidthRight = self.randomize();
  // self.positionRightX = (self.width - 40 - this.rWidthRight);
  // self.rWidthLeft = self.randomize();
  // self.positionLeftX = 40;
};

Obstacle.prototype.randomizeWidth = function(width) {
  var self = this;
  width = Math.floor(Math.random() * self.width / 2);
  return width;
};


Obstacle.prototype.randomizeHeight = function(height) {
  var self = this;
  height = Math.floor(Math.random() * (self.height * 0.05));
  return height;
};




// self.enemiesIntervalId = window.setInterval(function () {
//       var enemy = new Enemy(self.ctx, self.width, self.height);
//       self.objects.push(enemy);
//       enemy.onDie(function () {
//         self.destroyObject(enemy);
//       });
//     }, ENEMIES_MSEC);
