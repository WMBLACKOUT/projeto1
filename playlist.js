// Lista de elementos de áudio e botões de controle
const audioPlayers = document.querySelectorAll(".audio-player");
const playPauseButtons = document.querySelectorAll(".play-pause-button");
const previousButtons = document.querySelectorAll(".previous-button");
const nextButtons = document.querySelectorAll(".next-button");
const currentTimes = document.querySelectorAll(".current-time");
const totalTimes = document.querySelectorAll(".total-time");

// Função para pausar todos os áudios
function pauseAllAudio() {
    audioPlayers.forEach((audio) => {
        audio.pause();
    });
}

// Função para reproduzir ou pausar o áudio
function togglePlayPause(audio, playPauseButton, currentIndex) {
    if (audio.paused) {
        pauseAllAudio(); // Pausa todos os outros áudios
        audio.play();
        playPauseButton.classList.remove("fa-play");
        playPauseButton.classList.add("fa-pause");
    } else {
        audio.pause();
        playPauseButton.classList.remove("fa-pause");
        playPauseButton.classList.add("fa-play");
    }
}

// Função para retroceder para a faixa anterior
function playPrevious(audio, currentIndex) {
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
        pauseAllAudio(); // Pausa todos os outros áudios
        audioPlayers[previousIndex].currentTime = 0;
        audioPlayers[previousIndex].play();
    }
}

// Função para avançar para a próxima faixa
function playNext(audio, currentIndex) {
    const nextIndex = currentIndex + 1;

    if (nextIndex < audioPlayers.length) {
        pauseAllAudio(); // Pausa todos os outros áudios
        audioPlayers[nextIndex].currentTime = 0;
        audioPlayers[nextIndex].play();
    }
}

// Atualiza o tempo atual e o tempo total do áudio
function updateAudioTime(audio, currentIndex) {
    const currentTime = currentTimes[currentIndex];
    const totalTime = totalTimes[currentIndex];

    audio.addEventListener("timeupdate", () => {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);

        currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
        totalTime.textContent = `${totalMinutes}:${totalSeconds}`;
    });
}

// Adicionar eventos de clique aos botões de controle
playPauseButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        togglePlayPause(audioPlayers[index], button, index);
        updateAudioTime(audioPlayers[index], index);
    });
});

previousButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        playPrevious(audioPlayers[index], index);
    });
});

nextButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        playNext(audioPlayers[index], index);
    });
});
