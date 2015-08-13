var Creature = require('./');

function Spider(game) {
    Creature.call(this, game, "spider");
}

Spider.prototype = Object.create(Creature.prototype);
Spider.prototype.constructor = Spider;

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Spider;