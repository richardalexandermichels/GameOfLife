var Creature = require('./');

function Giraffe(game, map) {
    Creature.call(this, game, "giraffe", map);
}

Giraffe.prototype = Object.create(Creature.prototype);
Giraffe.prototype.constructor = Giraffe;


var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Giraffe;