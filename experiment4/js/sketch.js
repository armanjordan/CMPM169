'use strict';

var img;

var xCreep = 0;
var yCreep = 0;
var dirCreep = 0;

var filterModes;

var filterIter = 0;

function preload() {
  img = loadImage('pic.png');
}

function setup() {
  createCanvas(1024, 780);
  tint(random(0, 255), random(0, 255), random(0, 255), random(1, 255));
  image(img, 0, 100);
  filterModes = [
    BLUR,
    ERODE,
    INVERT,
    ERODE
  ];
}

function draw() {
  if (dirCreep === 0) {
      var x1 = floor(random(xCreep - 20, xCreep));
      var y1 = random(50, height);
  }
  
  if (dirCreep == 1) {
      var x1 = floor(random(width));
      var y1 = floor(random(yCreep - 20, yCreep));
  }
  

  if (dirCreep === 0) {
      var x2 = x1;
      var y2 = round(y1 + random(-50, 50));
  }
  
  if (dirCreep === 1) {
      var x2 = round(x1 + random(-50, 50));
      var y2 = y1;
  }
  

  var w = 50;
  var h = 50;

  set(x2, y2, get(x1, y1, w, h));
  
  // filter(BLUR);
  if (dirCreep == 0) {
      xCreep += 1;
  }
  if (dirCreep == 1) {
      yCreep += 1;
  }
  
  if (xCreep == width) {
      xCreep = 0;
      dirCreep = 1;
      filter(filterModes[filterIter]);
      if (filterIter == 3) {
          filterIter = 0;
      } else {
          filterIter++;
      }
  }
  
  if (yCreep == height) {
      yCreep = 0;
      dirCreep = 0;
      filter(filterModes[filterIter]);
      if (filterIter == 3) {
          filterIter = 0;
      } else {
          filterIter++;
      }
  }
}
