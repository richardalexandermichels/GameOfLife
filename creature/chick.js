var Creature = require('./');

function Chick(game, map) {
    Creature.call(this, game, "chick", map);
}

Chick.prototype = Object.create(Creature.prototype);
Chick.prototype.constructor = Chick;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Chick;