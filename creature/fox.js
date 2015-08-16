var Creature = require('./');

function Fox(game, map) {
    Creature.call(this, game, "fox", map);
}

Fox.prototype = Object.create(Creature.prototype);
Fox.prototype.constructor = Fox;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Fox;