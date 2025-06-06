 const HITS_PER_LEVEL = 20;
const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

let score = 0;
let level = 1;
let speed = 1000;
let gameInterval = null;

function createHoles(num = 9) {
  gameBoard.innerHTML = '';
  for (let i = 0; i < num; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    gameBoard.appendChild(hole);
  }
}

function randomHole() {
  const holes = document.querySelectorAll('.hole');
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function showMonster() {
  const hole = randomHole();
  const monster = document.createElement('div');
  monster.classList.add('monster', `level-${level}`);
  hole.appendChild(monster);

  setTimeout(() => {
    monster.classList.add('show');
  }, 100);

  monster.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    hole.removeChild(monster);
    checkLevelUp();
  });

  setTimeout(() => {
    if (hole.contains(monster)) {
      hole.removeChild(monster);
    }
  }, speed);
}

function checkLevelUp() {
  if (score > 0 && score % HITS_PER_LEVEL === 0) {
    level++;
    levelDisplay.textContent = level;
    speed = Math.max(300, speed - 100);
    updateButtonColors();
    clearInterval(gameInterval);
    gameInterval = setInterval(showMonster, speed);
  }
}

function startGame() {
  clearInterval(gameInterval);
  score = 0;
  level = 1;
  speed = 1000;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  createHoles();
  updateButtonColors();
  gameInterval = setInterval(showMonster, speed);
}

function resetGame() {
  clearInterval(gameInterval);
  score = 0;
  level = 1;
  speed = 1000;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  createHoles();
  updateButtonColors();
}

function updateButtonColors() {
  const startBtn = document.getElementById('startButton');
  const resetBtn = document.getElementById('resetButton');
  for (let i = 1; i <= 10; i++) {
    startBtn.classList.remove(`level-${i}-btn`);
    resetBtn.classList.remove(`level-${i}-btn`);
  }
  startBtn.classList.add(`level-${level}-btn`);
  resetBtn.classList.add(`level-${level}-btn`);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);   