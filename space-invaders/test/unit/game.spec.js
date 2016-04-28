describe("Game", function() {
  describe("new", function() {
    it("should create a game", function() {
      var size = { x: 1, y: 2 };
      expect(new Game(size) instanceof Game).toEqual(true);
    });
  });

  describe("update", function() {
    it("should call update on a body", function() {
      var game = new Game();
      var body = jasmine.createSpyObj("body", ["update"]);

      game.addBody(body);
      game.update();
      expect(body.update).toHaveBeenCalled();
    });
  });

  describe("draw", function() {
    it("should clear the screen", function() {
      var game = new Game({ x: 10, y: 10 });
      var body = jasmine.createSpyObj("body", ["draw"]);
      var screen = jasmine.createSpyObj("screen", ["clearRect"]);

      game.draw(screen);
      expect(screen.clearRect).toHaveBeenCalled();
    });

    it("should call draw on a body", function() {
      var game = new Game({ x: 10, y: 10 });
      var body = jasmine.createSpyObj("body", ["draw"]);
      var screen = jasmine.createSpyObj("screen", ["clearRect"]);

      game.addBody(body);
      game.draw(screen);
      expect(body.draw).toHaveBeenCalled();
    });
  });

  describe("bodiesNotColliding", function() {
    it("should return no bodies if all colliding", function() {
      var game = new Game();
      spyOn(Game, "isColliding").and.returnValue(true);
      var body1 = {};
      var body2 = {};

      game.addBody(body1);
      game.addBody(body2);
      expect(game.bodiesNotColliding()).toEqual([]);
    });

    it("should return all bodies if none colliding", function() {
      var game = new Game();
      spyOn(Game, "isColliding").and.returnValue(false);
      var body1 = {};
      var body2 = {};

      game.addBody(body1);
      game.addBody(body2);
      expect(game.bodiesNotColliding()).toEqual([body1, body2]);
    });
  });

  describe("addBody", function() {
    it("should be able to add body", function() {
      var game = new Game();
      var body = jasmine.createSpyObj("body", ["update"]);

      game.addBody(body);
      game.update();
      expect(body.update).toHaveBeenCalled();
    });
  });

  describe("Game.drawBody", function() {
    it("should draw a body in the body's position", function() {
      var screen = jasmine.createSpyObj("screen", ["fillRect"]);
      var body = { center: { x: 1, y: 2 }, size: { x: 3, y: 3 }};
      Game.drawBody(screen, body);
      expect(screen.fillRect).toHaveBeenCalledWith(-0.5, 0.5, 3, 3);
    });
  });
});
