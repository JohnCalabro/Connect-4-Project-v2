const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1;

 let board = [
   [undefined],[undefined],[undefined],[undefined],[undefined],[undefined],
   [undefined],[undefined],[undefined],[undefined],[undefined],[undefined],
   [undefined],[undefined], [undefined], [undefined], [undefined],[undefined],
   [undefined], [undefined], [undefined],[undefined], [undefined],[undefined],
   [undefined], [undefined], [undefined],[undefined], [undefined],[undefined],
   [undefined], [undefined], [undefined],[undefined], [undefined],[undefined]
  ]

function makeBoard() {
  const board = document.getElementById('board');

  const clickableTop = document.createElement('tr');
  clickableTop.setAttribute('id', 'column-top');
  clickableTop.addEventListener('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    clickableTop.append(headCell);
  }

  board.append(clickableTop);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    
    board.append(row);
  }
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
  
    if (!board[y][x]) { 
      return y;
    } 
  }
  
  return null; 
}

function placeInGameBoard(y, x) { 
  const piece = document.createElement('div');
  piece.classList.add('piece');  
  piece.classList.add(`p${currPlayer}`);  
  piece.style.top = -50 * (y + 2); 
  
  console.log(piece)
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece); 
}

function finalResult(msg) {  
  alert(msg);
}

function handleClick(evt) {  
  const x = +evt.target.id;   
  
  const y = findSpotForCol(x);
  if (y === null) {    
    return;  
  }

  board[y][x] = currPlayer;  
  placeInGameBoard(y, x); 
  
  if (checkForWin()) {
    return finalResult(`Player ${currPlayer} won!`);
  }
  
  if (board.every(row => row.every(cell => cell))) {
    return finalResult('Tie!');
  }
    
  currPlayer = currPlayer === 1 ? 2 : 1;
}



function checkForWin() {  
  function _win(cells) {
    return cells.every( 
      ([y, x]) =>
        y >= 0 &&                
        y < HEIGHT && 
        x >= 0 &&      
        x < WIDTH &&  
        board[y][x] === currPlayer  
    ); 
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //y is constant, x changes
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //y chanfes, x is constant
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;  
      }
    }
  }
}
     
makeBoard();