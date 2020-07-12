/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullScreen')

/* Bulid out functions */
function togglePlay(){/*
    if (video.paused){
        video.play();
    }
    else{
        video.pause();
    }*/
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    //console.log('Update the button: %s', icon);
}

function skip(){
    //console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    //console.log(this.name);
    //console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    //console.log(e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

/* View in fullscreen */
function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (video.exitFullscreen) {
    video.exitFullscreen();
  } else if (video.mozCancelFullScreen) { /* Firefox */
    video.mozCancelFullScreen();
  } else if (video.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    video.webkitExitFullscreen();
  } else if (video.msExitFullscreen) { /* IE/Edge */
    video.msExitFullscreen();
  }
}

function fullScreenChange() {
    openFullscreen();
}
handleProgress();
/* Hook up the event listners */ 
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);
//video.addEventListener('progress', handleProgress);

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', fullScreenChange);

handleProgress();
