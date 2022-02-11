const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const videoTimeValue = document.querySelector(".video-time");
const timeLine = document.querySelector(".timeLine");
let volumeValue = 0.5;
video.volume = volumeValue;

console.log("import");
const handlePlayAndStop = () => {
    if (video.paused) {
        video.play();
        console.log(1);
        psBtn.className = "fas fa-pause";
    } else {
        video.pause();
        console.log(1);
        psBtn.className = "fas fa-play";
    }
};

const handleSound = () => {
    if (video.muted) {
        video.muted = false;
        volumeRange.value = volumeValue;
        volumeBtn.className = "fas fa-volume-up";
    } else {
        video.muted = true;
        volumeRange.value = 0;
        volumeBtn.className = "fas fa-volume-mute";
    }
};

const handleVolume = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        volumeBtn.className = "fas fa-volume-mute";
    }
    if (value === "0") {
        volumeBtn.className = "fas fa-volume-off";
    } else {
        volumeBtn.className = "fas fa-volume-up";
    }
    video.volume = volumeValue = value;
};

const setVideoTime = () => {
    const durationValue = Math.floor(Number(video.duration));
    const currentTime = Math.floor(video.currentTime);
    //F'를 눌러 전체 화면 모드로 들어가기, Esc 키를 눌러 전체 화면 모드에서 나오기
    videoTimeValue.innerHTML = `0:${
        currentTime < 10 ? `0${currentTime}` : currentTime
    } / 0:${durationValue}`;
    const parsedValue = (currentTime / durationValue) * 100;
    timeLine.value = parsedValue;
};

const keyInputHandler = (e) => {
    console.log(e.code);
    const value = e.code;
    if (value === "Space") {
        handlePlayAndStop();
    } else if (value === "KeyF") {
        //it is working at VSC with Chrome!
        video.requestFullscreen();
    } else if (value === "Escape") {
        //it is working at VSC with Chrome!
        video.exitFullscreen();
    }
};

const timeLineHandler = (e) => {
    const inputValue = e.target.value;
    const parsedValue = video.duration * inputValue * 0.01;
    video.currentTime = parsedValue;
};

timeLine.addEventListener("input", timeLineHandler);

function init() {
    setInterval(setVideoTime, 100);
    psBtn.addEventListener("click", handlePlayAndStop);
    volumeBtn.addEventListener("click", handleSound);
    volumeRange.addEventListener("input", handleVolume);
    document.onkeyup = keyInputHandler;
}

init();
