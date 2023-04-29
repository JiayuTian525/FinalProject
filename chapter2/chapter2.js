//Generate flowers in a fixed array of colours on mouse click

// Declare an array to store rose objects
const roses = [];

// Declare some variables for colors, sound, and other effects
let noiseScale = 0.05;
const colors = ["#4469a1", "#d49036", "#e87b74", "#395d4b", "#9eaec1", "#59979b"];
let colorIndex = 0;
let narrator1;
let isNarratorPlaying = false;
let timer = 0;
let transW = 0;

function preload() {
  narrator1 = loadSound('no.1.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(243, 234, 226);
  
  timer++;
  transW = transW +2;
  console.log(timer);
  
  //Show the text in certain time
  if(timer>5 && timer< 90){
    textSize(18);
    textAlign(CENTER);
    fill(0, transW);
    text('Please click on the screen', windowWidth/2, windowHeight/2 - 100);
  }
  // Update the value of the noiseScale variable according to the time change
  noiseScale = map(sin(frameCount * 0.01), -1, 1, 0.01, 0.1);

  //Each element in the roses array and calls the drawRose()
  for (let i = 0; i < roses.length; i++) {
    roses[i].drawRose();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(98, 80, 202);
}

function mousePressed() {
  //If the narrator is not playing, play the sound and set isNarratorPlaying to true
  if (!isNarratorPlaying) {
    narrator1.play();
    isNarratorPlaying = true;
  }
  
  // Generate a new rose and add it to the roses array
  let radius = random(50, 150);
  let angle = random(120, 150);
  let scaleValue = 0.008;

  if (radius === 150) {
    scaleValue = 1;
  }
  
  let color = colors[colorIndex];
  roses.push(new Rose(mouseX, mouseY, radius, angle, scaleValue, color));
  colorIndex = (colorIndex + 1) % colors.length;
}

// Define a class to create rose objects
class Rose {
  constructor(x, y, radius, angle, scaleValue, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.scaleValue = scaleValue;
    this.color = color;
  }

  //Draw a single rose
  drawRose() {
    push();
    translate(this.x, this.y);
    scale(this.scaleValue);
    fill(this.color);
    stroke(0);
    strokeWeight(5);

    // Use perlin noise to create the curve of the rose petals
    beginShape();
    for (let i = 0; i < 400; i++) {
      let r = this.radius * cos(this.angle * i);
      let x = r * cos(i);
      let y = r * sin(i);

      let noiseVal = noise(x * noiseScale, y * noiseScale, frameCount * 0.01);
      let d = map(noiseVal, 0, 1, this.radius / 2, this.radius);

      curveVertex(x * d, y * d);
    }
    endShape(CLOSE);

    pop();
  }
}