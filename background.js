'use strict'



function Background() {
  var self = this;

  self.background.src = "img/bg.png";
  self.ctb = self.canvas.getContext('2d');
  self.canvas = document.getElementById('background');
  self.height = self.canvas.height;
  self.width = self.canvas.width;


}
