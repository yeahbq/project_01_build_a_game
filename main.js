var newBoard = [
  [0, 1, 0, 3, 4, 5, 6],
  [1, 1, 2, 3, 4, 5, 6],
  [2, 1, 2, 3, 4, 5, 6],
  [3, 1, 2, 3, 4, 5, 6],
  [4, 1, 2, 3, 4, 5, 6],
  [5, 1, 2, 3, 4, 5, 6]
];

var players = [
  {
    name: 'red'
  },
  {
    name: 'black'
  }
];

var row = document.querySelector('.row');

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

var handleClick = function(event) {
  // console.log(event.target, this);
  var position = this.dataset;
  newBoard[position.row][position.col] = currentPlayer.name;
  renderBoard();
  nextTurn();

  //   if (event.target.classList.contains('hole')) {
  //   console.log('got emmm')
  //   // hole.style.background = "red";
  // }
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
 addEventListeners();
}

var addEventListeners = function() {
var holes = document.querySelectorAll('.hole');
  for (var i = 0; i < holes.length; i++) {
    holes[i].addEventListener('click', handleClick)
  }

}
nextTurn();
renderBoard();
 // document.querySelector('.board').addEventListener('click', handleClick)

