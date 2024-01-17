
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const pauseBtn = document.querySelector('#pauseBtn');
const width = 10;

// screens
const startScreen = document.querySelector('#startScreen');
const gameScreen = document.querySelector('#gameScreen');
const pauseScreen = document.querySelector('#pauseScreen');
const gameOverScreen = document.querySelector('#gameOverScreen');

// arrow buttons
const arrowUp = document.querySelector('#arrowUp');
const arrowRight = document.querySelector('#arrowRight');
const arrowDown = document.querySelector('#arrowDown');
const arrowLeft = document.querySelector('#arrowLeft');

// pause/play buttons
const btnPause = document.querySelector('#btnPause');
const btnPlay = document.querySelector('#btnPlay');

// scores
const highscore = document.querySelector('#highscore');
const endScoreText = document.querySelector('#endScoreText');
const endScore = document.querySelector('#endScore');


// //create 200 div squares inside the grid
// for (let i = 0; i < 200; i++) {
//   square = grid.appendChild(document.createElement('div'));
//   squares.push(square);
// }

// //create one more for the bottom of the grid
// for (let i = 0; i < 10; i++) {
//   squareTaken = grid.appendChild(document.createElement('div'));
//   squares.push(square);
//   squareTaken.classList.add('taken');
// }

// TETROMINO SHAPES 

const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const lTetromino2 = [
    [2, width+2, width*2+2, 1],
    [width, width+1, width+2, 2],
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const zTetromino2 = [
    [1,width,width+1,width*2],
    [width, width+1,width*2+1,width*2+2],
    [1,width,width+1,width*2],
    [width, width+1,width*2+1,width*2+2],
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

// Array of all Tetrominos
  const theTetrominoes = [lTetromino,lTetromino2, zTetromino, zTetromino2, tTetromino, oTetromino, iTetromino];