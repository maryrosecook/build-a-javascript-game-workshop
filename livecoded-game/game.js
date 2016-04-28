window.addEventListener("load", function() {
  var screen = document.getElementById("screen").getContext("2d");

  var gameSize = { x: screen.canvas.width, y: screen.canvas.height };

  var game = new Game(gameSize);
  game.addBody(new Player(game, { x: gameSize.x / 2, y: gameSize.y / 2 }));

  function tick() {
    game.update();
    game.draw(screen);
    requestAnimationFrame(tick);
  };

  tick();
});

function Game(size) {
  this.bodies = [];
  this.size = size;
};

Game.prototype = {
  update: function() {
    this.bodies.forEach(function(body) {
      body.update();
    });
  },

  draw: function(screen) {
    screen.clearRect(0, 0, this.size.x, this.size.y);

    this.bodies.forEach(function(body) {
      body.draw(screen);
    });
  },

  addBody: function(body) {
    this.bodies.push(body);
  }
};

Game.drawBody = function(screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2,
                  body.center.y - body.size.y / 2,
                  body.size.x,
                  body.size.y);
};

var Keyboard = function() {
  var keyState = {};

  window.addEventListener("keydown", function(e) {
    keyState[e.keyCode] = true;
  });

  window.addEventListener("keyup", function(e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
};

function Player(game, center) {
  var WIDTH_HEIGHT = 15;

  this.game = game;
  this.center = center;
  this.size = { x: WIDTH_HEIGHT, y: WIDTH_HEIGHT };
  this.keyboard = new Keyboard();
};

Player.prototype = {
  update: function() {
    if (this.keyboard.isDown(this.keyboard.KEYS.LEFT)) {
      this.moveLeft();
    } else if (this.keyboard.isDown(this.keyboard.KEYS.RIGHT)) {
      this.moveRight();
    }

    if (this.keyboard.isDown(this.keyboard.KEYS.SPACE)) {
      this.shoot();
    }
  },

  moveLeft: function() {
    this.center.x -= 2;
  },

  moveRight: function() {
    this.center.x += 2;
  },

  shoot: function() {
    this.game.addBody(new Bullet({
      x: this.center.x,
      y: this.center.y - this.size.y
    }));
  },

  draw: function(screen) {
    Game.drawBody(screen, this);
  }
};

function Bullet(center) {
  var WIDTH_HEIGHT = 3;
  this.center = center;
  this.size = { x: WIDTH_HEIGHT, y: WIDTH_HEIGHT };
  this.velocity = { x: 0, y: -3 };
};

Bullet.prototype = {
  update: function() {
    this.moveWithVelocity();
  },

  moveWithVelocity: function() {
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
  },

  draw: function(screen) {
    Game.drawBody(screen, this);
  }
};
