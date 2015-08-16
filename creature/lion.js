var Creature = require('./');

function Lion(game, map) {
    Creature.call(this, game, "lion", map);
}

Lion.prototype = Object.create(Creature.prototype);
Lion.prototype.constructor = Lion;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Lion;