console.log('hi')

// var myGamePiece;

// function startGame() {
//   myGamePiece = new component(30, 30, "red", 10, 120)
//   // myGamePiece = new component(30, 30, "black", 50, 120)
//   myGameArea.start();

// }

// var myGameArea = {
//   canvas : document.createElement("canvas"),
//   start: function() {
//     this.canvas.width = 480;
//     this.canvas.height = 270;
//     this.context = this.canvas.getContext('2d');
//     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//     this.interval = setInterval(updateGameArea, 20);
//   },
//   clear: function() {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }
// }

// function component(width, height, color, x, y) {
//   this.width = width;
//   this.height = height;
//   this.x = x;
//   this.y = y;
//   ctx = myGameArea.context;
//   ctx.fillStyle = color;
//   ctx.fillRect(this.x, this.y, this.width, this.height);
// }

// function updateGameArea() {
//   myGameArea.clear();
//   myGamePiece.update();
// }
