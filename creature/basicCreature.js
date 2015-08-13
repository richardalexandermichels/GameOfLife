var Creature = require('./');

function Basic(game) {
    Creature.call(this, game, "basic");
}

Basic.prototype = Object.create(Creature.prototype);
Basic.prototype.constructor = Basic;

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Basic;