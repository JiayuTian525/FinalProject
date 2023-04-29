//This chapter uses perlin noise to simulate water waves.
//The colour of the perlin noise changes as the mouse approaches

let cols, rows;
let scl = 20; //the scale of the flow field
let zoff = 0; //the initial value of the z-axis offset for perlin noise
let particles = []; //array to store particle objects
let flowfield; //variable to store the flow field vectors
let i = 0; //time control for sun
let narratorW;

function preload() {
  narratorW = loadSound('water.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //the number of columns and rows in the flow field
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  //particle objects
  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(243, 234, 226);
  
  //Shows the text
  push();
  textSize(20);
  noStroke();
  textAlign(CENTER);
  fill(255);
  text('click on the screen and observe the colour change around the mouse', windowWidth/2, windowHeight/2-150);
  pop();

}

function draw() {
  //Generate a flowfield and control the movement of particles according to it
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.01;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield); //Get vectors in the flow field
    particles[i].update(); //Update the position, velocity and acceleration of particles
    particles[i].edges(); //Boundary situations
    particles[i].show(); //Show the particles
  }
  
  //Draw a sun in the middle of the screen with gradient color
  push();
  radialGradient(width/2-30, height/2-30, 0, //start point
                 width/2+50, height/2+50, 130, //end point
                 color(232, 123, 116), //start color
                 color(255));//end color 243, 234, 226
  noStroke();
  i = i + 0.1;
  if(i<100){
    ellipse(width/2, height/2, i, i);
  } else {
  ellipse(width/2, height/2, 100, 100);
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(243, 234, 226);
}

// Play the narrator when mouse clicks
function mousePressed() {
  if (!narratorW.isPlaying()) {
    narratorW.play();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height)); //particle with random position
    this.vel = createVector(); //velocities
    this.acc = createVector(); //accelerations
    this.maxspeed = 2; 

    this.color = color(68, 105, 161, 5);
  }

  //find the vector in the flowfield according to the position of the particle
  follow(flowfield) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = flowfield[index];
    this.applyForce(force);
  }

  //update the position of the particle and then clear the acceleration to zero
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //add the vector to the acceleration of the particle
  applyForce(force) {
    this.acc.add(force);
  }

  //positioning particles according to whether or not they are outside the boundary
  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
  
  //show the particles
  show() {
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < 50) {
      this.color = color(89, 151, 155, 5);
    } else {
      this.color = color(68, 105, 161, 5);
    }
    strokeWeight(2); 

    // The shining effect
    if (random(1) < 0.01) {
      stroke(255, 255, 255, 200);
      strokeWeight(1);
    } else {
      stroke(this.color);
    }
    point(this.pos.x, this.pos.y);
  }
}

//The gradient color
function radialGradient(sX,sY,sR,eX,eY,eR,colorS,colorE){
  
  let gradient = drawingContext.createRadialGradient(sX,sY,sR,eX,eY,eR);
  
  gradient.addColorStop(0,colorS);
  gradient.addColorStop(1,colorE);
  
  drawingContext.fillStyle = gradient;
}