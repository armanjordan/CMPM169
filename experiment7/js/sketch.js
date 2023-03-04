let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // data for the 12 slices
let sliceColors = ['orange', 'brown', 'orange', 'brown', 'orange', 'brown', 'orange', 'brown', 'orange', 'brown', 'orange', 'brown']; // colors for pumpkin pie slices
let numEaten = 0;

let particles = [];

function setup() {
  createCanvas(800, 800);
  noStroke();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  drawPieChart(width/2, height/2, 500, data, sliceColors);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function drawPieChart(x, y, diameter, data, colors) {
  let lastAngle = 0;
  for (let i = 0; i < data.length; i++) {
    // map data value to an angle
    let angle = map(data[i], 0, 12, 0, TWO_PI);

    // set fill color based on slice index
    fill(colors[i % colors.length]);

    // draw slice of pie
    arc(x, y, diameter, diameter, lastAngle, lastAngle + angle, PIE);

    lastAngle += angle;
  }
}

function mouseClicked() {
  // check if mouse is within any slice of the pie chart
  let xDist = mouseX - width/2;
  let yDist = mouseY - height/2;
  let distance = sqrt(xDist*xDist + yDist*yDist);
  if (distance < 500/2) {
    sliceColors[(sliceColors.length - 1) - numEaten] = color(220);
    numEaten += 1;
    
    if(numEaten <= 12){
      for (let i = 0; i < 50; i++) {
        let p = new Particle(mouseX, mouseY);
        particles.push(p);
      }
    }
    
  }
}



class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 5));
    this.acc = createVector(0, 0.1);
    this.lifespan = 255;
    this.color = random() < 0.5 ? color(160, 82, 45) : color(255, 140, 0);
    this.size = random(5, 20);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 5;
  }

  show() {
    push();
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    pop();
  }

  isFinished() {
    return this.lifespan <= 0;
  }
}