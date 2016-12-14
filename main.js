var newBoard = [
  [0, 1, 2, 3, 4, 5, 6],
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

var currentPlayer = players[1];
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
  var position = this.dataset;
  newBoard[position.row][position.col] = currentPlayer.name;
  nextTurn();
  renderBoard();

}

var renderBoard = function () {
 var html = '';
 for (var i = 0; i < 6; i++) {
   html += '<div class="row">';
   for (var j = 0; j < 7; j++) {
     html += '<div class="hole" data-row="' + i + '" data-col="' + j + '">' + newBoard[i][j] + '</div>';
   }
   html += '</div>'
 }
 document.querySelector('.board').innerHTML = html;
 addEventListeners();
}

var addEventListeners = function () {
  var holes = document.querySelectorAll('.hole');
for (var i = 0; i < holes.length; i++) {
  holes[i].addEventListner('click', handleClick);
  }
}

//adds color based off currentPlayer.name
var addclass = function(event) {
      // console.log(event.target);
      if (event.target.classList == "hole" && currentPlayer.name === "red")
      event.target.classList.add('red');
    else if (event.target.classList == "hole" && currentPlayer.name === "black")
      event.target.classList.add('black');
    }

var board = document.querySelector('.board')

board.addEventListener('click', addclass);

var holes = document.querySelectorAll('.hole');

nextTurn();
renderBoard();
 // document.querySelector('.board').addEventListener('click', handleClick)

