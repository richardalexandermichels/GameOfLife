module.exports = function(game) {
  return function(opt) {
    return setTick(game, opt);
  };
};

function setTick(game, opt) {

  var nextTick;
  var paused = false;
  game.events = []; //store events
  game.speed = 1000; //1ms -> this is the basic unit
  processTick(); //start the tick process

  game.addEvent = function(func, unit) {
    this.events.push({
      func: func,
      unit: unit,
      elapsed: 0
    });
  };

  function processTick() {
    game.events.forEach(function(event, index) {
      event.elapsed++;
      if (event.elapsed > event.unit) {
        event.elapsed -= event.unit;
        event.func();
      }
    });
    nextTick = game.setTimeout(processTick, game.speed);
  }

  game.setSpeed = function(unit) {
    this.speed = unit * 1000;
  };

  game.speedUp = function() {
    this.speed /= 2;
    console.log("game speed: " + 1 / game.speed * 1000 + 'X');
  };

  game.slowDown = function() {
    this.speed *= 2;
    console.log("game speed: " + 1 / game.speed * 1000 + 'X');
  };

  game.resetSpeed = function() {
    this.speed = 1000;
    console.log("game speed: 1X")
  };

  game.pause = function() {
    if (!paused) {
      console.log("game paused");
      nextTick(); //the game.setTimeout returns a delete itself function. see voxel-engine/modules/tic/index.js
      paused = !paused;
    }
  };

  game.play = function() {
    if (paused)
      console.log("game resumed");
    processTick();
    paused = !paused;
  }
}