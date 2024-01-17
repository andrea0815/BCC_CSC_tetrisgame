
// INPUT HANDLING
///////////////////////////////////// 

//move the tetromino left, unless is at the edge or there is a blockage
function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if (!isAtLeftEdge) currentPosition -= 1;
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1;
  }
  draw();
}

//move the tetromino right, unless is at the edge or there is a blockage
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
  if (!isAtRightEdge) currentPosition += 1;
  if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1;
  }
  draw();
}

//rotate the tetromino
function rotate() {
  undraw()
  currentRotation++;
  if (currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  checkRotatedPosition();
  draw();
}


///FIX ROTATION OF TETROMINOS AT THE EDGE 
function isAtRight() {
  return current.some(index => (currentPosition + index + 1) % width === 0)
}

function isAtLeft() {
  return current.some(index => (currentPosition + index) % width === 0)
}

function checkRotatedPosition(P) {
  P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
  if ((P + 1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
    if (isAtRight()) {            //use actual position to check if it's flipped over to right side
      currentPosition += 1;    //if so, add one to wrap it back around
      checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
    }
  }
  else if (P % width > 5) {
    if (isAtLeft()) {
      currentPosition -= 1;
      checkRotatedPosition(P);
    }
  }
}

// Game Controls
function control(e) {
  if (e.keyCode === 37) {
    moveLeft(); // Arrow Left
    arrowLeft.style.backgroundImage = 'url(./img/crossArrowLeft2.png)';
  } else if (e.keyCode === 38) {
    rotate(); // Arrow Up
    arrowUp.style.backgroundImage = 'url(./img/crossArrowUp2.png)';
  } else if (e.keyCode === 39) {
    moveRight(); // Arrow Right
    arrowRight.style.backgroundImage = 'url(./img/crossArrowRight2.png)';
  } else if (e.keyCode === 40) {
    moveDown(); // Arrow Down
    arrowDown.style.backgroundImage = 'url(./img/crossArrowDown2.png)';
  }

}

// Cross Button Animation when pressing keys
function controlRelease(e) {
  if (e.keyCode === 37) {
    arrowLeft.style.backgroundImage = 'url(./img/crossArrowLeft1.png)';
  } else if (e.keyCode === 38) {
    arrowUp.style.backgroundImage = 'url(./img/crossArrowUp1.png)';
  } else if (e.keyCode === 39) {
    arrowRight.style.backgroundImage = 'url(./img/crossArrowRight1.png)';
  } else if (e.keyCode === 40) {
    arrowDown.style.backgroundImage = 'url(./img/crossArrowDown1.png)';
  }
}

// Play/pause Button main function
function playButtonUp(e) {
  if (e.keyCode === 32 && !gameOverActive) {
    if (timerId) {
      pauseGame();
    } else {
      playGame();
    }
  }

  // Cross Button Animation when pressing keys
  if (e.keyCode === 32 && !playBtnIsActive) {
    btnPlay.style.backgroundImage = 'url(./img/btn01_static.png)';
    btnPause.style.backgroundImage = 'url(./img/btn02_active.png)';
    pauseScreen.style.display = 'none';
    grid.style.display = 'grid';
    playBtnIsActive = true;
  } else if (e.keyCode === 32 && playBtnIsActive) {
    btnPlay.style.backgroundImage = 'url(./img/btn01_active.png)';
    btnPause.style.backgroundImage = 'url(./img/btn02_static.png)';
    pauseScreen.style.display = 'flex';
    grid.style.display = 'none';
    playBtnIsActive = false;
  }
}

// Play/pause Button Animation when pressing keys
function playButtonDown(e) {
  if (e.keyCode === 32 && !playBtnIsActive) {
    btnPause.style.backgroundImage = 'url(./img/btn02_pressed.png)';
  } else if (e.keyCode === 32 && playBtnIsActive) {
    btnPlay.style.backgroundImage = 'url(./img/btn01_pressed.png)';
  }
}

// EVENT LISTENERS
/////////////////////////////////////////

document.addEventListener('keydown', control);
document.addEventListener('keyup', controlRelease);

document.addEventListener('keydown', playButtonDown);
document.addEventListener('keyup', playButtonUp);

document.addEventListener('keyup', restartGame);