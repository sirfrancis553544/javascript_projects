const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// song titles
const songs = ["hey", "summer", "ukulele", "Koffee-Rapture"];

// keep track of song
//starting with ululele
let songIndex = 2;

// initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// play song adding 'play' to the class in the DOM
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

// pause song adding remove the play word from class="music-container *play*" in DOM
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// previous song
function prevSong() {
  // reduce by index
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  // reduce by index
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// update progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set progress bar clickable
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  // get the duration of song
  const duration = audio.duration;
  // now set the current time of audio to that direct position
  audio.currentTime = (clickX / width) * duration;
  // prints out width of progress bar
  // console.log(width);
}

// event listener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// time/ song update
audio.addEventListener("timeupdate", updateProgress);

// click on progress bar
progressContainer.addEventListener("click", setProgress);

// move to next song after end
audio.addEventListener("ended", nextSong);
