'use strict';

function Obstacle(ctx, x, width, speed) {
  var self = this;

  self.ctx = ctx;

  self.gone = false;

  self.x = x;
  self.width = width;
  self.speed = speed;

  self.y = -50;
  self.height = 10;
}


Obstacle.prototype.setSpeed = function(speed) {
  var self = this;

  self.speed = speed;
};

Obstacle.prototype.update = function() {
  var self = this;

  self.y = self.y + self.speed;

  if (self.y > self.ctx.canvas.height) {
    self.gone = true;
  }
};


Obstacle.prototype.draw = function() {
  var self = this;

  self.ctx.fillStyle = 'black';
  self.ctx.fillRect(self.x, self.y, self.width, self.height);
};
