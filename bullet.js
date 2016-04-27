;(function(exports) {
  var BULLET_WIDTH_HEIGHT = 3;

  function Bullet(center, velocity) {
    this.center = center;
    this.size = { x: BULLET_WIDTH_HEIGHT, y: BULLET_WIDTH_HEIGHT };
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
      Game.drawBody(screen, this);
    }
  };

  exports.Bullet = Bullet;
})(typeof exports === "undefined" ? this : exports)
