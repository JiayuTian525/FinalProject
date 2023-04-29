//When the hand is detected, perlin noise is drawn according to the position of the fingertips 
//and music is played when the fingertips are pinched together
//This chapter is designed according to becky's code example in week 9

let handpose;
let video;
let predictions = [];
let pinchTimeout;
let pinchStarted = false;
const timeToWait = 400; 
let s1, s2, s3, s4, narratorE;
let hasPlayedNarratorE = false; 

var t;
let timer = 0;

function preload(){
  s1 = loadSound("5.mp3");
  s2 = loadSound("2.mp3");
  s3 = loadSound("3.mp3");
  s4 = loadSound("4.mp3");
  narratorE = loadSound("end.mp3");

}

function setup() {
  createCanvas(880, 660); 
  video = createCapture(VIDEO); // Create a video capture object
  video.size(1640, 880); // Set the width and height of the video capture object

  handpose = ml5.handpose(video, modelReady); // Creating hand recognition models

  // Set to save new gestures in the global variable "predictions" when they are detected
  handpose.on("predict", results => {
    predictions = results;
    // play the narrator
    if(!hasPlayedNarratorE){ 
      narratorE.play();
      hasPlayedNarratorE = true;
    }
  });

  // Hide the video elements and show only the canvas
  video.hide();

  t = 0;

  push();
  noStroke();
  fill(243, 234, 226);
  rect(0, 0, 880, 660);
  pop();

}

function modelReady() {
  console.log("Model ready!"); 
}

function draw() {

  t += 0.005;
  timer ++;

  background(243, 234, 226, 10);

  // Mapping of all key points and skeletons
  drawKeypoints();
  doPinch();

    if(timer>5 && timer< 180){
    push();
    textSize(18);
    textAlign(CENTER);
    fill(0);
    text('Please try to pinch and listen to the melody', width/2, height/2);
    pop();
  }
}

// do the pinch
function doPinch() {
  if(predictions.length > 0){ // If a gesture is detected
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      // Get thumb and forefinger
      const indexF = prediction.annotations.indexFinger[3];
      const thumb = prediction.annotations.thumb[3];
      //Get middle finger, ring finger, little finger
      const middleF = prediction.annotations.middleFinger[3];
      const ringF = prediction.annotations.ringFinger[3];
      const pinky = prediction.annotations.pinky[3];


      // the change of perlin noise according to time
      var x1 = width * noise(t + 15);
      var x2 = width * noise(t + 25);
      var x3 = width * noise(t + 35);
      var x4 = width * noise(t + 45);
      var y1 = height * noise(t + 55);
      var y2 = height * noise(t + 65);
      var y3 = height * noise(t + 75);
      var y4 = height * noise(t + 85);
      
      //draw the curves
      noFill();
      stroke(232, 123, 116);
      bezier(indexF[0], indexF[1], x2, y2, x3, y3, x4, y4);
      stroke(89, 151, 155);
      bezier(x1, y1, thumb[0], thumb[1], x3, y3, x4, y4);
      stroke(68, 105, 161);
      bezier(x1, y1, x2, y2, middleF[0], middleF[1], x4, y4);
      stroke(57, 93, 75, 100);
      bezier(x1, y1, x2, y2, x3, y3, ringF[0], ringF[1]);
      stroke(158, 174, 193);
      bezier(pinky[0], pinky[1], x2, y2, x3, y3, x4, y4);


      
      let pinchDist = dist(thumb[0], thumb[1],indexF[0], indexF[1]);//Distance between thumb and index finger
      let pinchDist2 = dist(middleF[0], middleF[1],thumb[0], thumb[1]);//Distance between thumb and middle finger
      let pinchDist3 = dist(ringF[0], ringF[1],thumb[0], thumb[1]);//Distance between thumb and ring finger
      let pinchDist4 = dist(pinky[0], pinky[1],thumb[0], thumb[1]);//Distance between thumb and pinky
      console.log(thumb);

      // The z-position of the camera isnoisy, this value allows the distance to be compared with the z-position
      let zOffset = map(thumb[2],20,-50,20,100);
      let zOffset2 = map(middleF[2],20,-150,20,120);
      let zOffset3 = map(ringF[2],20,-50,20,100); 
      let zOffset4 = map(pinky[2],20,-50,20,100);

      // The pinch of the index / thumb is called here
      if( pinchDist < zOffset){ 
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); 
        
       
      }else if(pinchStarted){ 
        pinchStarted = false; 
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch,timeToWait);
        console.log("click");
      }

      //The pinch of the middle / thumb is called here
      if( pinchDist2 < zOffset2){ 
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); 

      }else if(pinchStarted){ 
        pinchStarted = false; 
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch2,timeToWait);
        console.log("click");
      }

      //The pinch of the ring / thumb is called here
      if( pinchDist3 < zOffset3){ 
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); 


      }else if(pinchStarted){ 
        pinchStarted = false; 
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch3,timeToWait);
        console.log("click");
      }

      //The pinch of the pinky / thumb is called here
      if( pinchDist3 < zOffset4){ 
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); 
        

      }else if(pinchStarted){ //If the finger distance is greater than the threshold and pinchStarted is true, the pinch is considered finished
        pinchStarted = false;
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch4,timeToWait);
        console.log("click");
      }
      
    }

  }else{
    //clear our click if we lose tracking of hand
    pinchStarted = false;
    if(pinchTimeout) clearTimeout(pinchTimeout);
  }
}

//index
function pinch(){
  s1.play();
}

//middle
function pinch2(){
  s2.play();
}

//ring
function pinch3(){
  s3.play();
}

//pinky
function pinch4(){
  s4.play();
}

function pickImg(){
  let index = Math.floor(random(images.length));
  image(images[index], 20, 20, 1007/10, 1316/10);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(243, 234, 226);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
