function Bullet(center, velocity) {
  var WIDTH_HEIGHT = 3;

  this.center = center;
  this.size = { x: WIDTH_HEIGHT, y: WIDTH_HEIGHT };
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
