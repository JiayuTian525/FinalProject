

let handpose;
let video;
let predictions = [];
let pinchTimeout;
let pinchStarted = false;
const timeToWait = 400; // 设置等待时间为 400 毫秒
let s1, s2, s3, s4, narratorE;
let hasPlayedNarratorE = false; 

var t;
let timer = 0;

function preload(){
  //加载声音
  s1 = loadSound("5.mp3");
  s2 = loadSound("2.mp3");
  s3 = loadSound("3.mp3");
  s4 = loadSound("4.mp3");
  narratorE = loadSound("end.mp3");

}

function setup() {
  createCanvas(880, 660); // 创建一个画布
  video = createCapture(VIDEO); // 创建一个视频捕捉对象
  video.size(1640, 880); // 设置视频捕捉对象的宽度和高度

  handpose = ml5.handpose(video, modelReady); // 创建手部识别模型

  // 设置当新的手势被检测到时，将其保存在全局变量 "predictions" 中
  handpose.on("predict", results => {
    predictions = results;
    if(!hasPlayedNarratorE){ // 如果还没有播放 narratorE，则播放它并将 hasPlayedNarratorE 设置为 true
      narratorE.play();
      hasPlayedNarratorE = true;
    }
  });

  // 隐藏视频元素，只显示画布
  video.hide();

  t = 0;

  push();
  noStroke();
  fill(243, 234, 226);
  rect(0, 0, 880, 660);
  pop();

}

function modelReady() {
  console.log("Model ready!"); // 手势识别模型已准备就绪
}

function draw() {

  t += 0.005;
  timer ++;

  background(243, 234, 226, 10);

  // 绘制所有关键点和骨架
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

// 执行捏合操作
function doPinch() {
  if(predictions.length > 0){ // 如果检测到手势
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      // 获取拇指和食指
      const indexF = prediction.annotations.indexFinger[3];
      const thumb = prediction.annotations.thumb[3];
      //获取中指，无名指，小指
      const middleF = prediction.annotations.middleFinger[3];
      const ringF = prediction.annotations.ringFinger[3];
      const pinky = prediction.annotations.pinky[3];


      // 绘制拇指和食指的圆形
      var x1 = width * noise(t + 15);
      var x2 = width * noise(t + 25);
      var x3 = width * noise(t + 35);
      var x4 = width * noise(t + 45);
      var y1 = height * noise(t + 55);
      var y2 = height * noise(t + 65);
      var y3 = height * noise(t + 75);
      var y4 = height * noise(t + 85);

      noFill();
      stroke(232, 123, 116);
      bezier(indexF[0], indexF[1], x2, y2, x3, y3, x4, y4);
      stroke(89, 151, 155);
      bezier(x1, y1, thumb[0], thumb[1], x3, y3, x4, y4);
      stroke(68, 105, 161);
      bezier(x1, y1, x2, y2, middleF[0], middleF[1], x4, y4);
      stroke(57, 93, 75);
      bezier(x1, y1, x2, y2, x3, y3, ringF[0], ringF[1]);
      stroke(158, 174, 193);
      bezier(pinky[0], pinky[1], x2, y2, x3, y3, x4, y4);


      // 获取拇指和食指之间的距离
      let pinchDist = dist(thumb[0], thumb[1],indexF[0], indexF[1]);//拇指和食指之间的距离
      let pinchDist2 = dist(middleF[0], middleF[1],thumb[0], thumb[1]);//拇指和中指之间的距离
      let pinchDist3 = dist(ringF[0], ringF[1],thumb[0], thumb[1]);//拇指和无名指之间的距离
      let pinchDist4 = dist(pinky[0], pinky[1],thumb[0], thumb[1]);//拇指和小指之间的距离
      console.log(thumb);
      // 摄像头的 z 位置有些嘈杂，但是这个值可以将距离与 z 位置进行比较
      let zOffset = map(thumb[2],20,-50,20,100);
      let zOffset2 = map(middleF[2],20,-150,20,120);
      let zOffset3 = map(ringF[2],20,-50,20,100); 
      let zOffset4 = map(pinky[2],20,-50,20,100);
      //console.log(zOffset,thumb[2] );

      //食指拇指捏合的pin在这里调用
      if( pinchDist < zOffset){ // 如果拇指和食指距离小于阈值，则认为捏合开始
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); //如果 pinchTimeout 已经存在，则清除该计时器
        
        // 绘制捏合时的事
      }else if(pinchStarted){ //如果手指距离大于阈值且 pinchStarted 为 true，则认为捏合结束
        pinchStarted = false; //设置 pinchStarted 为 false
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch,timeToWait);
        console.log("click");
      }

      //中指拇指捏合的pin在这里调用
      if( pinchDist2 < zOffset2){ // 如果拇指和食指距离小于阈值，则认为捏合开始
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); //如果 pinchTimeout 已经存在，则清除该计时器
        
        // 绘制捏合时的事

      }else if(pinchStarted){ //如果手指距离大于阈值且 pinchStarted 为 true，则认为捏合结束
        pinchStarted = false; //设置 pinchStarted 为 false
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch2,timeToWait);
        console.log("click");
      }

      //无名指拇指捏合的pin在这里调用
      if( pinchDist3 < zOffset3){ // 如果拇指和食指距离小于阈值，则认为捏合开始
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); //如果 pinchTimeout 已经存在，则清除该计时器
        
        // 绘制捏合时的事

      }else if(pinchStarted){ //如果手指距离大于阈值且 pinchStarted 为 true，则认为捏合结束
        pinchStarted = false; //设置 pinchStarted 为 false
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch3,timeToWait);
        console.log("click");
      }

      //小指拇指捏合的pin在这里调用
      if( pinchDist3 < zOffset4){ // 如果拇指和食指距离小于阈值，则认为捏合开始
        pinchStarted = true;
        if(pinchTimeout) clearTimeout(pinchTimeout); //如果 pinchTimeout 已经存在，则清除该计时器
        
        // 绘制捏合时的事

      }else if(pinchStarted){ //如果手指距离大于阈值且 pinchStarted 为 true，则认为捏合结束
        pinchStarted = false; //设置 pinchStarted 为 false
        
        //start pinch timeout on release of fingers
        pinchTimeout = window.setTimeout(pinch4,timeToWait);
        console.log("click");
      }
      
    }

  }else{
    // 在手部跟踪丢失时，设置 pinchStarted 为 false
    //clear our click if we lose tracking of hand
    pinchStarted = false;
    if(pinchTimeout) clearTimeout(pinchTimeout);
  }
}

//食指
function pinch(){
  //do something more interesting here
  // 当捏合动作结束时，触发 pinch() 函数，这个函数可以用来实现一些更有趣的操作
  s1.play();
  //randColor = pickRandomColor();
}

//中指
function pinch2(){
  s2.play();
}

//无名指
function pinch3(){
  s3.play();
}

//小指
function pinch4(){
  s4.play();
}

function pickImg(){
  let index = Math.floor(random(images.length));
  image(images[index], 20, 20, 1007/10, 1316/10);
}

// A function to draw ellipses over the detected keypoints
//该函数用于在检测到的关键点上绘制椭圆形，以可视化显示手部跟踪
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
