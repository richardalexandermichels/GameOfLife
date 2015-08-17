var Creature = require('./');

function Beaver(game, map) {
    Creature.call(this, game, "beaver", map);
}

Beaver.prototype = Object.create(Creature.prototype);
Beaver.prototype.constructor = Beaver;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Beaver;