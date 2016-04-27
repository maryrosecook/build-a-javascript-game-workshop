var Game = require("../game.js").Game;

describe("Game", function() {
  describe("new", function() {
    it("should create a game", function() {
      expect(new Game({}) instanceof Game).toEqual(true);
    });
  });
});
