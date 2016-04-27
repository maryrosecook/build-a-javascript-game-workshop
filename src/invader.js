;(function(exports) {
  var INVADER_WIDTH_HEIGHT = 15;

  function Invader(game, center) {
    this.game = game;
    this.center = center;
    this.size = { x: INVADER_WIDTH_HEIGHT, y: INVADER_WIDTH_HEIGHT };
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
      Game.drawBody(screen, this);
    }
  };

  Invader.createAll = function(game) {
    var ROWS = 3;
    var COLUMNS = 8;
    var INVADER_SPACING = 30;
    var INVADER_COUNT = 24;

    var invaders = [];
    for (var i = 0; i < INVADER_COUNT; i++) {
      var x = INVADER_SPACING + i % COLUMNS * INVADER_SPACING;
      var y = INVADER_SPACING + i % ROWS * INVADER_SPACING;

      invaders.push(new Invader(game, { x: x, y: y }));
    }

    return invaders;
  };

  exports.Invader = Invader;
})(typeof exports === "undefined" ? this : exports)
