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
    console.log(currentPlayer.name, "turn")
      } else {
    currentPlayer = players[0];
        console.log(currentPlayer.name, "turn")
  }
}

//function creates board using innerHTML and runs addEventListenrs function
var renderBoard = function () {
 var html = '';
 for (var i = 0; i < 6; i++) {
   html += '<div class="row">';
   for (var j = 0; j < 7; j++) {
     html += '<div class="hole open" data-row="' + i + '" data-col="' + j + '">' + newBoard[i][j] + '</div>';
   }
   html += '</div>'
 }
 board.innerHTML = html;
}

//adds color based off currentPlayer.name
var addClass = function(event) {
  console.log(event.target.dataset);
//this if statement adds class depending on currentPlayer
  if (event.target.classList.contains('open')) {
    // console.log(event.target)
  if (currentPlayer.name == "red") event.target.classList.add('red');
    else event.target.classList.add('black')
  nextTurn();
  event.target.classList.remove('open');
  }
}

var rockBottom = function(arr) {
  var hole = document.querySelectorAll('.hole')
  var col; //the dataset of event.target column
  var row; //dataset of event.target row
  for (var i = 0; i < hole.length; i++) {
    col = hole[i].dataset.col;
    row = hole[i].dataset.row;
    if (row > 4) console.log(i, "row", row, "col", col);

    // console.log(row);
  }

}


var checkSquare = function(row, col) {

  var hole = document.querySelector('.hole[data-row="' + row + '"]')
  var oneBelow = document.querySelector('.hole[data-row="' + (row + 1) + '"]')
    // if square is open
    // and if square below is not open
  if ( hole.classList.contains('open') && !oneBelow ) {
    debugger;
    hole.classList.add('red');
    hole.classList.remove('open');
    return;
  } else if ( hole.classList.contains('open') && oneBelow.classList.contains('open') ) {
    return checkSquare(row + 1, col);
  } else {
    hole.classList.add('red');
    hole.classList.remove('open');
    return;
  }
    // set one above
}

var handleClick = function(event) {
  // var position = this.dataset;
  // console.log(this)
  // console.log(newBoard[position.row][position.col] = currentPlayer.name)
  // renderBoard();
  // nextTurn();


}

//this event listener uses add class function, and makes clicked items in board red
board.addEventListener('click', addClass);
renderBoard();

