const musicElements = document.querySelectorAll('.music');
const miniPlayerContainer = document.querySelector('.mini-player-container');
const miniPlayer = document.querySelector('.mini-player');
const musicInfo = document.querySelector('.music-info');
const miniPlayerControls = document.querySelector('.mini-player-controls');
const playPauseButton = document.querySelector('.play-pause-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const replayButton = document.querySelector('.replay-button');
const progressBar = document.querySelector('.progress-bar');
const timeSlider = document.querySelector('.progress-bar');
const currentTimeDisplay = document.querySelector('.current-time');
const totalTimeDisplay = document.querySelector('.total-time');
const audio = new Audio();

let currentMusicIndex = 0;
let isPlaying = false;

function updateMiniPlayer(index) {
    const music = musicElements[index];
    const title = music.querySelector('h3').textContent;
    const artist = music.querySelector('p').textContent;
    const image = music.querySelector('img').src;

    musicInfo.querySelector('h3').textContent = title;
    musicInfo.querySelector('p').textContent = artist;
    miniPlayer.querySelector('img').src = image;
}

function playMusic(index) {
    const music = musicElements[index];
    const audioSource = music.querySelector('audio').src;

    audio.src = audioSource;
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    updateMiniPlayer(index);
    playPauseButton.textContent = 'Pause';
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playPauseButton.textContent = 'Play';
}

function replayMusic() {
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
}

function nextMusic() {
    currentMusicIndex = (currentMusicIndex + 1) % musicElements.length;
    playMusic(currentMusicIndex);
}

function prevMusic() {
    currentMusicIndex = (currentMusicIndex - 1 + musicElements.length) % musicElements.length;
    playMusic(currentMusicIndex);
}

function updateSlider() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    timeSlider.value = (currentTime / duration) * 100;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic(currentMusicIndex);
    }
});

replayButton.addEventListener('click', () => {
    replayMusic();
});

prevButton.addEventListener('click', () => {
    prevMusic();
});

nextButton.addEventListener('click', () => {
    nextMusic();
});

timeSlider.addEventListener('input', () => {
    const duration = audio.duration;
    const seekTime = (timeSlider.value / 100) * duration;
    audio.currentTime = seekTime;
});

progressBar.addEventListener('input', () => {
    const duration = audio.duration;
    const seekTime = (progressBar.value / 100) * duration;
    audio.currentTime = seekTime;
});

musicElements.forEach((music, index) => {
    music.addEventListener('click', () => {
        currentMusicIndex = index;
        playMusic(currentMusicIndex);
    });
});

audio.addEventListener('ended', () => {
    nextMusic();
});

audio.addEventListener('timeupdate', () => {
    updateSlider();
});


playMusic(currentMusicIndex);
