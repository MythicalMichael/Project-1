'use strict';

function Obstacle() {
  var self = this;
  self.canvas = document.getElementById('game');
  self.ctx = self.canvas.getContext('2d');


  //this.position = position;
  self.randomizerArray = [];

  self.width = self.canvas.width;
  self.height = self.canvas.height;
  //--------------------
  //self.randomPosition = Math.floor(Math.random() * 2);



  self.rHeight = Math.floor(Math.random() * (self.height * 0.05));
  if (self.rHeight > 50) {
    self.rHeight = 30;
  } else if (self.rHeight < 3) {
    self.rHeight = 5;
  }


  //---------------------
  self.rWidthRight = Math.floor(Math.random() * self.width / 2);
  //---------------------
  self.rWidthLeft = Math.floor(Math.random() * self.width / 2);


  self.heightRight = self.rHeight;
  self.heightLeft = self.rHeight;
  self.positionRightX = (self.width - self.rWidthRight);
  self.positionRightY = 0;
  self.positionLeftX = 0;
  self.positionLeftY = 0;




  self.leftObastacle = null;
  self.rightObstacle = null;
  self.drawLeftObject();
  self.drawRightObject();
}



//-----there is draw function in Game

// Obstacle.prototype.draw = function() {
//   var self = this;
//
//   self.ctx.clearRect(0, 0, self.width, self.height);
//   self.drawRightObject();
//   self.drawLeftObject();
//   //self.update();
//   window.requestAnimationFrame(function() {
//     self.draw();
//   });
//
// };




Obstacle.prototype.drawLeftObject = function() {
  var self = this;

  self.ctx.fillStyle = "rgb(250,20,100)";
  self.ctx.fillRect(self.positionLeftX, self.positionLeftY, self.rWidthLeft, self.heightLeft);


};



Obstacle.prototype.drawRightObject = function() {
  var self = this;
  self.ctx.fillStyle = "rgb(200,70,100)";
  self.ctx.fillRect(self.positionRightX, self.positionRightY, self.rWidthRight, self.heightRight);

};

Obstacle.prototype.updateObstacle = function() {



};



//window.onload = function() { ()}


Obstacle.prototype.start = function() {

  self.updateObstacle();
  self.ctx.clearRect(0, 0, self.width, self.height);



};

};


var obstacle1 = new Obstacle();
