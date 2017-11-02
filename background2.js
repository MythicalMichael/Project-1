'use strict';


$(function() {
  var x = 0;
  setInterval(function() {
    x += 1;
    $('#game').css('background-position', " 0 " + x + "px ");
  }, 10);
});
