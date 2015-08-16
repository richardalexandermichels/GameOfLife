var Creature = require('./');

function Crocodile(game, map) {
    Creature.call(this, game, "crocodile", map);
}

Crocodile.prototype = Object.create(Creature.prototype);
Crocodile.prototype.constructor = Crocodile;

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Crocodile;

