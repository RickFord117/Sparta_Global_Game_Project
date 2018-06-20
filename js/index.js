var grid = new Array(10);
for (var i = 0; i < grid.length; i++) {
  grid[i] = new Array(10);
  for (var j = 0; j < grid[i].length; j++) {
    grid[i][j] = 0;
  }
}
var playerDead = false;
var score = 0;
var spawn = 0.05;
grid[9][5] = 10;
gameLoop();

function gameLoop() {
  if (playerDead == false) {
    dropObstacles();
    drawObstacles();
    setTimeout(gameLoop, 180);
  }
}

function checkForDeath() {
  // get player coordinates
  var death = document.getElementsByClassName('player obstacle');
  if (death == false) {
    // do nothing
  } else {
    // end game
    console.log('YOU DIED');
    playerDead = true;
  }
}

function dropObstacles() {
  //get rid of obstacles in bottom row
  for (var i = 0; i < grid.length; i++) {
    if (grid[9][i] == 1) {
      grid[9][i] = 0;
    }
  }

  for (var i = grid.length - 2; i >= 0; i--) {
    for (var j = 0; j < grid.length; j++) {
      // swap with grid space below
      if (grid[i][j] == 1) {
        grid[i + 1][j] = 1;
        grid[i][j] = 0;
      }
    }
  }
  // spawn in new obstacles
  for (var i = 0; i < grid.length; i++) {
    var n = Math.random();
    if (n < spawn * 4 / 5) {
      grid[0][i] = 1;
    }
  }
}

function drawObstacles() {
  var table = document.getElementsByClassName('gameBox')[0].children[0].children;

  //remove obstacles
  for (var i = 0; i < grid.length; i++) {
    var row = table[i].children;
    for (var j = 0; j < row.length; j++) {
      row[j].classList.remove('obstacle');
    }
  }
  for (var i = 0; i < grid.length; i++) {
    var row = table[i].children;
    for (var j = 0; j < row.length; j++) {
      // if it contains a block
      if (grid[i][j] == 1) {
        row[j].classList.add('obstacle');
      }
    }
  }
}

document.addEventListener('keydown', function(e) {
  // grab the event
  e = e || window.event;
  var key = e.which || e.keyCode;
  // switch case for which key was pressed
  switch (key) {
    // case for W
    case 87:
      // getting player coordinates and adjusting them
      var player = document.getElementsByClassName('player');
      player = player[0];
      var x = player.cellIndex;
      var y = player.parentElement.rowIndex;
      y--;
      if (y <= 1) y = 1;
      // get new coordinates
      var table = document.getElementsByClassName('gameBox')[0].children;
      var row = table[0].children[y].children;
      var col = row[x];
      // if you can move into the square then do so
      if (col.classList == '') {
        player.classList.remove('player');
        col.classList.add('player');
      }
      break;
      // case for A
    case 65:
      // getting player coordinates and adjusting them
      var player = document.getElementsByClassName('player')[0];
      var x = player.cellIndex;
      var y = player.parentElement.rowIndex;
      x--;
      if (x <= 0) x = 0;
      // get new coordinates
      var table = document.getElementsByClassName('gameBox')[0].children;
      var row = table[0].children[y].children;
      var col = row[x];
      // if you can move into the square then do so
      if (col.classList == '') {
        player.classList.remove('player');
        col.classList.add('player');
      }
      break;
      // case for S
    case 83:
      // getting player coordinates and adjusting them
      var player = document.getElementsByClassName('player');
      player = player[0];
      var x = player.cellIndex;
      var y = player.parentElement.rowIndex;
      y++;
      if (y >= 9) y = 9;
      // get new coordinates
      var table = document.getElementsByClassName('gameBox')[0].children;
      var row = table[0].children[y].children;
      var col = row[x];
      // if you can move into the square then do so
      if (col.classList == '') {
        player.classList.remove('player');
        col.classList.add('player');
      }
      break;
      // case for D
    case 68:
      // getting player coordinates and adjusting them
      var player = document.getElementsByClassName('player');
      player = player[0];
      var x = player.cellIndex;
      var y = player.parentElement.rowIndex;
      x++;
      if (x >= 9) x = 9;
      // get new coordinates
      var table = document.getElementsByClassName('gameBox')[0].children;
      var row = table[0].children[y].children;
      var col = row[x];
      // if you can move into the square then do so
      if (col.classList == '') {
        player.classList.remove('player');
        col.classList.add('player');
      }
      break;
  }
});
