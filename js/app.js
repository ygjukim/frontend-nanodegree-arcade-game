var canvasArea = {
    "width": 505,
    "height": 606
};

var spriteArea = {
    "width": 101,
    "height": 83
};

// Game Avatar 
var Avatar = function(img_url, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startX = x;
    this.startY = y;

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
    this.moveFactor = 100;
};

Enemy.prototype = Object.create(Avatar.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (dt < 0) {
        this.x = this.startX;
        this.y = this.startY;
    }
    else {
        this.x += Math.floor(dt * this.moveFactor);
        if (this.x >= canvasArea.width) this.x = this.startX; 
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (img_url, x, y) {
    Avatar.call(this, img_url, x, y);
    this.coordX = 2;
    this.coordY = 5;
};

Player.prototype = Object.create(Avatar.prototype);
Player.prototype.constructor = Player;

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (dt < 0) {
        this.x = this.startX;
        this.y = this.startY;
        this.coordX = 2;
        this.coordY = 5;
    }
    else {
        this.x = this.coordX * spriteArea.width;    
        this.y = this.coordY * spriteArea.height - 15;
    }
};

Player.prototype.handleInput = function(key) {
    // console.log(key);
    if (key == 'left') {
        if (this.coordX > 0) this.coordX -= 1;
    }
    else if (key == 'right') {  
        if (this.coordX < 4) this.coordX += 1;
    }
    else if (key == 'up') {  
        if (this.coordY > 0) this.coordY -= 1;
    }
    else if (key == 'down') {  
        if (this.coordY < 5) this.coordY += 1;
    }
};

Player.prototype.collide = function(enemy) {
    return ((Math.abs(this.x - enemy.x) < (spriteArea.width * 2 / 3))
        && (Math.abs(this.y - enemy.y) < (spriteArea.height * 2 / 3)));
}

Player.prototype.checkSuccess = function() {
    return this.coordY == 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy('images/enemy-bug.png',
            -spriteArea.width, 
            (Math.floor(Math.random()*3)+1)*spriteArea.height-15));

var player = new Player('images/char-boy.png', 
            spriteArea.width*2, 
            spriteArea.height*5-15);

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
