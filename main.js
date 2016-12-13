var newBoard = [
  [0, 1, 2, 3, 4, 5, 6],
  [1, 1, 2, 3, 4, 5, 6],
  [2, 1, 2, 3, 4, 5, 6],
  [3, 1, 2, 3, 4, 5, 6],
  [4, 1, 2, 3, 4, 5, 6],
  [5, 1, 2, 3, 4, 5, 6],
  [6, 1, 2, 3, 4, 5, 6],

];

var players = [
  {
    name: 'red'
  },
  {
    name: 'black'
  }
];

var currentPlayer;
//start as black player, so when next turn is run, red starts the game

var nextTurn = function() {
//changes who currentPlayer points at
  if (currentPlayer && currentPlayer.name === 'red') {
    currentPlayer = players[1];
    console.log(currentPlayer.name)
  } else {
    currentPlayer = players[0];
    console.log(currentPlayer.name)
  }

}
var board = document.querySelector('.board');
var row = document.querySelector('.row');
var hole = document.querySelector('.hole');

var handleClick = function(event) {
  console.log(event.target, this);
  var position = this.dataset;
  renderBoard();
  nextTurn();
  currentPlayer.name === 'red' ? event.target.classList.add('pred') : event.target.classList.add('pblack');

}

var playerColor = function() {
currentPlayer.name === 'red' ? this.classList.add('pred') : this.classList.add('pblack');
}


var renderBoard = function () {
 var html = '';
 for (var i = 0; i < newBoard.length; i++) {
   html += '<div class="row">';
   for (var j = 0; j < newBoard[i].length; j++) {
     html += '<div class="hole" data-row="' + i + '" data-col="' + j + '">' + newBoard[i][j] + '</div>';
   }
   html += '</div>'
 }
 document.querySelector('.board').innerHTML = html;
}
board.addEventListener('click', handleClick);
// row.addEventListener('click', handleClick);
hole.addEventListener('click', renderBoard);

