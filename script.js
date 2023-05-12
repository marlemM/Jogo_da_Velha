let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(cellIndex) {
  if (!gameActive || gameState[cellIndex] !== '') {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  document.getElementsByClassName('cell')[cellIndex].textContent = currentPlayer;
  document.getElementsByClassName('cell')[cellIndex].classList.add(currentPlayer);

  checkWin();
  checkTie();
  changePlayer();
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] === currentPlayer &&
      gameState[b] === currentPlayer &&
      gameState[c] === currentPlayer
    ) {
      document.getElementById('status').textContent = `${currentPlayer} ganhou!`;
      gameActive = false;
      return;
    }
  }
}

function checkTie() {
  if (!gameState.includes('')) {
    document.getElementById('status').textContent = 'Empate!';
    gameActive = false;
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  document.getElementById('status').textContent = '';

  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('X', 'O');
  }
}

document.getElementById('board').addEventListener('click', function (e) {
  const cellIndex = parseInt(e.target.getAttribute('data-cell'));
  handleCellClick(cellIndex);
});

document.getElementById('restart-button').addEventListener('click', restartGame);
