const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

const goodItems = ["🌱", "🚜", "🌽", "💧", "☀️"];
const badItems = ["🛢️", "🚫", "🔥", "💨"];

function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

function createItem() {
    const item = document.createElement("div");
    item.classList.add("item");

    const isGood = Math.random() > 0.3;

    item.textContent = isGood
        ? goodItems[Math.floor(Math.random() * goodItems.length)]
        : badItems[Math.floor(Math.random() * badItems.length)];

    item.style.left = randomPosition(620) + "px";
    item.style.top = randomPosition(320) + "px";

    item.addEventListener("click", () => {
        if (isGood) {
            score += 10;
        } else {
            score -= 5;
        }

        scoreEl.textContent = score;
        item.remove();
    });

    gameArea.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 2000);
}

function startGame() {
    score = 0;
    timeLeft = 30;

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    gameArea.innerHTML = "";

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    gameInterval = setInterval(createItem, 700);

    timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    alert(`Fim de jogo!\nSua pontuação foi: ${score}`);
}

startBtn.addEventListener("click", startGame);
