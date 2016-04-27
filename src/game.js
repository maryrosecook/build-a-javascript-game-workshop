;(function(exports) {
  function Game(size) {
    this.center = { x: size.x / 2, y: size.y / 2 };
    this.size = size;
    this.bodies = [];
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
          .filter(function(b2) { return Game.isColliding(b1, b2); })
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

  Game.drawBody = function(screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2,
                    body.center.y - body.size.y / 2,
                    body.size.x,
                    body.size.y);
  };

  Game.isColliding = function(b1, b2) {
    return !(
      b1 === b2 ||
        b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2
    );
  };

  exports.Game = Game;
})(typeof exports === "undefined" ? this : exports)
