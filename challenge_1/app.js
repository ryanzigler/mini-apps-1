/*========== VARIABLE DECLARATIONS ==========*/

const dynamicText = document.getElementById('announcements');
const gameSquare = document.querySelectorAll('.square');
const validWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var board = ['', '', '', '', '', '', '', '', ''];
var player = 'X';
var playGame = true;

/*========== FUNCTIONS TO UPDATE GAME TEXT ==========*/

var sayWinner = () => {
  return `${player} has won!`;
};

var sayCatsGame = () => {
  return 'Cat\'s Game:' + '<br />' + 'Click "Reset" to play again';
};

var sayPlayer = () => {
  return `${player}'s turn`;
};

/*========== GAME FUNCTIONALITY ==========*/

var clickRouter = (playerMove) => {
  var updateHTML = playerMove.target;
  var index = parseInt(updateHTML.getAttribute('cellNum'));

  if (board[index] === '' && playGame) {
    updateBoard(updateHTML, index);
    gameState();
  } else {
    return;
  }
};

var updateBoard = (updateHTML, index) => {
  board[index] = player;
  updateHTML.textContent = player;
};

var gameState = () => {
  for (var i = 0; i < validWins.length; i++) {
    var tic = board[validWins[i][0]];
    var tac = board[validWins[i][1]];
    var toe = board[validWins[i][2]];

    if (tic === 'X' || tic === 'O' && tac === 'X' || tac === 'O' && toe === 'X' || toe === 'O') {
      if (tic === tac && tic === toe) {
        dynamicText.textContent = sayWinner();
        playGame = false;
        return;
      }
    }
  }
  if (board.every(square => (square === 'X' || square === 'O'))) {
    dynamicText.innerHTML = sayCatsGame();
    playGame = false;
    return;
  }

  if (player === 'X') {
    player = 'O';
  } else {
    player = 'X';
  }
  dynamicText.textContent = sayPlayer();
};

var resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  player = 'X';
  playGame = true;
  dynamicText.textContent = sayPlayer();
  gameSquare.forEach(square => square.textContent = '');
};

/*========== HELPERS FOR DOM EVENTS ==========*/

dynamicText.textContent = sayPlayer(); // NEEDED TO DISPLAY FIRST PLAYER'S NAME IN BROWSER
gameSquare.forEach(square => square.addEventListener('click', clickRouter));
document.getElementById('reset').addEventListener('click', resetGame);
