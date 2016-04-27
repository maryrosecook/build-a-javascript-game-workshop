window.addEventListener("load", function() {
  var screen = document.getElementById("screen").getContext("2d");
  var gameSize = { x: screen.canvas.width, y: screen.canvas.height };
  var game = new lib.Game(gameSize);

  game.addBody(new lib.Player(game, { x: gameSize.x / 2, y: gameSize.y }));
  lib.Invader.createAll(game).forEach(function(invader) {
    game.addBody(invader);
  });

  function tick() {
    game.update();
    game.draw(screen);
    requestAnimationFrame(tick);
  };

  tick();
});
