var grid = new Array(10);
for (var i = 0; i < grid.length; i++) {
  grid[i] = new Array(10);
  for (var j = 0; j < grid[i].length; j++) {
    grid[i][j] = 0;
  }
}
var playerDead = false;
var score = 0;
var spawn = 0.07;
gameLoop();

function gameLoop() {
  if (playerDead == false) {
    checkForDeath();
    fallObstacles();
    drawObstacles();
    setTimeout(gameLoop, 180);
  }
}

function checkForDeath() {
  var table = document.getElementsByClassName('gameBox')[0].children[0].children;
  for (var i = 0; i < grid.length; i++) {
    var row = table[i].children;
    for (var j = 0; j < row.length; j++) {
      if (row[j].classList.contains('obstacle') && row[j].classList.contains('player')) {
        row[j].classList.remove('player');
        console.log('YOU DIED');
        console.log(score);
        playerDead = true;
      } else {}
    }
  }
}

function fallObstacles() {
  //get rid of obstacles in bottom row
  for (var i = 0; i < grid.length; i++) {
    if (grid[9][i] == 1) {
      grid[9][i] = 0;
      score++;
      document.getElementById("score").innerHTML = score;
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
  // spawn new obstacles depending on random number
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

document.getElementById('reset').addEventListener('click', function(){
  //get table
  var table = document.getElementsByClassName('gameBox')[0].children[0].children;
  //clear array
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      grid[i][j] = 0;
    }
  }
  //remove obstacles
  for (var i = 0; i < grid.length; i++) {
    var row = table[i].children;
    for (var j = 0; j < row.length; j++) {
      row[j].classList.remove('obstacle');
    }
  }
  var table = document.getElementsByClassName('gameBox')[0].children[0].children;
  var row = table[9].children;
  row[5].classList.add('player');
  playerDead = false;
  gameLoop();
});


document.addEventListener('keydown', function(e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  //getting player coordinates and adjusting them
  var player = document.getElementsByClassName('player');
  //give player array attribute to then manipulate elements
  player = player[0];
  var x = player.cellIndex;
  var y = player.parentElement.rowIndex;
  // switch statement for possible key presses
  switch (key) {
    //for W (up)
    case 87:
      //target cell above
      y--;
      //set boundary
      if (y <= 1) y = 1;
      //get new coordinates
      var table = document.getElementsByClassName('gameBox')[0].children;
      var row = table[0].children[y].children;
      var col = row[x];
      //if next square is empty, remove player from old square and put in new square
      if (col.classList == '') {
        player.classList.remove('player');
        col.classList.add('player');
      }
      break;
      //for A(left)
    case 65:
      //target cell to the left
      x--;
      //set boundary
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
      //for S(down)
    case 83:
      //target cell below
      y++;
      //set boundary
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
      //for D(right)
    case 68:
      //target cell to the right
      x++;
      //set boundary
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
