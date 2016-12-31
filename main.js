//~~~~~~~~~~~~~~~~~~~VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var players = [
  {
    name: 'red'
  },
  {
    name: 'black'
  }
];

var board = document.querySelector('.board');
// var board = jQuery('.board');

var count = 0;
var spaces = 42;
var currentPlayer = players[1]; //start as black player, so when next turn is run, red starts the game
var button = document.querySelector('button');

//~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//changes who currentPlayer points at
var nextTurn = function() {
"use strict";
  var pikachu = document.querySelector('.pikachu');
  var snorlax = document.querySelector('.snorlax');
  if (currentPlayer.name === 'red') {
    // whichPlayer.textContent = 'player: black';
    // whichPlayer.style.color = "black"
    pikachu.classList.remove('active');
    snorlax.classList.add('active');
    currentPlayer = players[1];
      } else {
    // whichPlayer.textContent = 'player: red';
    // whichPlayer.style.color = "red"
    snorlax.classList.remove('active');
    pikachu.classList.add('active');
    currentPlayer = players[0];
  }
};

//function creates board using innerHTML and runs addEventListenrs function
var renderBoard = function () {
"use strict";
 var html = '';
 for (var i = 0; i < 6; i++) {
   html += '<div class="row">';
   for (var j = 0; j < 7; j++) {
     html += '<div class="hole open" data-row="' + i + '" data-col="' + j + '">' + '</div>';
   }
   html += '</div>';
 }
 board.innerHTML = html;
};

//adds color based off currentPlayer.name
var handleClick = function(event) {
"use strict";
  if (event.target.classList.contains('open')) {
    var row = event.target.dataset.row;
    var col = event.target.dataset.col;
    row = parseInt(row);
    col = parseInt(col);
    checkSquare(row, col);
    scan();
    if(count > 3) return;
    else nextTurn();
  }
};

//function used to recursively check for the bottom of the board using input from the rows
var checkSquare = function(row, col) {
"use strict";
  var ahole = document.querySelectorAll('.hole[data-row="' + row + '"]' );
  var aOneBelow = document.querySelectorAll('.hole[data-row="' + (row + 1) + '"]' );
    // if square is open
    // and if square below is not open
  if (ahole[col].classList.contains('open') && !aOneBelow[col]) {

    if (currentPlayer.name === 'red') {
      ahole[col].classList.remove('open');
      ahole[col].classList.add('red');
      } else { //means current player is black
      ahole[col].classList.remove('open');
      ahole[col].classList.add('black');
      }
    return;
    //checks if current and spot below are both empty
    //if so, reloops into function one row lower
  } else if (ahole[col].classList.contains('open') && aOneBelow[col].classList.contains('open') ) {
    return checkSquare(row + 1, col);
  } else {
    //when reaches the very bottom, adds class
      if (currentPlayer.name === 'red') {
        ahole[col].classList.remove('open');
        ahole[col].classList.add('red');
    } else {
      ahole[col].classList.remove('open');
      ahole[col].classList.add('black');
      }
    return;
  }
};

/**
* Checks for winning combinations in a vertical formation
* @param {Number} row - the row number of the piece being scanned
* @param {Number} col - the column number of the piece being scanned
* @return {function} blackVertical - recursively calls the function with the same arguments but with row decremented
* @return {true} - returns out of the function to stop it from looping infinitely
*/
var blackVertical = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
    if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    return blackVertical(row - 1, col);
  } else
    count = 0;
    return;
};

//Checks for red vertical winning using row and column as input
var redVertical = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
    if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    return redVertical(row - 1, col);
  } else
    count = 0;
    return;
};

//Checks for black horizontal wins scanning right, using row and columns as starting location
var blackHorizontalR = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
    if (count > 3) {
    var h2 = document.querySelector('h2');
    h2.innerHTML = currentPlayer.name + " wins!";
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    return blackHorizontalR(row, col + 1);
  } else
    count = 0;
    return;
};

//Checks for black horizontal wins scanning left, using row and columns as starting location
var blackHorizontalL = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
    if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 2 || col > 5) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    return blackHorizontalL(row, col - 1);
  } else
    count = 0;
    return;
};

//Checks for red horizontal wins scanning right, using row and columns as starting location
var redHorizontalR = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
    if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    return redHorizontalR(row, col + 1);
  } else
    count = 0;
    return;
};

//Checks for red horizontal wins scanning left, using row and columns as starting location
var redHorizontalL = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 2 || col > 5) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    return redHorizontalL(row, col - 1);
  } else
    count = 0;
    return;
};

//Checks for black diagonal wins scanning right, using row and columns as starting location
var blackrDiag = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
    if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 5) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    return blackrDiag(row - 1, col + 1);
  } else
    count = 0;
    return;
};

//Checks for red diagonal wins scanning right, using row and columns as starting location
var redrDiag = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 5) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    return redrDiag(row - 1, col + 1);
  } else
    count = 0;
    return;
};

//Checks for black diagonal wins scanning left, using row and columns as starting location
var blacklDiag = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    return blacklDiag(row - 1, col - 1);
  } else
    count = 0;
    return;
};

//Checks for red horizontal wins scanning left, using row and columns as starting location
var redlDiag = function(row, col) {
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col);
if (count > 3) {
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    count = 0;
    return;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    return redlDiag(row - 1, col - 1);
  } else
    count = 0;
    return;
};

//scans the whole board and returns the coordinate of possible winning locations
var scan = function(){
"use strict";
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board

  for (var i = 0; i < hole.length; i++) {
  var row = parseInt(i / 7);
  var col = parseInt(i % 7);
  //check horizontal
  redHorizontalR(row,col);
  redHorizontalL(row,col);
  blackHorizontalR(row,col);
  blackHorizontalL(row,col);
  // check vertical
  redVertical(row, col);
  blackVertical(row, col);
  // check right diag
  blackrDiag(row, col);
  redrDiag(row, col);
  // check left diag
  blacklDiag(row, col);
  redlDiag(row, col);
  }
  spaces -=1;
  if (spaces === 0) tie();
};

//Called upon when count reaches 4, and will the end the game and declare a winner
var winner = function() {
"use strict";
var h2 = document.querySelector('h2');
var active = document.querySelector('.active');
h2.innerHTML = active.classList[0] + " wins!";
board.style.filter = "blur(5px)";
board.removeEventListener('click', handleClick);
return;
};

//Called upon when board has no available spaces left (var spaces === 0), ends game and declares game a tie
var tie = function() {
"use strict";
board.style.filter = "blur(5px)";
board.removeEventListener('click', handleClick);
var h2 = document.querySelector('h2');
h2.style.marginLeft = "auto";
h2.innerHTML = "tie game!";
return;
};

//When run, resets the board and all variables to starting values and states
var newGame = function() {
"use strict";
  var pikachu = document.querySelector('.pikachu');
  var snorlax = document.querySelector('.snorlax');
  var h2 = document.querySelector('h2');
  h2.innerHTML = "PLAYER:";
  board.style.filter = "blur(0px)";
  h2.style.background = "rgba(0,0,0,0)";
  h2.style.marginLeft = "-50px";
  pikachu.classList.remove('active');
  snorlax.classList.add('active');
  currentPlayer = players[1];
  spaces = 42;
  count = 0;
  renderBoard();
  board.addEventListener('click', handleClick);
  return;
};

//this event listener uses add class function, and makes clicked items in board red
board.addEventListener('click', handleClick);
button.addEventListener('click', newGame);

//run once at the very beginning of the game to generate the board
renderBoard();
