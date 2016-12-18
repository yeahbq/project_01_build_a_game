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
var count = 0;
var blackCount = 0;
var redCount = 0;
var spaces = 42;
var currentPlayer = players[1]; //start as black player, so when next turn is run, red starts the game
var button = document.querySelector('button');

//~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//changes who currentPlayer points at
var nextTurn = function() {
  var whichPlayer = document.querySelector('h2');
  var pikachu = document.querySelector('.pikachu')
  var snorlax = document.querySelector('.snorlax')
  if (currentPlayer.name === 'red') {
    // whichPlayer.textContent = 'player: black';
    // whichPlayer.style.color = "black"
    pikachu.classList.remove('active')
    snorlax.classList.add('active')
    currentPlayer = players[1];
      } else {
    // whichPlayer.textContent = 'player: red';
    // whichPlayer.style.color = "red"
    snorlax.classList.remove('active')
    pikachu.classList.add('active')
    currentPlayer = players[0];
  }
}

//function creates board using innerHTML and runs addEventListenrs function
var renderBoard = function () {
 var html = '';
 for (var i = 0; i < 6; i++) {
   html += '<div class="row">';
   for (var j = 0; j < 7; j++) {
     html += '<div class="hole open" data-row="' + i + '" data-col="' + j + '">' + '</div>';
   }
   html += '</div>'
 }
 board.innerHTML = html;
}

//adds color based off currentPlayer.name
var handleClick = function(event) {
  if (event.target.classList.contains('open')) {
    var row = event.target.dataset.row;
    var col = event.target.dataset.col;
    row = parseInt(row);
    col = parseInt(col);
    console.log (row, col);
    checkSquare(row, col);
    scan();
    if(count > 3) return;
    else nextTurn();
  }
}

//function used to recursively check for the bottom of the board using input from the rows
var checkSquare = function(row, col) {
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
}

var blackVertical = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
    if (count > 3) {
    // console.log(count, "row", row, "col", col, "black vertical");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    // console.log(count);
    return blackVertical(row - 1, col);
  } else return count = 0;
}

var redVertical = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
    if (count > 3) {
    // console.log(count, "row", row, "col", col, "red vertical");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    // console.log(count);
    return redVertical(row - 1, col);
  }
  else return count = 0;
}

var blackHorizontalR = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
    if (count > 3) {
    // console.log(count, "row", row, "col", col, "black horizontal right");
    var h2 = document.querySelector('h2');
    h2.innerHTML = currentPlayer.name + " wins!";
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    // console.log(count);
    return blackHorizontalR(row, col + 1);
  } else return count = 0;
}

var blackHorizontalL = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
    if (count > 3) {
    // console.log(count, "row", row, "col", col, "black horizontal left");
    return winner();
  } else if (row < 0 || row > 5 || col < 2 || col > 5) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    // console.log(count);
    return blackHorizontalL(row, col - 1);
  } else return count = 0;
}

var redHorizontalR = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
    if (count > 3) {
    // console.log(count, "row", row, "col", col, "red horizontal right");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    // console.log(count);
    return redHorizontalR(row, col + 1);
  } else return count = 0;
}

var redHorizontalL = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
if (count > 3) {
    // console.log(count, "row", row, "col", col, "red horizontal left");
    return winner();
  } else if (row < 0 || row > 5 || col < 2 || col > 5) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    // console.log(count);
    return redHorizontalL(row, col - 1);
  } else return count = 0;
}

var blackrDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
    if (count > 3) {
    // console.log(count, "row", row, "col", col, "black right diagonal");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 5) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    // console.log(count);
    return blackrDiag(row - 1, col + 1);
  } else return count = 0;
}

var redrDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
if (count > 3) {
    // console.log(count, "row", row, "col", col, "red right diagonal");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 5) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    // console.log(count);
    return redrDiag(row - 1, col + 1);
  } else return count = 0;
}

var blacklDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
if (count > 3) {
    // console.log(count, "row", row, "col", col, "black left diagonal");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('black')) {
    count = count + 1;
    // console.log(count);
    return blacklDiag(row - 1, col - 1);
  } else return count = 0;
}

var redlDiag = function(row, col) {
  var hole = document.querySelectorAll('.hole'); //needs to call this within function to get updated board
  var i = (row*7 + col)
if (count > 3) {
    // console.log(count, "row", row, "col", col, "red left diagonal");
    return winner();
  } else if (row < 0 || row > 5 || col < 0 || col > 6) {
    return count = 0;
  } else if (hole[i] && hole[i].classList.contains('red')) {
    count = count + 1;
    // console.log(count);
    return redlDiag(row - 1, col - 1);
  } else return count = 0;
}

//scans the whole board and returns the coordinate of possible winning locations
var scan = function(){
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
  redVertical(row, col)
  blackVertical(row, col)
  // check right diag
  blackrDiag(row, col);
  redrDiag(row, col);
  // check left diag
  blacklDiag(row, col);
  redlDiag(row, col);
  }
  spaces -=1;
  if (spaces == 0) tie();
}

var winner = function() {
var h2 = document.querySelector('h2');
var active = document.querySelector('.active')
h2.innerHTML = active.classList[0] + " wins!";
board.style.filter = "blur(5px)"
board.removeEventListener('click', handleClick);
// h2.style.background = "lightblue";
// h2.style.backgroundsize = "20px";
return;
}

var tie = function() {
board.style.filter = "blur(5px)"
board.removeEventListener('click', handleClick);
var h2 = document.querySelector('h2');
h2.style.marginLeft = "auto";
h2.innerHTML = "tie game!";
return;
}

var newGame = function() {
  var h2 = document.querySelector('h2');
  h2.innerHTML = "PLAYER:";
  board.style.filter = "blur(0px)"
  h2.style.background = "rgba(0,0,0,0)";
  h2.style.marginLeft = "-50px";
  renderBoard();
  count = 0;
  board.addEventListener('click', handleClick);
}

//this event listener uses add class function, and makes clicked items in board red
board.addEventListener('click', handleClick);
button.addEventListener('click', newGame);
renderBoard();
