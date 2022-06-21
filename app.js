const app = () => {
  const play = document.querySelector(".play");
  const song = document.querySelector(".song");
  const video = document.querySelector(".vid-container video");
  const outline = document.querySelector(".moving-outline circle");

  //Sounds
  const sound = document.querySelectorAll(".soundChange button");

  //Times
  const timeSelect = document.querySelectorAll(".timeChange button");

  //Time display
  const timeDisplay = document.querySelector(".timeDisplay");

  //dlina outline for animation
  const outlineLength = outline.getTotalLength();

  //vremya roboty / duration
  let fakeDuration = 120;
  


  //play/stop song
  play.addEventListener("click", () => {
    checkPlay(song);
  });

   //change vibe
   sound.forEach(sound => {
    sound.addEventListener("click", function(){
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlay(song);
    })
})

 //change time
 timeSelect.forEach(option => {
  option.addEventListener("click", function() {
      
      fakeDuration = this.getAttribute("time-data");
      // make krasivo otobrazh minut i sec
      timeDisplay.textContent = `0${ Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
      
  } )
})

  //check vkl or vykl
  const checkPlay = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //prepare to animation
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let second = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animation kruga sobstvenno
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animation taymer
    timeDisplay.textContent = `0${minutes}:${second}`

    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg"
        video.pause();
    }
    console.log(fakeDuration)

  };
};

app();

