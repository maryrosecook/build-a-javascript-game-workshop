describe("Invader", function() {
  describe("new", function() {
    it("should create an invader", function() {
      var game = {};
      var center = { x: 1, y: 2 };
      expect(new Invader(game, center) instanceof Invader).toEqual(true);
    });
  });

  describe("update", function() {
    describe("patrolling", function() {
      it("should move all the way right, all the way left, all the way right", function() {
        var game = jasmine.createSpyObj("game", ["invadersBelow", "addBody"]);
        var center = { x: 0, y: 2 };
        var invader = new Invader(game, center);

        // right
        for (var i = 0; i < 40; i += 0.3) {
          expect(center.x).toEqual(i);
          invader.update();
        }

        // left
        for (i; i >= 0; i -= 0.3) {
          expect(center.x).toEqual(i);
          invader.update();
        }

        // right
        for (i; i < 40; i += 0.3) {
          expect(center.x).toEqual(i);
          invader.update();
        }
      });
    });

    // describe("shooting", function() {
    //   fit("should not shoot if invaders below", function() {
    //     var game = jasmine.createSpyObj("game", ["addBody"]);
    //     spyOn(game, "invadersBelow").and.returnValue(true);

    //     spyOn(Math, "random").and.returnValue(0.99);
    //     var center = { x: 0, y: 2 };
    //     var invader = new Invader(game, center);

    //   });
    // });
  });

  describe("draw", function() {
    it("should call Game.drawBody with screen and body", function() {
      var invader = new Invader();
      var screen = {};
      spyOn(Game, ["drawBody"]);

      invader.draw(screen);
      expect(Game.drawBody).toHaveBeenCalledWith(screen, invader);
    });
  });
});
