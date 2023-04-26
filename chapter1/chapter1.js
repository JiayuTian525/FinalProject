
//Opening animation

let i = 0;
let timer = 0;
let timerA = 0;
let transA = 0;
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
  
  // 控制背景颜色
  //if (bgColorSwitch) {
  //   background(232, 123, 116); // 粉色
  // } else {
  //   background(89, 151, 155); // 蓝绿
  // }
  
  background(243, 234, 226);
  
  push();
  // 控制圆形填充颜色
  if (circleColorSwitch) {
    stroke(68, 105, 161); // 蓝色
  } else {
    stroke(232, 123, 116); // 粉色
  }
  
  //noStroke();
  strokeWeight(50);
  noFill();
  ellipse(windowWidth/2, windowHeight/2, 500*sin(i), 500*sin(i));
  i += 0.1;
  pop();
  
  // 每30帧切换一次颜色
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
  text(
    sourceText.substring(left, right+1),
    width/2, height/2);
  pop();
  
  fill(89, 151, 155, transA);
  if(timerA>90){
    //fill(255, transA);
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
