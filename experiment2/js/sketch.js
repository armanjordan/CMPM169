'use strict';
var tileWidth = 0;
var tileHeight = 0;

var circleCount = 0;
var endSize = 0;
var endOffset = 0;

var actRandomSeed = 0;
var numCircles = 0;

var rowColor = 0;

function setup() {
  createCanvas(800, 800);
  tileWidth = width / 10;
  tileHeight = height / 10;
  noFill();
  stroke(0, 128);
}

function draw() {
  background(255);
  randomSeed(actRandomSeed);

  translate(tileWidth / 2, tileHeight / 2);

  circleCount = numCircles + 1;
  endSize = map(mouseX, 0, max(width, mouseX), tileWidth / 2, 0);
  endOffset = map(mouseY, 0, max(height, mouseY), 0, (tileWidth - endSize) / 2);
  rowColor = int(random(0, 255));
  for (var gridY = 0; gridY <= 10; gridY++) {
    for (var gridX = 0; gridX <= 10; gridX++) {
      push();
      translate(tileWidth * gridX, tileHeight * gridY);
      scale(1, tileHeight / tileWidth);

      var toggle = int(random(0, 4));
      if (toggle == 0) rotate(-HALF_PI);
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);

      stroke(int(random(0, 255)), int(random(0, 255)), rowColor);
      for (var i = 0; i < circleCount; i++) {
        var diameter = map(i, 0, circleCount, tileWidth, endSize);
        var offset = map(i, 0, circleCount, 0, endOffset);
        ellipse(offset, 0, diameter, diameter);
        var secondToggle = int(random(0, 2));
        if (secondToggle == 0) rotate(-HALF_PI);
        if (secondToggle == 1) rotate(HALF_PI);
      }
      pop();
    }
  }
  rectMode(CENTER);
  translate(width / 2, height / 2);
  translate(p5.Vector.fromAngle(millis() / 1000, 350));
  rect(0, 0, 20, 20);
}

function mousePressed() {
  numCircles ++;
}
