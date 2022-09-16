const title = document.getElementById('title');
const artist = document.getElementById ('artist');
const music = document.querySelector('audio');

const current_time_el = document.getElementById('current-time');
const duration_el = document.getElementById('duration');
const progress = document.getElementById('progress');
const progress_container =  document.getElementById('progress-container');

const prev_btn = document.getElementById('prev');
const play_btn = document.getElementById('play');
const next_btn = document.getElementById('next');

const songs = [
    {
   name: 'MM',
   display_name: 'Karakol',
   artist: 'Mabel Matiz',
  }, 
  {
    name: 'TH',
    display_name: 'reflections',
    artist: 'Toshifumi Hinata',

  }

]


let is_playing = false

function play_song() {
    is_playing = true
    play_btn.classList.replace('fa-circle-play', 'fa-circle-pause')
    music.play()

} 

function pause_song() {
    is_playing = false 
    play_btn.classList.replace('fa-circle-pause', 'fa-circle-play')
    music.pause()
}


play_btn.addEventListener('click', () => (is_playing ? pause_song() : play_song()) )

function load_song (song) {
    title.textContent = song.display_name
    artist.textContent = song.artist
    music.src = `assets/music/${song.name}.mp3`
}

let song_index = 0 
load_song(songs[song_index])

function prev_song () {
    song_index--
    if (song_index<0){
        song_index = songs.length - 1 
    }
     
    load_song(songs[song_index])
    play_song()

}

function next_song () {
    song_index++
    if(song_index>songs.length-1){
        song_index = 0
    }
    load_song(songs[song_index])
    play_song()
}






function update_progress_bar(e) {
     if(is_playing){
        const {duration, current_time} = e.srcElement
        
        
        const progress_percent = (current_time/duration)*100
        progress.style.width = `${progress_percent}%`

        //calculate and display for duration

        const duration_minutes = Math.floor(duration/60)
        let duration_seconds = Math.floor(duration%60)

        if(duration_seconds<10) {
            duration_seconds = `0${duration_seconds}`
        }

        if(duration_seconds) {
            duration_el.textContent = `${duration_minutes}:${duration_seconds}`
        }

        const current_minutes = Math.floor(current_time/60)
        let current_seconds = Math.floor(current_time%60)

        if(current_seconds<10) {
            current_seconds = `0${current_seconds}`
        }
          current_time_el.textContent = `${current_minutes}:${current_seconds}`

        }
}


   function set_progress_bar (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    music.current_time = (clickX/width)*duration

   }
   
prev_btn.addEventListener('click',prev_song)
next_btn.addEventListener('click', next_song );
music.addEventListener('ended',next_song)
music.addEventListener('timeupdate', update_progress_bar)
progress_container.addEventListener('click', set_progress_bar)