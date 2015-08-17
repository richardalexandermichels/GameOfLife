var Creature = require('./');

function Pigeon(game, map) {
    Creature.call(this, game, "pigeon", map);
}

Pigeon.prototype = Object.create(Creature.prototype);
Pigeon.prototype.constructor = Pigeon;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Pigeon;