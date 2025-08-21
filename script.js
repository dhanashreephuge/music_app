// Write your javascript here

    tracks = [
        {
            name: "Let Me Down Slowly",
            artist: "Alec Benjamin",
            cover: "image/alec.jpg",
            source: "music/let_me_down_slowly.mp3"
        },
        {
            name: "Let Me Love You",
            artist: "DJ Snake/Justin Beiber",
            cover: "image/dj.jpg",
            source: "music/let_me_love_you.mp3"
        },
        {
            name: "Perfect",
            artist: "Ed Sheeran",
            cover: "image/ed.jpg",
            source: "music/perfect.mp3"
        },
        
    ];


let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();


const title = document.querySelector(".audio-title");
const singer = document.querySelector(".audio-singer");
const coverImg = document.querySelector(".img");
const playBtn = document.querySelector(".play");
const skipBackBtn = document.querySelector(".skip-back");
const skipForwardBtn = document.querySelector(".skip-forward");
const progressBar = document.querySelector(".progress-bar");
const progressHead = document.querySelector(".progress-head");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const progressContainer = document.querySelector(".progress");


function loadTrack(index) {
  const track = tracks[index];
  title.textContent = track.name;
  singer.textContent = track.artist;
  coverImg.src = track.cover;
  audio.src = track.source;
  audio.load();
}
//loadTrack(tracks[currentTrackIndex]);
loadTrack(currentTrackIndex);


function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  coverImg.classList.add("rotate");

  
    if (!audio.src) {
        alert("Song path missing!");
        return;
    }

    audio.play().catch((error) => {
        console.error("Error playing track:", error);
        alert("This song could not be played. Please check the file path or file format.");
    });

}


function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  coverImg.classList.remove("rotate");
}


playBtn.addEventListener("click", () => {
  isPlaying ? pauseTrack() : playTrack();
});


skipBackBtn.addEventListener("click", () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});


skipForwardBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});


audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressHead.style.left = `${progressPercent}%`;

  
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});


progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});


function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}


audio.addEventListener("ended", () => {
  skipForwardBtn.click();
});


loadTrack(currentTrackIndex);


