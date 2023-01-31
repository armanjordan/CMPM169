'use strict';

var formResolution = 6;
var centerX;
var centerY;
var x = [];
var y = [];

//- added vars
var strokeWeightVar = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // init shape
  //-start at a random position on the canvas
  centerX = random(0, width);
  centerY = random(((height * 3) / 5), ((height * 4) / 5));
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(10);
    y.push(10);
  }
  
  stroke(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
  
  strokeWeightVar = random(0.15, 0.95);
  strokeWeight(strokeWeightVar);
  background(255);
}

function draw() {
  // floating towards mouse position
  strokeWeight(strokeWeightVar);
  //-I want it to move faster when the stroke weight is heavier
  centerX += (mouseX - centerX) * (0.01 / strokeWeightVar);
  centerY += (mouseY - centerY) * (0.01 / strokeWeightVar);

  // calculate new points
  for (var i = 0; i < formResolution; i++) {
    x[i] += random(random(-2.5, 1), random(-1, 2.5));
    y[i] += random(random(-2.5, 1), random(-1, 2.5));
    //-uncomment to add shapes to corners, randomized size
    ellipse(x[i] + centerX + random(-x[i], x[i]), y[i] + centerY + random(-y[i],  y[i]), random(1, 5), random(1, 5));
  }

  noFill();
  
  beginShape();
  // first controlpoint
  curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

  // only these points are drawn
  for (var i = 0; i < formResolution; i++) {
    curveVertex(x[i] + centerX, y[i] + centerY);
  }
  curveVertex(x[0] + centerX, y[0] + centerY);

  // end controlpoint
  curveVertex(x[1] + centerX, y[1] + centerY);
  endShape();
  
  
  // if at any point the shape gets too close to the mouse, reset
  if(abs(mouseX - centerX) < 30 && abs(mouseY - centerY) < 30){
     reset();
  }
}

function mousePressed() {
  // empty the arrays
  stroke(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
  
  while(x.length > 0){
    x.pop();
  }
  while(y.length > 0){
    y.pop();
  }
  //-start at a random position on the canvas
  centerX = random(0, width);
  centerY = random(((height * 3) / 5), ((height * 4) / 5));
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(-10);
    y.push(10);
  }
  
  strokeWeightVar = random(0.15, 0.95);
  strokeWeight(strokeWeightVar);
}

function reset() {
  stroke(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)));
  // empty the arrays
  while(x.length > 0){
    x.pop();
  }
  while(y.length > 0){
    y.pop();
  }
  //-start at a random position on the canvas
  centerX = random(0, width);
  centerY = random(((height * 3) / 5), ((height * 4) / 5));
  var angle = radians(360 / formResolution);
  for (var i = 0; i < formResolution; i++) {
    x.push(-10);
    y.push(10);
  }
  
  strokeWeightVar = random(0.15, 0.95);
  strokeWeight(strokeWeightVar);
}
