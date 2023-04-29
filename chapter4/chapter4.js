//This chapter uses the expression recognition in ml5.js.
//Showing the screen effect when a smile is detected on a face

let faceapi;
let detections = [];

let video;
let canvas;

let narratorS;
let isNarratorPlaying = false;

let timer = 0;
let transW = 0;

let petals = [];

function preload() {
  narratorS = loadSound('smile.mp3');
}

//create the canvas, video elements and initialize the faceapi object
function setup() {
  frameRate();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");

  video = createCapture(VIDEO); //creat the video
  video.id("video");
  video.size(width, height);
  video.hide();
  //the number of the petals
  for (let i = 0; i < 100; i++) {
    petals.push(new Petal());
  }

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5
  };

  //Initialize the model
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function draw() {
  timer++;
  transW ++;
  
  //show the text according to time
  if(timer>5 && timer< 180){
    push();
    textSize(18);
    textAlign(CENTER);
    fill(0, transW);
    text('Please try to smile for a while', windowWidth/2, windowHeight/2);
    pop();
  }
  
  if (detections.length > 0) {
    let {angry, happy, surprised} = detections[0].expressions;
    if (happy > 0.5 && !isNarratorPlaying) { // add condition here
      isNarratorPlaying = true; // mark as played
      narratorS.play(); // play sound
    }
    if (happy > 0.5) {
      background(243, 234, 226);
      flower();
    } else {
      background(243, 234, 226);
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//When the faceapi object is ready to detect a face, call this function to start the detection
function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces
}

//When faceapi detects a face, it calls this function to process the face
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  detections = result;//Now all the data in this detections
  
  // if the happy emotion is detected
  if (detections.length > 0) {
    let {angry, happy, surprised} = detections[0].expressions;
    if (happy > 0.5) {
    
    }else {
      background(243, 234, 226);
    }
  } else {
    background(243, 234, 226);
  }
  
  drawBoxs(detections);//Draw detection box
  drawLandmarks(detections);//// Draw all the face points
  //drawExpressions(detections, 20, 250, 14);//Draw face expression
  faceapi.detect(gotFaces);// Call the function again at here
}

//Draw face detection box
function drawBoxs(detections){
  
  if (detections.length > 0) {//If at least 1 face is detected
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      push();
      stroke(0,0);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
      pop();
    }
  }
}

//facial feature points
function drawLandmarks(detections){
  if (detections.length > 0) {//If at least 1 face is detected
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        push();
        stroke(191,0,0,0);
        strokeWeight(8);
        point(points[i]._x, points[i]._y);
        pop();
      }
    }
  }
}

