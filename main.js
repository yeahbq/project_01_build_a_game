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
var count = 0;
var blackCount = 0;
var redCount = 0;

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
     html += '<div class="hole open" data-row="' + i + '" data-col="' + j + '">'  + '</div>';
   }
   html += '</div>'
 }
 board.innerHTML = html;
}

//adds color based off currentPlayer.name
var addClass = function(event) {
  // console.log(event.target.dataset);
  if (event.target.classList.contains('open')) {
      col = event.target.dataset.col;
  row = event.target.dataset.row;
  col = parseInt(col);
  row = parseInt(row);
  // debugger;
  console.log (row, col);
  checkSquare(row, col);
  scanBlack();
  scanRed();
  }
}

//function used to recursively check for the bottom of the board using input from the rows
var checkSquare = function(row, col) {
  var hole = document.querySelector('.hole[data-row="' + row + '"]' );
  var oneBelow = document.querySelector('.hole[data-row="' + (row + 1) + '"]' );
  var ahole = document.querySelectorAll('.hole[data-row="' + row + '"]' );
  var aOneBelow = document.querySelectorAll('.hole[data-row="' + (row + 1) + '"]' );
    // if square is open
    // and if square below is not open
  if (ahole[col].classList.contains('open') && !aOneBelow[col]) {

    if (currentPlayer.name === 'red') {
      ahole[col].classList.add('red');
      nextTurn();
    } else {ahole[col].classList.add('black');
      nextTurn();
      }
    ahole[col].classList.remove('open');
    return;
  } else if (ahole[col].classList.contains('open') && aOneBelow[col].classList.contains('open') ) {
    // debugger;
    return checkSquare(row + 1, col);
  } else {
      if (currentPlayer.name === 'red') {
      ahole[col].classList.add('red');
      nextTurn();
    } else {ahole[col].classList.add('black');
      nextTurn();
      }
    ahole[col].classList.remove('open');
    return;
  }
    // set one above
}

var blackVertical = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count === 4) {
    debugger;
    document.write("black vertical YOU WIN!");
    return;
  } else if (hole[i].classList.contains('black')) {
    count = count + 1;
    console.log(count);
    return blackVertical(row - 1, col);
  } else return count = 0;
}

var redVertical = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count === 4) {
    debugger;
    document.write("red vertical YOU WIN!");
    return;
  } else if (hole[i].classList.contains('red')) {
    count = count + 1;
    console.log(count);
    return redVertical(row - 1, col);
  } else return count = 0;
}

var blackHorizontal = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count >= 4) {
    console.log(row,col);
    // debugger;
    document.write("blackhorizontal WINS!");
    return;
  } else if (hole[i].classList.contains('black')) {
    count = count + 1;
    console.log(count);
    return blackHorizontal(row, col + 1);
  } else return count = 0;
}

var redHorizontal = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count >= 4) {
    // debugger;
    document.write("red horizontal WINS!");
    return;
  } else if (hole[i].classList.contains('red')) {
    count = count + 1;
    console.log(count);
    return redHorizontal(row, col + 1);
  } else return count = 0;
}

var blackrDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count === 4) {
    debugger;
    document.write("black rDiag YOU WIN!");
    return;
  } else if (hole[i].classList.contains('black')) {
    count = count + 1;
    console.log(count);
    return blackrDiag(row - 1, col + 1);
  } else return count = 0;
}

var redrDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count === 4) {
    debugger;
    document.write("red rDiag YOU WIN!");
    return;
  } else if (hole[i].classList.contains('red')) {
    count = count + 1;
    console.log(count);
    return redrDiag(row - 1, col + 1);
  } else return count = 0;
}

var blacklDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count === 4) {
    debugger;
    document.write("blackldiag YOU WIN!");
    return;
  } else if (hole[i].classList.contains('black')) {
    count = count + 1;
    console.log(count);
    return blacklDiag(row - 1, col - 1);
  } else return count = 0;
}

var redlDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
  // debugger;
  if (count === 4) {
    debugger;
    document.write("redldiag YOU WIN!");
    return;
  } else if (hole[i].classList.contains('red')) {
    count = count + 1;
    console.log(count);
    return redlDiag(row - 1, col - 1);
  } else return count = 0;
}

//runs all win conditions at very bottom row, column spot
var checkWin = function(row,col) {
  // debugger;
  blackVertical(row,col);
  redVertical(row,col);
  blackrDiag(row, col);
  redrDiag(row, col);
  blacklDiag(row, col);
  redlDiag(row, col);
  redHorizontal(row,col);
  blackHorizontal(row,col);

}

//scans the whole board and returns the coordinate of possible winning locations
var scanBlack = function(){
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board

  for (var j = 0; j < hole.length; j++) {
    if(hole[j].classList.contains('black')) {
      console.log(hole[j]);
     var rowz = parseInt(j / 7);
     var columnz = parseInt(j % 7);
      checkWin(rowz,columnz)
      // debugger;
    }
  }
}

var scanRed = function(){
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board

  for (var j = 0; j < hole.length; j++) {
    if(hole[j].classList.contains('red')) {
      console.log(hole[j]);
      var rowz = parseInt(j / 7);
      var columnz = parseInt(j % 7);
      checkWin(rowz,columnz)
      // debugger;
    }
  }
}

var handleClick = function(event) {
  var position = this.dataset;
  console.log(this)
  console.log(newBoard[position.row][position.col] = currentPlayer.name);
  renderBoard();
  nextTurn();

}

//this event listener uses add class function, and makes clicked items in board red
board.addEventListener('click', addClass);
renderBoard();
