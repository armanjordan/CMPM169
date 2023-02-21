'use strict';

var font = 'sans-serif';
var letter = 'I';

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0);

  textFont(font);
  textAlign(CENTER, CENTER);
}

function mouseMoved() {
  clear();
  textSize(sqrt((mouseX - width / 2) * (mouseX - width / 2)));
  text(letter, windowWidth - mouseX, mouseY);
}

function mouseDragged() {
  textSize(sqrt((mouseY - height / 2) * (mouseY - height / 2)));
  text(letter, windowWidth - mouseX, mouseY);
}

function keyTyped() {
  letter += key;
  if (letter.length % 11 == 0 && letter.length < 54) {
      letter = letter += "\n";
  }
  if (letter.length >= 55) {
    letter = letter.substring(11, 56);
    letter = letter += "\n";
  }
  clear();
  text(letter, windowWidth - mouseX, mouseY);
}
