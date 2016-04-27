function Game(width, height) {
  this.center = { x: width / 2, y: height / 2 };
  this.size = { x: width, y: height };

  var self = this;
  var invaders = Invader
      .startingPositions()
      .map(function(p) { return new Invader(self, p); });

  var player = new Player(this, { x: this.center.x, y: this.size.y - 15 });

  this.bodies = invaders.concat(player);
};

Game.prototype = {
  update: function() {
    this.bodies = this.bodiesNotColliding();

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

  bodiesNotColliding: function() {
    var self = this;
    return this.bodies.filter(function(b1) {
      return self.bodies
        .filter(function(b2) { return isColliding(b1, b2); })
        .length === 0;
    });
  },

  addBody: function(body) {
    this.bodies.push(body);
  },

  invadersBelow: function(invader) {
    return this.bodies
      .filter(function(b) {
        return b instanceof Invader &&
          b.center.y > invader.center.y &&
          Math.abs(b.center.x - invader.center.x) < invader.size.x;
      })
      .length > 0;
  }
};

function Player(game, center) {
  this.game = game;
  this.center = { x: center.x, y: center.y - 15 };
  this.size = { x: 15, y: 15 };
  this.keyboarder = new Keyboarder();
};

Player.prototype = {
  update: function() {
    this.respondToUserInput();
  },

  respondToUserInput: function() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.moveLeft();
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.moveRight();
    }

    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
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
    this.game.addBody(new Bullet({ x: this.center.x,
                                   y: this.center.y - this.size.x },
                                 { x: 0, y: -6 }));
  },

  draw: function(screen) {
    drawBody(screen, this);
  }
};

function Invader(game, center) {
  this.game = game;
  this.center = center;
  this.size = { x: 15, y: 15 };
  this.patrolX = 0;
  this.speedX = 0.3;
};

Invader.prototype = {
  update: function() {
    this.patrol();

    if (this.shouldShoot()) {
      this.shoot();
    }
  },

  patrol: function() {
    if (this.shouldTurnAround()) {
      this.speedX = -this.speedX;
    }

    this.center.x += this.speedX;
    this.patrolX += this.speedX;
  },

  shouldTurnAround: function() {
    return this.patrolX < 0 || this.patrolX > 40;
  },

  shouldShoot: function() {
    return Math.random() > 0.995 && !this.game.invadersBelow(this);
  },

  shoot: function() {
    this.game.addBody(new Bullet({ x: this.center.x,
                                   y: this.center.y + this.size.x },
                                 { x: 0, y: 2 }));
  },

  draw: function(screen) {
    drawBody(screen, this);
  }
};

Invader.startingPositions = function() {
  var positions = [];
  for (var i = 0; i < 24; i++) {
    var x = 30 + i % 8 * 30;
    var y = 30 + i % 3 * 30;
    positions.push({ x: x, y: y });
  }

  return positions;
};

function Bullet(center, velocity) {
  this.center = center;
  this.size = { x: 3, y: 3 };
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
    drawBody(screen, this);
  }
};

function Keyboarder() {
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

function drawBody(screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2,
                  body.center.y - body.size.y / 2,
                  body.size.x,
                  body.size.y);
};

function isColliding(b1, b2) {
  return !(
    b1 === b2 ||
      b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 ||
      b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 ||
      b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 ||
      b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2
  );
};

window.addEventListener("load", function() {
  var screen = document.getElementById("screen").getContext("2d");
  var game = new Game(screen.canvas.width, screen.canvas.height);

  function run() {
    game.update();
    game.draw(screen);
    requestAnimationFrame(run);
  };

  run();
});
