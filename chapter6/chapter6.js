// Animation and audio appear when a face is detected

let faceapi,
    video,
    detections;

let petals = [];
let narratorD;
let playedAudio = false;

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

function preload() {
  narratorD = loadSound('myDear.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, webcamReady);
  video.size(width, height); 
  video.hide(); 
  
  for (let i = 0; i < 150; i++) {
    petals.push(new Petal());
  }
}

function webcamReady(stream) {
  // load the faceapi model - with modelReady() callback
  faceapi = ml5.faceApi(video, detection_options, modelReady)
}

function draw() {
  background(243, 234, 226);
  
  // if we have detections, draw them on the image
  if (detections) {
    // when we call detect, we are looking for potentially multiple faces, so ml5.js returns an array of objects, therefore here we use a for loop to get each 'person'.
    for (let person of detections) {
      for (let p of petals) {
    p.update();
    p.display();
  }
      //play the narrator
      if (!playedAudio) {
        narratorD.play();
        playedAudio = true;
      }
    
    // show the text
    textSize(18);
    textAlign(CENTER);
    fill(0);
    text('My Dear, Happy Spring', windowWidth/2, windowHeight/2-100);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// callback for when ml5.js has loaded the model
function modelReady() {
  console.log("Model is ready...");

  // ask ml5 to detect a faces in the video stream previously provided - gotResults() callback
  faceapi.detect(gotResults);
}

// ml5.js has determined if there's a face
function gotResults(err, result) {
    // check if ml5.js returned an error - if so print to console and stop
    if (err) {
        console.log(err)
        return
    }
      
    // if it gets here we are okay, so store results in the detections variable, this is an OBJECT of detections - see the console
    //console.log(result);
    detections = result;
      
    // we recursively call face detect
    faceapi.detect(gotResults)
}

// the petal class in chapter 4
  class Petal {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.size = random(5, 20);
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(0.5, 2);
    this.color = color(235, 194, 204);
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