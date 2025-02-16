let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startStopBtn.textContent = "Start";
        startStopBtn.style.background = "#28a745";
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        startStopBtn.textContent = "Pause";
        startStopBtn.style.background = "#ffc107";
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    updateDisplay();
    startStopBtn.textContent = "Start";
    startStopBtn.style.background = "#28a745";
    lapsContainer.innerHTML = "";
}

function addLap() {
    if (!running) return;
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(elapsedTime);
    lapsContainer.appendChild(lapItem);
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
