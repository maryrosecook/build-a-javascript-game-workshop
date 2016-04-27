var lib = require("../lib.js").lib;

describe("Game", function() {
  describe("new", function() {
    it("should create a game", function() {
      expect(new lib.Game({}) instanceof lib.Game).toEqual(true);
    });
  });
});
