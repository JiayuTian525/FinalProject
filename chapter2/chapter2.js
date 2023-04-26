const roses = [];
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
  //background(243, 234, 226);
}

function draw() {
  background(243, 234, 226);
  
  timer++;
  transW = transW +2;
  console.log(timer);
  
  if(timer>5 && timer< 90){
    textSize(18);
    textAlign(CENTER);
    fill(0, transW);
    text('Please click on the screen', windowWidth/2, windowHeight/2 - 100);
  }
  // 根据时间变化更新 noiseScale 变量的值
  noiseScale = map(sin(frameCount * 0.01), -1, 1, 0.01, 0.1);

  for (let i = 0; i < roses.length; i++) {
    roses[i].drawRose();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(98, 80, 202);
}

function mousePressed() {
  if (!isNarratorPlaying) {
    narrator1.play();
    isNarratorPlaying = true;
  }
  
  // 生成一朵新的玫瑰花，并将其加入 roses 数组中
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

class Rose {
  constructor(x, y, radius, angle, scaleValue, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.scaleValue = scaleValue;
    this.color = color;
  }

  drawRose() {
    push();
    translate(this.x, this.y);
    scale(this.scaleValue);
    fill(this.color);
    stroke(0);
    strokeWeight(5);

    beginShape();
    for (let i = 0; i < 400; i++) {
      let r = this.radius * cos(this.angle * i);
      let x = r * cos(i);
      let y = r * sin(i);

      // 计算噪声值
      let noiseVal = noise(x * noiseScale, y * noiseScale, frameCount * 0.01);
      let d = map(noiseVal, 0, 1, this.radius / 2, this.radius);

      curveVertex(x * d, y * d);
    }
    endShape(CLOSE);

    pop();
  }
}