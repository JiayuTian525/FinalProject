//This project presents an interactive poem in the form of a web page. 
//The poem is divided into six chapters. 
//Hope you can turn on the sound when read the poem.

//Name: Jiayu Tian ID:33718520

//References:
//Chapter 1: https://creative-coding.decontextualize.com/text-and-type/ (text and mouse interaction)
//Chapter 3: https://youtu.be/-MUOweQ6wac (gradient color)
//           https://genekogan.com/code/p5js-perlin-noise/ (perlin noise)
//Chapter 4: https://youtu.be/3yqANLRWGLo (real-time detection and emotion estimation)
//Chapter 5: https://genekogan.com/code/p5js-perlin-noise/ (perlin noise)
//Chapter 5: https://editor.p5js.org/colormotor/sketches/CnvCWHZuw (IS71074B's code example)

document.addEventListener("DOMContentLoaded", function() {
  //Get the switchButton, chapterFrame and bgm elements of the page
  const switchButton = document.getElementById("switchButton");
  const chapterFrame = document.getElementById("chapterFrame");
  const bgm = document.getElementById("bgm"); 

  //Current chapter and is background music playing
  let currentChapter = 1;
  let isBgmPlaying = false;

  switchButton.textContent = "Start";

  //The corresponding function is performed when the user clicks
  //At chapter1 the button shows Start
  //At chapter6 the button shows End
  //Button shows Next at other chapters
  switchButton.addEventListener("click", function() {
    currentChapter++;

    if (currentChapter === 6) {
      switchButton.textContent = "End";
    } else if (currentChapter > 6) {
      currentChapter = 1;
      switchButton.textContent = "Start";
    } else {
      switchButton.textContent = "Next";
    }

    chapterFrame.src = `chapter${currentChapter}/chapter${currentChapter}.html`;

  //Play the bgm
    if (!isBgmPlaying) {
      bgm.play();
      isBgmPlaying = true;
    }

  });
});
