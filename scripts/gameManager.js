let nextRandom = 0;
let timerId; // for setting the timeInterval
let score = 0;
let highscoreCount = 0; 

let gameIsActive = false;
let gameOverActive = false; 
let playBtnIsActive = false;
let pauseBtnIsActive = false;

// imgages for the blocks
const bgImage = [
  'url(./img/brick01.png)',
  'url(./img/brick01.png)',
  'url(./img/brick02.png)',
  'url(./img/brick02.png)',
  'url(./img/brick03.png)',
  'url(./img/brick04.png)',
  'url(./img/brick05.png)'
]

let currentPosition = 4
let currentRotation = 0

// get the saved highscore from the local storage
getScore();

// BASIC FUNCTIONS
/////////////////////////////////////////

//function for random integer
function RandomIntInRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// random specifys shape and color of the single tetrominos
let random = RandomIntInRange(0, theTetrominoes.length - 1);
// current specifys the current Tetromino that is displayed
let current = theTetrominoes[random][currentRotation];

//draws the Tetromino
function draw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino');
    squares[currentPosition + index].style.backgroundImage = bgImage[random];
  })
}

//undraws the Tetromino
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
    squares[currentPosition + index].style.backgroundImage = 'none';
  })
}


// MAIN GAME FUNCTIONS
/////////////////////////////////////////

//move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

//freeze function
function freeze() {
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('taken'));

    //start a new tetromino falling
    random = nextRandom; // setting the displayed next tetromino as the current tetromino
    nextRandom = RandomIntInRange(0, theTetrominoes.length - 1); // setting new next tetromino
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4; 
    draw();
    displayShape();
    addScore();

    // checking if the first row is taken with a tetromino and if so => gameover
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      gameOver();
    }
  }
}

//add score
function addScore() {
  for (let i = 0; i < 199; i += width) {
    // specifying a row
    const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

    // if a row is full, remove blocks and let the others take the place, add 10 to score
    if (row.every(index => squares[index].classList.contains('taken'))) {
      score += 10;
      scoreDisplay.innerHTML = score;
      row.forEach(index => {
        squares[index].classList.remove('taken');
        squares[index].classList.remove('tetromino');
        squares[index].style.backgroundImage = '';
      })
      const squaresRemoved = squares.splice(i, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach(cell => grid.appendChild(cell));
    }
  }
}

function getScore() {
  if (localStorage.getItem('tetrisHighscore')) {
    highscoreCount = localStorage.getItem('tetrisHighscore');
  } else {
    highscoreCount = 0;
  }
  highscore.innerHTML = `${highscoreCount}`;
}

function clearScreen() {
  for (let i = 0; i < squares.length - 10; i++) {
    squares[i].classList.remove('tetromino')
    squares[i].classList.remove('taken')
    squares[i].style.backgroundImage = 'none';
  }
  score = 0;
}

function playGame() {
  startScreen.style.display = 'none';
  pauseScreen.style.display = 'none';
  gameOverScreen.style.display = 'none';
  gameScreen.style.display = 'flex';
  grid.style.display = 'grid';
  gameIsActive = true;
  draw()
  timerId = setInterval(moveDown, 1000);
  nextRandom = Math.floor(Math.random() * theTetrominoes.length)
  displayShape();
}

function pauseGame() {
  clearInterval(timerId);
  timerId = null;
  gameIsActive = false;
}

//game over
function gameOver() {
  clearInterval(timerId);
  gameScreen.style.display = 'none';
  gameOverScreen.style.display = 'flex';
  gameIsActive = false;
  gameOverActive = true;
  endScore.innerHTML = `${score}`;

  // checking if the new score is higher than highscore
  if (score > highscoreCount) {
    highscoreCount = score;
    highscore.innerHTML = `${highscoreCount}`;
    window.localStorage.setItem('tetrisHighscore', highscoreCount);
  }
}

// start a new game
function restartGame(e) {
  if(e.keyCode === 32 && gameOverActive) {
    gameOverScreen.style.display = 'none';
    pauseScreen.style.display = 'none';
    gameScreen.style.display = 'flex';

    gameIsActive = true;
    gameOverActive = false;
    clearScreen();
    playGame();
  }
}

