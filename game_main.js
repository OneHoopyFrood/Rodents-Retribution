var canvas = document.getElementById("gamestage");
var ctx = canvas.getContext("2d");

var bgColor = "#8CBA7B";

var level = [
// 0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22
  ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'], // 0
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 1
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 2
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 3
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 4
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 5
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 6
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 7
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 8
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 9
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 10
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','M','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 11
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 12
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 13
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 14
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 15
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 16
  ['X',' ',' ',' ',' ','B','B','B','B','B','B','B','B','B','B','B','B','B',' ',' ',' ',' ','X'], // 17
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 18
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 19
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 20
  ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'], // 21
  ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X']  // 22
];

var spriteStore = {};

function load(next, err) {
  spriteStore.mouse = new Image();
  spriteStore.mouse.onload = function() {
    spriteStore.cat = new Image();
    spriteStore.cat.onload = function() {
      spriteStore.cheese = new Image();
      spriteStore.cheese.onload = function() {
        spriteStore.block = new Image();
        spriteStore.block.onload = function() {
          spriteStore.bush = new Image();
          spriteStore.bush.onload = next;
          spriteStore.bush.src = 'imgs/bush.png';
        };
        spriteStore.block.src = 'imgs/block.png';
      };
      spriteStore.cheese.src = 'imgs/cheese.png';
    };
    spriteStore.cat.src = 'imgs/cat.png';
  };
  spriteStore.mouse.src = 'imgs/mouse.png';
}

function drawRect(x, y, color) {
  ctx.beginPath();
  ctx.rect(x * 16, y * 16, 16, 16);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawImage(x, y, image) {
  ctx.drawImage(image, x * 16, y * 16);
}

function fillScreen(color) {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// Do loading first, then start the game
load(function() {
  fillScreen(bgColor);

  // Setup game elements
  var curLevel = level.slice();


  function updateGame() {

  }

  function drawGame() {
  	for (var x = 0; x < curLevel.length; x++) {
  	  for (var y = 0; y < curLevel[x].length; y++) {
        switch(curLevel[x][y]) {
          case ' ': // Open
            drawRect(x,y,bgColor);
            break;
      		case 'X':
      			drawImage(x, y, spriteStore.block);
      			break;
      		case 'B':
      			drawImage(x, y, spriteStore.bush);
      			break;
      		case 'K':
            drawImage(x, y, spriteStore.cat);
            break;
      		case 'C':
            drawImage(x, y, spriteStore.cheese);
            break;
      		case 'M':
            drawImage(x, y, spriteStore.mouse);
            break;
    		}
  	  }
  	}
  }

  // Frame rate control
  // http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
  var fps = 10;
  var now;
  var then = Date.now();
  var interval = 1000/fps;
  var delta;
  var gameloop = function() {
    window.requestAnimationFrame(gameloop);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {

      updateGame();
      drawGame();

      then = now - (delta % interval);
    }
  }
  gameloop();
});
