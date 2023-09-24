
const audioElements = document.querySelectorAll('.audio-player');
const playPauseButtons = document.querySelectorAll('.play-pause-button');
const previousButtons = document.querySelectorAll('.previous-button');
const nextButtons = document.querySelectorAll('.next-button');


let currentTrackIndex = 0;

function updatePlayPauseButton(audio) {
    const button = audio.nextElementSibling.querySelector('.play-pause-button');
    if (audio.paused) {
        button.classList.remove('fa-pause');
        button.classList.add('fa-play');
    } else {
        button.classList.remove('fa-play');
        button.classList.add('fa-pause');
    }
}


function togglePlayPause(audio) {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayPauseButton(audio);
}


playPauseButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        togglePlayPause(audioElements[index]);
    });
});

previousButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + audioElements.length) % audioElements.length;
        audioElements[currentTrackIndex].currentTime = 0;
        togglePlayPause(audioElements[currentTrackIndex]);
    });
});

nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % audioElements.length;
        audioElements[currentTrackIndex].currentTime = 0;
        togglePlayPause(audioElements[currentTrackIndex]);
    });
});


audioElements.forEach((audio) => {
    audio.addEventListener('play', () => {
        updatePlayPauseButton(audio);
    });

    audio.addEventListener('pause', () => {
        updatePlayPauseButton(audio);
    });
});

