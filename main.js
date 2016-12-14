//~~~~~~~~~~~~~~~~~~~VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
var board = document.querySelector('.board');
// var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board

var currentPlayer = players[1];
//start as black player, so when next turn is run, red starts the game

//~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

//function creates board using innerHTML and runs addEventListenrs function
var renderBoard = function () {
 var html = '';
 for (var i = 0; i < 6; i++) {
   html += '<div class="row">';
   for (var j = 0; j < 7; j++) {
     html += '<div class="hole" data-row="' + i + '" data-col="' + j + '">' + newBoard[i][j] + '</div>';
   }
   html += '</div>'
 }
 board.innerHTML = html;
}

//adds color based off currentPlayer.name
var addClass = function(event) {
  var hole = document.querySelectorAll('.hole')
  var col; //the dataset of event.target column
  var row; //dataset of event.target row

      if (event.target.classList == "hole" && currentPlayer.name === "red") {
      // console.log(event.target.dataset.col)
      // console.log(this)
      col = event.target.dataset.col;
      console.log(col);
        if (col == 1) {
          hole[36].classList.add('red');
        }
       // event.target.classList.add('red');
       nextTurn();
      }

    else if (event.target.classList == "hole" && currentPlayer.name === "black") {
      // console.log(event.target.dataset.col)
      // console.log(this)
      col = event.target.dataset.col;
      console.log(col);

      if (col == 0) {
        hole[35].classList.add('black');
      }
      // event.target.classList.add('black');
      nextTurn();
    }
    }

var handleClick = function(event) {
  // var position = this.dataset;
  // console.log(this)
  // console.log(newBoard[position.row][position.col] = currentPlayer.name)
  // console.log('position: ', position);
  // console.log('column: ', position.col);
  // console.log('row', position.row);
  // renderBoard();
  // nextTurn();

}

//this event listener uses add class function, and makes clicked items in board red
board.addEventListener('click', addClass);
renderBoard();

