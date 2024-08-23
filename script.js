const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')



//Music  
const songs=[
    {
        name:'jacinto-1',
        displayName:'Electric Chill',
        artist:'Jacinto Design',
        
    },

    {
        name:'jacinto-2',
        displayName:'Seven nation army remix',
        artist:'Jacinto Design',
        
    },
    {
        name:'jacinto-3',
        displayName:'goodnight',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName:'front-row',
        artist:'Metric/Jacinto Design'
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
      songIndex = songs.length-1;
    }
   console.log(songIndex)
   loadSong(songs[songIndex])
   playSong()
}


//next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex= 0
    }
   console.log(songIndex)
   loadSong(songs[songIndex])
   playSong()
}


//On load - Select First Song
loadSong(songs[songIndex]);
//Event listener
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)