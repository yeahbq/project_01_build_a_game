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
  var rowZero = [0, 1, 2, 3, 4, 5, 6, 7];
  var rowOne = [7, 8, 9, 10, 11, 12, 13];
  var rowTwo = [14, 15, 16, 17, 18, 19, 20];
  var rowThree = [21, 22, 23, 24, 25, 26, 27];
  var rowFour = [28, 29, 30, 31, 32, 33, 34];
  var rowFive = [35, 36, 37, 38, 39, 40, 41];


      if (event.target.classList == "hole" && currentPlayer.name === "red") {
      // console.log(event.target.dataset.row)
      // console.log(this)
      col = event.target.dataset.col;
      row = event.target.dataset.row;

  // if (row < 0) return console.log('not a valid move');
  // else if (row === 0) return 1;

  // if (!hole[row][col].classList.contains('red') || !hole[row][col].classList.contains('black')) {
  //   nextTurn();
  // } else return rockBottom(row-1)

      if (hole[rowFive[col]].classList.contains('red') || hole[rowFive[col]].classList.contains('black'))
      {
      hole[rowFour[col]].classList.add('red');
      console.log("4 red")
      } else if (hole[rowFour[col]].classList.contains('red') || hole[rowFour[col]].classList.contains('black')) {
      hole[rowThree[col]].classList.add('red');
      console.log("3 red")
      } else if (hole[rowThree[col]].classList.contains('red') || hole[rowThree[col]].classList.contains('black'))
      {
      hole[rowTwo[col]].classList.add('red');
      console.log("2 red")
      } else if (hole[rowTwo[col]].classList.contains('red') || hole[rowTwo[col]].classList.contains('black'))
      {
      hole[rowOne[col]].classList.add('red');
      console.log("1 red")
      } else if (hole[rowOne[col]].classList.contains('red') || hole[rowOne[col]].classList.contains('black')) {
      hole[rowZero[col]].classList.add('red');
      console.log('zero red')
      } else {hole[rowFive[col]].classList.add('red');
        console.log('5 red')
        }
        console.log('changing players')
        nextTurn();

      // event.target.classList.add('red');
      }

    else if (event.target.classList == "hole" && currentPlayer.name === "black") {
      // console.log(event.target.dataset.row)
      // console.log(this)
      col = event.target.dataset.col;
      row = event.target.dataset.row;
      // console.log(col);
      if (hole[rowFive[col]].classList.contains('red') || hole[rowFive[col]].classList.contains('black'))
      {
      hole[rowFour[col]].classList.add('black');
      console.log("4 black")
      }
       else if (hole[rowFour[col]].classList.contains('red') || hole[rowFour[col]].classList.contains('black'))
      {
      hole[rowThree[col]].classList.add('black');
      console.log("3 black")
      }
       else if (hole[rowThree[col]].classList.contains('red') || hole[rowThree[col]].classList.contains('black'))
      {
      hole[rowTwo[col]].classList.add('black');
      console.log("2 black")
      }
       else if (hole[rowTwo[col]].classList.contains('red') || hole[rowTwo[col]].classList.contains('black'))
      {
      hole[rowOne[col]].classList.add('black');
      console.log("1 black")
      }
       else if (hole[rowOne[col]].classList.contains('red') || hole[rowOne[col]].classList.contains('black'))
      {
      hole[rowZero[col]].classList.add('black');
      console.log('zero black')
      }
        else {hole[rowFive[col]].classList.add('black');
        console.log('5 black')
        }
        console.log('changing players')
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

