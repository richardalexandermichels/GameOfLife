var Creature = require('./');

function Penguin(game, map) {
    Creature.call(this, game, "penguin", map);
}

Penguin.prototype = Object.create(Creature.prototype);
Penguin.prototype.constructor = Penguin;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Penguin;