let cols, rows;
let scl = 20;
let zoff = 0;
let particles = [];
let flowfield;
let i = 0;
let narratorW;

function preload() {
  narratorW = loadSound('water.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  background(243, 234, 226);

  push();
  textSize(20);
  noStroke();
  textAlign(CENTER);
  fill(255);
  text('click on the screen and observe the colour change around the mouse', windowWidth/2, windowHeight/2-150);
  pop();

}

function draw() {
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
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  
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

function mousePressed() {
  if (!narratorW.isPlaying()) {
    narratorW.play();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.maxspeed = 2;

    this.color = color(68, 105, 161, 5);
  }

  follow(flowfield) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = flowfield[index];
    this.applyForce(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  // show() {
  //   // Change color based on mouse proximity
  //   let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
  //   if (d < 50) {
  //     this.color = color(232, 123, 116, 5);
  //   } else {
  //     this.color = color(68, 105, 161, 5);
  //   }
  //   strokeWeight(2); 
  //   stroke(this.color);
  //   point(this.pos.x, this.pos.y);
  // }
  
  show() {
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < 50) {
      this.color = color(89, 151, 155, 5);
    } else {
      this.color = color(68, 105, 161, 5);
    }
    strokeWeight(2); // 设置线条粗细

    // 添加闪光效果
    if (random(1) < 0.01) {
      stroke(255, 255, 255, 200);
      strokeWeight(1);
    } else {
      stroke(this.color);
    }
    point(this.pos.x, this.pos.y);
  }
}

function radialGradient(sX,sY,sR,eX,eY,eR,colorS,colorE){
  
  let gradient = drawingContext.createRadialGradient(sX,sY,sR,eX,eY,eR);
  
  gradient.addColorStop(0,colorS);
  gradient.addColorStop(1,colorE);
  
  drawingContext.fillStyle = gradient;
}