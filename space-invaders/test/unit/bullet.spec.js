describe("Bullet", function() {
  describe("new", function() {
    it("should create a bullet", function() {
      var center = { x: 1, y: 2 };
      var velocity = { x: 3, y: 4 };
      expect(new Bullet(center, velocity) instanceof Bullet).toEqual(true);
    });
  });

  describe("update", function() {
    it("should move bullet one step of the velocity", function() {
      var center = { x: 1, y: 2 };
      var velocity = { x: 3, y: 4 };
      var bullet = new Bullet(center, velocity);
      bullet.update();
      expect(center.x).toEqual(4);
      expect(center.y).toEqual(6);
    });
  });

  describe("draw", function() {
    it("should call Game.drawBody with screen and body", function() {
      var bullet = new Bullet();
      var screen = {};
      spyOn(Game, ["drawBody"]);

      bullet.draw(screen);
      expect(Game.drawBody).toHaveBeenCalledWith(screen, bullet);
    });
  });
});
