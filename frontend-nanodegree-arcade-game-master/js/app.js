// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;

    if (this.x > 510) {
      this.x= -50;
      this.speed = 100 + Math.floor(Math.random() * 222);
    };

//checks for collision
    if (player.x <this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
          player.x = 202;
          player.y = 405;
        };
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
var Player = function (x, y) {

    this.x = x;
    this.y = y;
    //player image
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

//allows arrow key inputs and keeps player from leaving the game-field

Player.prototype.handleInput = function (keyPress) {

  if (keyPress == 'left' && this.x > 0) {
    this.x -= 102;
  };

  if (keyPress === 'right' && this.x < 405) {
    this.x += 102;
  };

  if (keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  };

  if (keyPress == 'down' && this.y < 405) {
    this.y += 83;
  } ;


//if player gets to the water tile, game will reset at specified tile
  if (this.y < 0) {
    setTimeout(() => {
      this.x = 202;
      this.y =405;
    }, 800);
  };
};


//places enemies in object
var allEnemies = [];


//starts each enemy at their given location on the road
var enemyLocation = [63, 147, 230];

//after enemy reaches right side of screen,
//they are randomly given a new speed to start back on the left side
enemyLocation.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

//instatiates player at beginning tile
var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
