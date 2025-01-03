let audioPlayer = document.getElementById('audio-player');
let songTitle = document.getElementById('song-title');
let songArtist = document.getElementById('song-artist');
let progressBar = document.getElementById('progress-bar');
let volumeSlider = document.getElementById('volume-slider');
let playlist = document.getElementById('playlist');

let songs = [
    {
        title: "Har Funn Maula",
        artist: "Vishal Dadlani and Zara Khan",
        file: "song1.mp3",
        cover: "cover1.jpg"
    },
    {
        title: "Raataan Lambiyan",
        artist: "Asees Kaur and Jubin Nautiyal",
        file: "song2.mp3",
        cover: "cover2.jpg"
    },
    // Add more songs as needed
];

let currentSongIndex = 0;

function loadSong(index) {
    let song = songs[index];
    audioPlayer.src = song.file;
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    document.getElementById('cover').style.backgroundImage = `url(${song.cover})`;
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play-pause').innerText = '⏸️';
    } else {
        audioPlayer.pause();
        document.getElementById('play-pause').innerText = '▶️';
    }
}

function prevSong() {
    currentSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    loadSong(currentSongIndex);
    audioPlayer.play();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
}

function seek(event) {
    let progressContainer = event.target;
    let position = (event.offsetX / progressContainer.offsetWidth) * audioPlayer.duration;
    audioPlayer.currentTime = position;
}

function updateProgress() {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
}

function setVolume(value) {
    audioPlayer.volume = value;
}

// Populate playlist
songs.forEach((song, index) => {
    let listItem = document.createElement('li');
    listItem.innerText = `${song.title} - ${song.artist}`;
    listItem.onclick = () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audioPlayer.play();
    };
    playlist.appendChild(listItem);
});

// Initial song load
loadSong(currentSongIndex);

// Event Listeners
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);


