window.addEventListener("load", function() {
  var screen = document.getElementById("screen").getContext("2d");

  var gameSize = { x: screen.canvas.width, y: screen.canvas.height };

  var game = new Game(gameSize);
  game.addBody(new Player(game, gameSize));

  function tick() {
    game.update();
    game.draw(screen);

    requestAnimationFrame(tick);
  };

  tick();
});

function Game(size) {
  this.size = size;
  this.bodies = [];
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

function Player(game, gameSize) {
  var WIDTH_HEIGHT = 15;

  this.game = game;
  this.keyboard = new Keyboard();
  this.center = { x: gameSize.x / 2, y: gameSize.y / 2 };
  this.size = { x: WIDTH_HEIGHT, y: WIDTH_HEIGHT };
};

Player.prototype = {
  update: function() {
    this.movePlayerInResponseToInput();
    this.shootInResponseToInput();
  },

  movePlayerInResponseToInput: function() {
    if (this.keyboard.isDown(this.keyboard.KEYS.LEFT)) {
      this.moveLeft();
    } else if (this.keyboard.isDown(this.keyboard.KEYS.RIGHT)) {
      this.moveRight();
    }
  },

  shootInResponseToInput: function() {
    if (this.keyboard.isDown(this.keyboard.KEYS.SPACE)) {
      this.shoot();
    }
  },

  shoot: function() {
    this.game.addBody(new Bullet({ x: this.center.x, y: this.center.y - this.size.y },
                                 { x: 0, y: -2 }));
  },

  moveLeft: function() {
    this.center.x -= 2;
  },

  moveRight: function() {
    this.center.x += 2;
  },

  draw: function(screen) {
    screen.fillRect(this.center.x - this.size.x / 2,
                    this.center.y - this.size.y / 2,
                    this.size.x,
                    this.size.y);
  }
};

function Keyboard() {
  var keyState = {};

  window.addEventListener("keydown", function(event) {
    keyState[event.keyCode] = true;
  });

  window.addEventListener("keyup", function(event) {
    keyState[event.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
};

function Bullet(center, velocity) {
  this.center = center;
  this.size = { x: 10, y: 10 };
  this.velocity = velocity;
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
    screen.fillRect(this.center.x - this.size.x / 2,
                    this.center.y - this.size.y / 2,
                    this.size.x,
                    this.size.y);
  }
};
