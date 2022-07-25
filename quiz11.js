/*
Inform the user that he can pause/play/stop the timer by clicking on their respective buttons - keep this on top of the window with alert element of bootstrap

eg. pause(), play(), stop()

ask for how many seconds timer user wants to set in input
ask for the message to be shown after the specified time in input

start the timer and keep updating the time in Text every 1 second

If the user didn't stopped the timer and the timer time was up, show him the text that he inserted before in modal element

*/

let
    message = document.getElementById('message'),
    timerId = null,
    playing = false,
    timerRunning = false,
    startBtn = document.getElementById('startBtn')
const
    timeLeft = document.getElementById('timeLeft'),
    currentBadge = document.getElementById('currentBadge'),
    controlBtn = document.getElementById('controlBtn'),
    timerDiv = document.getElementById('timerOn'),
    messageBox = document.getElementById('messageBox'),
    endMusic = new Audio('end.mp3')

const MusicManager = play => play ? endMusic.play() : endMusic.pause() ? '' : endMusic.currentTime = 0

const resetTimer = _ => {
    time.value = 0;
    timeLeft.innerText = 0
    message.value = '';
    timerId = null;
    startManager()
    playingManager()
}

const alertManager = (type, text) => {
    showAlert.classList.add(`alert-${type}`)
    showAlert.innerText = text
    showAlert.style.display = 'flex'
    setTimeout(() => {
        showAlert.classList.remove(`alert-${type}`)
        showAlert.innerText = ''
        showAlert.style.display = 'none'
    }, 3000);
}
const playingManager = action => {
    controlBtn.style.display = 'inline-block'
    if (action) {
        playing = true
        controlBtn.setAttribute('onclick', 'pause()')
        return controlBtn.innerText = 'Pause'
    }
    playing = false
    controlBtn.setAttribute('onclick', 'play()')
    controlBtn.innerText = 'Play'
}

const startManager = start => {
    if (start) {
        timerDiv.style.display = 'flex'
        startBtn.innerText = 'Stop'
        return startBtn.setAttribute('onclick', 'stop()')
    }
    timerDiv.style.display = 'none'
    startBtn.innerText = 'Start'
    startBtn.setAttribute('onclick', 'start()')
}

const timeFinished = _ => {
    console.log('finish')
    alertManager('success', message.value)
}

const startTimer = _ => {
    return setInterval(() => {
        if (timeLeft.innerText <= 0) {
            messageBox.innerText = message.value
            showMessage.click()
            return stop(true)
        }
        timeLeft.innerText -= 1
    }, 1000)
}
const start = () => {
    timerRunning = true
    timeLeft.innerText = time.value
    startManager(true)
    play()
}
const play = _ => {
    if (!playing && timerRunning) {
        playingManager(true)
        timerId = startTimer()
        currentBadge.innerText = 'Active'
    }
}
const pause = _ => {
    if (playing || timerRunning) {
        playingManager()
        clearInterval(timerId)
        currentBadge.innerText = 'Paused'
    }
}
const stop = finish => {
    if (timerRunning) {
        playingManager()
        clearInterval(timerId)
        resetTimer()
        !finish ? alertManager('danger', 'Stoped the Timer!') : MusicManager(true)
        timerRunning = false
        controlBtn.style.display = 'none'
    }
}