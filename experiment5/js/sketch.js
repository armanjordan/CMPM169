var particles = [];

var mouseClicks = 0;

function setup() {
  angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(100);
  // in setup it fills an array of particles
	for(var i = 0; i<200; i++){
		particles.push(new particle);
	}
	noStroke();
}

function draw() {
  rotateX(-mouseY);
	rotateY(mouseX);
	offset = 0;
	background(51);
	for(var i = 0; i<particles.length; i++){
		particles[i].update();
	}
	for(var i = 0; i<particles.length; i++){
		if(particles[i+offset].ded){
			particles.splice(i+offset, 1);
			offset--;
			i++;
		}
	}
}

class particle{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.ded = false;
		// this.vel = [random(-0.2, 0.2), random(-0.2, 0.2), random(-0.2, 0.2)];
        this.vel = [0.15 + 0.01*mouseClicks, 0.15 + 0.01*mouseClicks, 0.15 + 0.01*mouseClicks];
      
		this.total = 0.5/(sqrt((this.vel[0]*this.vel[0])+(this.vel[1]*this.vel[1])+(this.vel[2]*this.vel[2]))+random(-0.9, -0.3));
		this.vel = [this.vel[0]*this.total, this.vel[1]*this.total, this.vel[2]*this.total];
		// this.color = random(50, 255);
      if (mouseClicks % 3 === 0) {
            this.color = random(0, 255);
            fill(this.color, this.color - random(0, 255), this.color - random(0, 255));
        } else {
          if (mouseClicks % 2 === 0) {
            this.color = random(0, 255);
            fill(this.color + random(0, 255), this.color, this.color - random(0, 255));
          } else {
            if (mouseClicks % 1 === 0) {
              this.color = random(0, 255);
              fill(this.color - random(0, 255), this.color + random(0, 255), this.color);
            }
          }
        }
		this.age = 0;
	}
	update(){
		// this.age += random(0.2, 2);
        this.age += 0.25 * (mouseClicks / 10);
		if(this.ded === false && 150<this.age){
			this.ded = true;
		}
		this.vel = [this.vel[0]*random(0.99, 1.001), this.vel[1]*random(0.99, 1.001), this.vel[2]*random(0.99, 1.001)];
        if (mouseClicks % 3 === 0) {
            this.x += this.vel[0];
            // this.color = random(50, 240);
            // fill(this.color, this.color - 50, this.color + 50);
        } else {
          if (mouseClicks % 2 === 0) {
            this.y += this.vel[1];
            // this.color = random(50, 240);
            // fill(this.color + 50, this.color, this.color - 50);
          } else {
            if (mouseClicks % 1 === 0) {
              this.z += this.vel[2];
              // this.color = random(50, 240);
              // fill(this.color - 50, this.color + 50, this.color);
            }
          }
        }
		
        
		translate(this.x, this.y, this.z);
		// sphere(10, 8, 4);
        rotateX(mouseClicks % 10);
        rotateY(mouseClicks % 10);
        box(15);
		translate(-this.x, -this.y, -this.z);
	}
}

function mouseReleased() {
	for(var i = 0; i<200; i++){
		particles.push(new particle);
	}
    mouseClicks += 1;
    if(mouseClicks == 35) {
      mouseClicks = 0; 
    }
}
