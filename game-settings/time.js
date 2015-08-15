module.exports = function(game) {
  return function(opt) {
    return setOptions(game, opt);
  };
};

function setOptions(game, opt) {

  var nextTick;
  var pauseToggle = false;
  game.events = [];
  game.speed = 1000; //1ms -> this is the basic unit
  processTick(); //start the tick process

  game.addEvent = function(func, unit) {
    this.events.push({func: func, unit: unit, elapsed: 0 });
  };

  function processTick() {
    game.events.forEach(function(event,index) {
      event.elapsed++;
      if(event.elapsed > event.unit){
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
    console.log("game speed: " + 1/game.speed*1000 + 'X');
  };

  game.slowDown = function() {
    this.speed *= 2;
    console.log("game speed: " + 1/game.speed*1000 + 'X');
  };

  game.speedReset = function() {
    this.speed = 1000;
    console.log("game speed: 1X")
  };

  game.pause = function() {
    var pausedSpeed;
    if (!pauseToggle) {
      nextTick();
      console.log("game paused");
    } else {
      console.log("game resumed");
      processTick();
    }
    pauseToggle = !pauseToggle;
  };

  game.play = function() {
    this.pause();
  };
}