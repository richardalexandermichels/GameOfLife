var Creature = require('./');

function WildDog(game, map) {
    Creature.call(this, game, "wildDog", map);
}

WildDog.prototype = Object.create(Creature.prototype);
WildDog.prototype.constructor = WildDog;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = WildDog;