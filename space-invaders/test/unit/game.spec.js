describe("Game", function() {
  describe("new", function() {
    it("should create a game", function() {
      expect(new Game() instanceof Game).toEqual(true);
    });
  });

  describe("addBody", function() {
    it("should be able to add body", function() {
      var game = new Game();
      var body = { update: function() { } };
      game.addBody(body);
      expect(new Game({}) instanceof Game).toEqual(true);
    });
  });

});
