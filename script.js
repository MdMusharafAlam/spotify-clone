// Initialize Variables
let songIndex = 0;

let audioElement = new Audio("songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "On & On", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Shine", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Why We Lose", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Sky High", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Symbolism", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Heroes Tonight", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Feel Good", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "My Heart", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Load songs
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Master Play
masterPlay.addEventListener("click", () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        gif.style.opacity = 1;

    } else {

        audioElement.pause();

        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");

        gif.style.opacity = 0;
    }

});

// Progress Bar
audioElement.addEventListener("timeupdate", () => {

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;

});

myProgressBar.addEventListener("change", () => {

    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

});

// Reset buttons
const makeAllPlays = () => {

    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {

        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");

    });

};

// Song Play
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {

    element.addEventListener("click", (e) => {

        makeAllPlays();

        songIndex = parseInt(e.target.id);

        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        audioElement.src = songs[songIndex].filePath;

        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;

        audioElement.play();

        gif.style.opacity = 1;

        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

    });

});

// Next
document.getElementById("next").addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;

    audioElement.play();

});

// Previous
document.getElementById("previous").addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;

    audioElement.play();

});

// Auto Next
audioElement.addEventListener("ended", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    audioElement.src = songs[songIndex].filePath;

    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;

    audioElement.play();

});