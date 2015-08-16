var Creature = require('./');

function Elephant(game, map) {
    Creature.call(this, game, "big elephant", map);
}

Elephant.prototype = Object.create(Creature.prototype);
Elephant.prototype.constructor = Elephant;

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Elephant;

