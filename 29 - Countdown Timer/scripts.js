let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    // clear any existing timers
    clearInterval(countdown)
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it!
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft)
    } , 1000);
}

function adjustTime(number){
    return number < 10 ? '0' + number : number;
}

function displayTimeLeft(seconds, showHours = false){
    let hours = '';
    let minutes = Math.floor(seconds / 60);
    if(showHours && minutes >= 60){
        hours = `${Math.floor(seconds / 3600)}:`;
        minutes = (Math.floor(seconds / 60) % 60);
        minutes = adjustTime(minutes);
    }
    const remainderSeconds = seconds % 60;
    const display = hours + `${minutes}:${adjustTime(remainderSeconds)}`

    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp, adjustHour = false, showSeconds = false){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const adjustedHour = hours > 12 ? hours - 12 : hours;
    const minutes = end.getMinutes();
    const seconds = showSeconds ? `:${adjustTime(end.getSeconds())}` : '';

    endTime.textContent = `Be back at ${adjustHour ? adjustedHour : hours}:${adjustTime(minutes)}${seconds}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})