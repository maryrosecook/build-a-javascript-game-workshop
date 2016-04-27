;(function(exports) {
  var PLAYER_WIDTH_HEIGHT = 15;

  function Player(game, center) {
    this.game = game;
    this.center = { x: center.x, y: center.y - PLAYER_WIDTH_HEIGHT };
    this.size = { x: PLAYER_WIDTH_HEIGHT, y: PLAYER_WIDTH_HEIGHT };
    this.keyboard = new Keyboard();
  };

  Player.prototype = {
    update: function() {
      this.respondToUserInput();
    },

    respondToUserInput: function() {
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
      this.game.addBody(new Bullet({ x: this.center.x,
                                     y: this.center.y - this.size.x },
                                   { x: 0, y: -6 }));
    },

    draw: function(screen) {
      Game.drawBody(screen, this);
    }
  };

  exports.Player = Player;
})(typeof exports === "undefined" ? this : exports)
