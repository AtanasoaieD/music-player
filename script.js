const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')



//Music  
const songs=[
    {
        name:'Dreams',
        displayName:'Dreams',
        artist:'FleetWood Mac',
        
    },

    {
        name:'D you Know What I Mean',
        displayName:'D you Know What I Mean',
        artist:'Oasis',
        
    },
    {
        name:'Low Rider',
        displayName:'Low Rider',
        artist:'War'
    },
    {
        name:'Smells Like Teen Spirit',
        displayName:'Smells Like Teen Spirit',
        artist:'Nirvana'
    }



]

//Check if playing
let isPlaying = false

//Play
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','Pause')
    music.play()
}
//Pause
function pauseSong(){
    isPlaying=false
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Play')
    music.pause()
}


//Play/pause event listener
playBtn.addEventListener('click',()=>(isPlaying ? pauseSong() : playSong()))


//Update DOM
 function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist
    image.textContent = song.name
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`
}
//Current song
let songIndex=0;

//prev song
function prevSong(){
    songIndex--;
    if(songIndex< 0){
      songIndex = 3;
    }
   console.log(songIndex)
   loadSong(songs[songIndex])
   playSong()
}


//next song
function nextSong(){
    songIndex++;
    if(songIndex > 3){
        songIndex= 0
    }
   console.log(songIndex)
   loadSong(songs[songIndex])
   playSong()
}


//On load - Select First Song
loadSong(songs[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e){
    if(isPlaying){
        const{duration, currentTime} = e.srcElement
        
        //Update progress bar width
        const progressPercent = (currentTime / duration) *100;
        // console.log(progressPercent)
        progress.style.width=`${progressPercent}%`;

        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        console.log('minutes',durationMinutes)
        let durationSeconds = Math.floor(duration%60)
        if(durationSeconds<10){durationSeconds=`0 ${durationSeconds}`}
        console.log('seconds',durationSeconds);
        durationEl.textContent=  `${durationMinutes}:${durationSeconds}`
        //Delay switching duration Element to avoid Nan

        if(durationSeconds){
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`  
        }
        
        //Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60)
        
        let currentSeconds = Math.floor(currentTime%60)
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`}
        
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}

//Set Progress Bar
function setProgressBar(e){
   
    const width = this.clientWidth
    console.log('width',width)
    const clickX = e.offsetX
    console.log('clickX',clickX)
    const{duration} = music;
    console.log(clickX/width)
    console.log((clickX/width)*duration)
    music.currentTime = (clickX/width)*duration
}

//Event listener
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgressBar)
progressContainer.addEventListener('click',setProgressBar)
