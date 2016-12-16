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

// var row = document.querySelector('.row');
var board = document.querySelector('.board');
// var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
var count = 0;
var blackCount = 0;
var redCount = 0;
var spaces = 41;

var currentPlayer = players[1];
//start as black player, so when next turn is run, red starts the game

//~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var nextTurn = function() {
//changes who currentPlayer points at
var whichPlayer = document.querySelector('h2');
  if (currentPlayer && currentPlayer.name === 'red') {
    currentPlayer = players[1];
    whichPlayer.textContent = 'player: black';
    whichPlayer.style.color = "black"
    // console.log(currentPlayer.name, "turn")
    return currentPlayer.name;
      } else {
    currentPlayer = players[0];
    whichPlayer.textContent = 'player: red';
    whichPlayer.style.color = "red"
    // console.log(currentPlayer.name, "turn")
    return currentPlayer.name;
  }
}

//function creates board using innerHTML and runs addEventListenrs function
var renderBoard = function () {
 var html = '';
 for (var i = 0; i < 6; i++) {
   html += '<div class="row">';
   for (var j = 0; j < 7; j++) {
     html += '<div class="hole open" data-row="' + i + '" data-col="' + j + '">' + newBoard[i][j]  + '</div>';
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
    spaces -= 1;
  }
}

//function used to recursively check for the bottom of the board using input from the rows
var checkSquare = function(row, col) {
  // var hole = document.querySelector('.hole[data-row="' + row + '"]' );
  // var oneBelow = document.querySelector('.hole[data-row="' + (row + 1) + '"]' );
  var ahole = document.querySelectorAll('.hole[data-row="' + row + '"]' );
  var aOneBelow = document.querySelectorAll('.hole[data-row="' + (row + 1) + '"]' );
    // if square is open
    // and if square below is not open
  if (ahole[col].classList.contains('open') && !aOneBelow[col]) {

    if (currentPlayer.name === 'red') {
      ahole[col].classList.add('red');
      nextTurn();
    } else { ahole[col].classList.add('black');
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "black vertical");
    debugger;
    // document.write("black vertical YOU WIN!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "red vertical");
    // debugger;
    // document.write("red vertical YOU WIN!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "black horizontal");
    // debugger;
    // document.write("blackhorizontal WINS!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "red horizontal");
    // document.write("red horizontal WINS!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "black right diagonal");
    // document.write("black rDiag YOU WIN!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "red right diagonal");
    // document.write("red rDiag YOU WIN!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "black left diagonal");
    // document.write("blackldiag YOU WIN!");
    return winner();
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
  if (hole[i].classList.contains('open')) return count = 0;
  else if (count === 4) {
    console.log(count, "row", row, "col", col, "red left diagonal");
    // document.write("redldiag YOU WIN!");
    return winner();
  } else if (hole[i].classList.contains('red')) {
    count = count + 1;
    console.log(count);
    return redlDiag(row - 1, col - 1);
  } else return count = 0;
}

//runs all win conditions at very bottom row, column spot
var checkWin = function(row,col) {
  // check vertical
  blackVertical(row,col);
  redVertical(row,col);
  //check right diag
  blackrDiag(row, col);
  redrDiag(row, col);
  //check left diag
  blacklDiag(row, col);
  redlDiag(row, col);
  //check horizontal straigt across
  redHorizontal(row,col);
  blackHorizontal(row,col);

  //runs tie function if spaces <= 0
  if (spaces === 0) tie();
}

//scans the whole board and returns the coordinate of possible winning locations
var scanBlack = function(){
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board

  for (var j = 0; j < hole.length; j++) {
    if(hole[j].classList.contains('black')) {
     // console.log(hole[j]);
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
      // console.log(hole[j]);
      var rowz = parseInt(j / 7);
      var columnz = parseInt(j % 7);
      checkWin(rowz,columnz)
      // debugger;
    }
  }
}

var winner = function() {
nextTurn();
board.style.filter = "blur(5px)"
board.removeEventListener('click', addClass);
var h2 = document.querySelector('h2');
h2.style.transition = "1s"
h2.innerHTML = "<h1>" + currentPlayer.name + " wins!</h1>";
}

var tie = function() {
board.style.filter = "blur(5px)"
board.removeEventListener('click', addClass);
var h2 = document.querySelector('h2');
h2.style.transition = "1s"
h2.innerHTML = "<h1>tie game!</h1>";
}

// var handleClick = function(event) {
//   var position = this.dataset;
//   console.log(this)
//   console.log(newBoard[position.row][position.col] = currentPlayer.name);
//   renderBoard();
//   nextTurn();

// }

//this event listener uses add class function, and makes clicked items in board red
board.addEventListener('click', addClass);
renderBoard();
