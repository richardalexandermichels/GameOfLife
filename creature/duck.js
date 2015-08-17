var Creature = require('./');

function Duck(game, map) {
    Creature.call(this, game, "duck", map);
}

Duck.prototype = Object.create(Creature.prototype);
Duck.prototype.constructor = Duck;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Duck;