const songs = [
    {
        title: "Dreams",
        artist: "Benjamin Tissot",
        src: "songs/dreams.mp3",
        cover: "images/dreams.jpg"
    },
    {
        title: "Once Again",
        artist: "Benjamin Tissot",
        src: "songs/once-again.mp3",
        cover: "images/once-again.jpg"
    },
    {
        title: "Ukulele",
        artist: "Benjamin Tissot",
        src: "songs/ukulele.mp3",
        cover: "images/ukulele.jpg"
    }
];

const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.querySelectorAll("#playlist li");

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(index){

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    cover.src = songs[index].cover;

    audio.src = songs[index].src;

    playlist.forEach(item=>item.classList.remove("active"));

    playlist[index].classList.add("active");
}

loadSong(songIndex);

// Play Song
function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fas fa-pause"></i>';
}

// Pause Song
function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fas fa-play"></i>';
}

// Play Button

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }else{

        playSong();
    }

});

// Next Song

function nextSong(){

    songIndex++;

    if(songIndex>=songs.length){

        songIndex=0;
    }

    loadSong(songIndex);

    playSong();
}

nextBtn.addEventListener("click",nextSong);

// Previous Song

function prevSong(){

    songIndex--;

    if(songIndex<0){

        songIndex=songs.length-1;
    }

    loadSong(songIndex);

    playSong();
}

prevBtn.addEventListener("click",prevSong);

// Update Progress

audio.addEventListener("timeupdate",()=>{

    const percent =
    (audio.currentTime/audio.duration)*100;

    progress.value = percent || 0;

    currentTime.textContent =
    formatTime(audio.currentTime);

    duration.textContent =
    formatTime(audio.duration);

});

// Seek Song

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value/100)*audio.duration;

});

// Format Time

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const minutes =
    Math.floor(time/60);

    const seconds =
    Math.floor(time%60);

    return `${minutes}:${seconds<10?"0":""}${seconds}`;

}

// Volume

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

// Playlist Click

playlist.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        songIndex=index;

        loadSong(songIndex);

        playSong();

    });

});

// Autoplay Next Song

audio.addEventListener("ended",()=>{

    nextSong();

});