var Creature = require('./');

function Deer(game, map) {
    Creature.call(this, game, "deer", map);
}

Deer.prototype = Object.create(Creature.prototype);
Deer.prototype.constructor = Deer;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Deer;