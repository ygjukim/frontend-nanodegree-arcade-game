// Game Avatar 
var Avatar = function(img_url, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for game avatar, this uses
    // a helper we've provided to easily load images
    this.sprite = img_url;
}

// Update the avatar's position, required method for game
// Parameter: dt, a time delta between ticks
Avatar.prototype.update = function(dt) {
};

// Draw the avatar on the screen, required method for game
Avatar.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(img_url, x, y) {
    Avatar.call(this, img_url, x, y);
    this.move_factor = 100;
};

Enemy.prototype = Object.create(Avatar.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += Math.floor(dt * this.move_factor);
    if (this.x >= 505) this.x = -101; 
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (img_url, x, y) {
    Avatar.call(this, img_url, x, y);
};

Player.prototype = Object.create(Avatar.prototype);
Player.prototype.constructor = Player;

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x += Math.floor(dt * 100);
    // if (this.x >= 505) this.x = -101; 
};

Player.prototype.handleInput = function(key) {
    console.log(key);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy('images/enemy-bug.png',
            -101, (Math.floor(Math.random()*3)+1)*83-20));

var player = new Player('images/char-boy.png', 202, 83*5-20);


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
