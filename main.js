//Wait for the DOM content of the page to finish loading before executing the script
//等待网页的DOM内容加载完成后再执行脚本
document.addEventListener("DOMContentLoaded", function() {
  //Get the switchButton, chapterFrame and bgm elements of the page
  //获取网页中的switchButton、chapterFrame和bgm元素
  const switchButton = document.getElementById("switchButton");
  const chapterFrame = document.getElementById("chapterFrame");
  const bgm = document.getElementById("bgm"); 

  //Current chaptrt and is background music playing
  //当前正在播放的章节和背景音乐是否正在播放
  let currentChapter = 1;
  let isBgmPlaying = false;

  switchButton.textContent = "Start";

  //The corresponding function is performed when the user clicks
  //当用户点击"下一章节"按钮时执行对应的功能
  switchButton.addEventListener("click", function() {
    currentChapter++;
    if (currentChapter > 5) {
      currentChapter = 1;
    }
    chapterFrame.src = `chapter${currentChapter}/chapter${currentChapter}.html`;

    if (!isBgmPlaying) {
      bgm.play();
      isBgmPlaying = true;
      switchButton.textContent = "Next";
    }

  });
});