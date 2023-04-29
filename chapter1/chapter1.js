
//The opening animation of the poem

let i = 0; //For circles
let timer = 0; //For time
let timerA = 0; //For time (arrow)
let transA = 0; //For transparency
let circleColorSwitch = false;
let bgColorSwitch = false;

let sourceText = "L e t ' s   S t a r t";

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  rectMode(CENTER);
}

function draw() { 
  timerA++;
  transA  = transA + 2.3;
  
  background(243, 234, 226);
  
  push();

  // Set stroke color based on circleColorSwitch
  if (circleColorSwitch) {
    stroke(68, 105, 161); // blue
  } else {
    stroke(232, 123, 116); // pink
  }
  
  strokeWeight(50);
  noFill();
  ellipse(windowWidth/2, windowHeight/2, 500*sin(i), 500*sin(i));
  i += 0.1;
  pop();
  
  // Switching colours every 30 frames
  timer++;
  if (timer > 30) {
    circleColorSwitch = !circleColorSwitch;
    bgColorSwitch = !bgColorSwitch;
    timer = 0;
  }
  
  push();
  fill(0);
  stroke(0);
  strokeWeight(2);
  textSize(32);
  textAlign(CENTER, CENTER);
  let middle = sourceText.length / 2;
  let left = middle - ((mouseX / width) * middle);
  let right = middle + ((mouseX / width) * middle);
  //Draw text with substring based on mouseX position
  text(
    sourceText.substring(left, right+1),
    width/2, height/2);
  pop();
  
  // Animate arrow consists of a rectangles after 90 frames
  fill(89, 151, 155, transA);
  if(timerA>90){
    noStroke();
  
    push();
    translate(windowWidth/2+14,80);
    rotate(radians(45));
    rect(0,0,50,10,10);
    pop();
  
    push();
    translate(windowWidth/2-14,80);
    rotate(radians(-45));
    rect(0,0,50,10,10);
    pop();
     
     }
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
