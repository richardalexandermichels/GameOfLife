var Creature = require('./');

function Turtle(game, map) {
    Creature.call(this, game, "turtle", map);
}

Turtle.prototype = Object.create(Creature.prototype);
Turtle.prototype.constructor = Turtle;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Turtle;