// Draw the flowers when the happy emotion is detected
function flower() {
  for (let p of petals) {
    p.update();
    p.display();
  }
  
   //flower1 右2
  for (let r11 = 0; r11 < 10; r11++) {
    stroke(57,93,75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/3*2, height, width/3*2, height/4*3 + frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/3*2, height, width/3*2, height/4*3 + 60);
    }
    noStroke();
  }

  push();
  fill(221, 159, 87);
  ellipse(width/3*2, height/4*3, 10, 10);
  translate(width/3*2, height/4*3);
  noStroke();
  for (let r1 = 0; r1 < 10; r1++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50);
    }
    rotate(PI / 5);
  }
  pop();


  //flower2 中粉
  for (let r21 = 0; r21 < 10; r21++) {
    stroke(57,93,75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/2, height, width/2, height/8*5 + frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/2, height, width/2, height/8*5 + 60);
    }
    noStroke();
  }
  
  push();
  fill(235, 194, 204);
  ellipse(width/2, height/8*5, 20, 20);
  translate(width/2, height/8*5);
  noStroke();

  for (let r2 = 0; r2 < 10; r2++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();
  
  
  //flower3 左2
   for (let r31 = 0; r31 < 10; r31++) {
    stroke(57,93,75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/3, height, width/3, height/2 + frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/3, height, width/3, height/2 + 60);
    }
    noStroke();
  }
  
  push();
  fill(68, 105, 161);
  ellipse(width/3, height/2, 10, 10);
  translate(width/3, height/2);
  noStroke();
  for (let r3 = 0; r3 < 10; r3++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();

  
  //flower4 右1
     for (let r41 = 0; r41 < 10; r41++) {
    stroke(57, 93, 75); //(85,107,47,20)
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/6*5, height, width/6*5, height/8*5 + frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/6*5, height, width/6*5, height/8*5 + 60);
    }
    noStroke();
  }
  
  push();
  fill(89, 151, 155);
  ellipse(width/6*5, height/8*5, 20, 20);
  translate(width/6*5, height/8*5);
  noStroke();
  for (let r4 = 0; r4 < 10; r4++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();

  //flower5 左一
     for (let r51 = 0; r51 < 10; r51++) {
    stroke(57, 93, 75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/6, height, width/6, height/8*5 + frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/6, height, width/6, height/8*5 + 60);
    }
    noStroke();
  }
  
  push();
  fill(232, 123, 116);
  ellipse(width/6, height/8*5, 10, 10);
  translate(width/6, height/8*5);
  noStroke();
  for (let r5 = 0; r5 < 10; r5++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();
  
    //flower6 左一上
     for (let r51 = 0; r51 < 10; r51++) {
    stroke(57, 93, 75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/6, 0, width/6, height/6 - frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/6, 0, width/6, height/6 - 60);
    }
    noStroke();
  }
  
  push();
  fill(232, 123, 116);
  ellipse(width/6, height/6, 10, 10);
  translate(width/6, height/6);
  noStroke();
  for (let r5 = 0; r5 < 10; r5++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();
  
  //flower7 中粉上
  for (let r21 = 0; r21 < 10; r21++) {
    stroke(57,93,75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/2, 0, width/2, height/6 - frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/2, 0, width/2, height/6 - 60);
    }
    noStroke();
  }
  
  push();
  fill(235, 194, 204);
  ellipse(width/2, height/6, 20, 20);
  translate(width/2, height/6);
  noStroke();

  for (let r2 = 0; r2 < 10; r2++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();
  
    //flower8 右1上
  for (let r41 = 0; r41 < 10; r41++) {
    stroke(57, 93, 75); //(85,107,47,20)
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/6*5, 0, width/6*5, height/6 - frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/6*5, 0, width/6*5, height/6 - 60);
    }
    noStroke();
  }
  
  push();
  fill(89, 151, 155);
  ellipse(width/6*5, height/6, 20, 20);
  translate(width/6*5, height/6);
  noStroke();
  for (let r4 = 0; r4 < 10; r4++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();
  
  //flower9 右2
  for (let r11 = 0; r11 < 10; r11++) {
    stroke(57,93,75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/3*2, 0, width/3*2, height/3 - frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/3*2, 0, width/3*2, height/3 - 60);
    }
    noStroke();
  }

  push();
  fill(221, 159, 87);
  ellipse(width/3*2, height/3, 10, 10);
  translate(width/3*2, height/3);
  noStroke();
  for (let r1 = 0; r1 < 10; r1++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50);
    }
    rotate(PI / 5);
  }
  pop();
  
  
    //flower10 左2上
   for (let r31 = 0; r31 < 10; r31++) {
    stroke(57,93,75);
    strokeWeight(3);
    if (frameCount <= 600) {
      line(width/3, 0, width/3, height/9 - frameCount / 10);
    }
    if (frameCount > 600) {
      line(width/3, 0, width/3, height/9 - 60);
    }
    noStroke();
  }
  
  push();
  fill(68, 105, 161);
  ellipse(width/3, height/9, 10, 10);
  translate(width/3, height/9);
  noStroke();
  for (let r3 = 0; r3 < 10; r3++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();

}

// the class of the petal
class Petal {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.size = random(5, 20);
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(0.5, 2);
    this.color = color(235, 194, 204, 100);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y > height) {
      this.y = random(-height, 0);
    }

    if (this.x > width || this.x < 0) {
      this.x = random(width);
    }
  }

  display() {
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    ellipse(0, 0, this.size, this.size / 2);
    ellipse(0, 0, this.size / 2, this.size);
    pop();
  }
}