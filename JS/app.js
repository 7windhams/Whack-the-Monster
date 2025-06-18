const HITS_PER_LEVEL = 10;
const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const speedDisplay = document.getElementById('speedDisplay');
const hitsNeededDisplay = document.getElementById('hitsNeeded');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');

let score = 0;    
let level = 1;
let speed = 1000;
let gameInterval = null;
let isGameRunning = false;
let hitsThisLevel = 0;

function createHoles(num = 9) {
  gameBoard.innerHTML = '';
  for (let i = 0; i < num; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    gameBoard.appendChild(hole);
    }
}function randomHole() {
  const holes = document.querySelectorAll('.hole');
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}  
function showMonster() {
  if (!isGameRunning) return;
            
  const hole = randomHole(); 
  hole.innerHTML = '';   

const monster = document.createElement('div');
monster.classList.add('monster', `level-${level}`);
monster.innerHTML = '👹';
monster.style.animationDuration = `${speed}ms`; 
monster.style.width = '100px';
monster.style.height = '100px';
monster.style.fontSize = '50px';

hole.appendChild(monster);

monster.addEventListener('click', () => {
  console.log("Monster clicked! Score before:", score);

  if (!isGameRunning) return; 
    score++;
    hitsThisLevel++;
    scoreDisplay.textContent = score;
    hole.innerHTML = '';
    

                
    // Update hits needed display
    const remaining = HITS_PER_LEVEL - hitsThisLevel;
    hitsNeededDisplay.textContent = remaining;
    
    checkLevelUp();
    
  });
setTimeout(() => {
  if (hole.contains(monster)) {
    hole.innerHTML = '';
  }
}, speed);
}

function checkLevelUp() {
 if (hitsThisLevel >= HITS_PER_LEVEL) {
   if (level >= 10) {
       // Game completed!
       endGame();
       return;
   }

   level++;
   hitsThisLevel = 0;
   speed = Math.max(200, speed - 80); // Increase speed, minimum 200ms

  levelDisplay.textContent = level;
  speedDisplay.textContent = speed + 'ms';
  hitsNeededDisplay.textContent = HITS_PER_LEVEL;
                
    updateButtonColors();
                
                // Restart interval with new speed
    clearInterval(gameInterval);
    gameInterval = setInterval(showMonster, speed);
            }
        }

function startGame() {
  console.log("Game started!");
let score = 0;
console.log("Initial score:", score);
  console.log("Initial level:", level);
  console.log("Initial speed:", speed);

  if (isGameRunning) return;
            
  isGameRunning = true;

    gameOverDiv.style.display = 'none';
            
  clearInterval(gameInterval);
    score = 0;
    level = 1;
    speed = 1000;
    hitsThisLevel = 0;
            
scoreDisplay.textContent = score;
levelDisplay.textContent = level;
speedDisplay.textContent = speed + 'ms';
hitsNeededDisplay.textContent = HITS_PER_LEVEL;
            
createHoles();
updateButtonColors();
            
  gameInterval = setInterval(showMonster, speed);
        }

function resetGame() {
  isGameRunning = false;
   clearInterval(gameInterval);
            
    score = 0;
    level = 1;
    speed = 1000;
    hitsThisLevel = 0;
            
scoreDisplay.textContent = score;
levelDisplay.textContent = level;
speedDisplay.textContent = speed + 'ms';
hitsNeededDisplay.textContent = HITS_PER_LEVEL;
finalScoreDisplay.textContent = '';          
  createHoles();
  updateButtonColors();
    gameOverDiv.style.display = 'none';
        }

function endGame() {
 isGameRunning = false;
  clearInterval(gameInterval);
            
            // Clear all holes
const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => hole.innerHTML = '');
            
  finalScoreDisplay.textContent = score;
  gameOverDiv.style.display = 'block';
        }

  function updateButtonColors() {
    const startBtn = document.getElementById('startButton');
    const resetBtn = document.getElementById('resetButton');
    const body = document.body;
            
            // Remove all level classes from buttons
      for (let i = 1; i <= 10; i++) {
        startBtn.classList.remove(`level-${i}-btn`);
        resetBtn.classList.remove(`level-${i}-btn`);
        body.classList.remove(`level-${i}-bg`);
            }
            
            // Add current level class to buttons and body
        startBtn.classList.add(`level-${level}-btn`);
        resetBtn.classList.add(`level-${level}-btn`);
        body.classList.add(`level-${level}-bg`);
        }

        // Event listeners
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);

        // Initialize the game
        createHoles();
        updateButtonColors();
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        