const musicPlayer = document.getElementById('music-player');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBox = document.getElementById('progress-box');
const progress = document.getElementById('progress');

// SONG TITLES
const songNames = ['Drain You', 'If I Could Fly', 'Ransom', 'Roxanne', 'colbie caillat']
const songBands = ['Nirvana', 'One Direction', 'Lil Tecca', 'Arizona Zervas', 'colbie caillat']

// KEEP TRACK OF SONG
let songIndex = songBands.length - 1

// INITIALLY LOAD SONG DETAILS INTO DOM
loadSong(songNames[songIndex], songBands[songIndex])

// UPDATE SONG DETAILS
function loadSong(name, band) {
    console.log(name, band)
    title.innerText = `${name} - ${band}`
    audio.src = `musicas/${band}.mp3`
    cover.src = `imagens/${band}.jpg`
}

// PLAY SONG
function playSong() {
    musicPlayer.classList.add('play')

    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicPlayer.classList.remove('play')

    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    
    audio.pause()
}

// PREVIOUS SONG
function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songBands.length - 1
    }

    loadSong(songNames[songIndex], songBands[songIndex])
    playSong()
}

// NEXT SONG
function nextSong() {
    songIndex++
    
    if (songIndex > songBands.length - 1) {
        songIndex = 0
    }
    
    loadSong(songNames[songIndex], songBands[songIndex])
    playSong()
}

// UPDATE PROGRESS BAR

function updateProgress(event) {
    const {duration, currentTime } = event.srcElement

    const progressPercent = (currentTime / duration) * 100

    progress.style.width = `${progressPercent}%`
}

// SET PROGRESS
function setProgress(event) {
    const width = this.clientWidth

    const clickX = event.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// EVENT LISTENERS
playBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// CHANGE SONG
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// TIME SONG UPDATE EVENT
audio.addEventListener('timeupdate', updateProgress)

// CLICK ON PROGRESS BAR
progressBox.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)