var Creature = require('./');

function Cow(game) {
    Creature.call(this, game, "cow");
}

Cow.prototype = Object.create(Creature.prototype);
Cow.prototype.constructor = Cow;

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Cow;