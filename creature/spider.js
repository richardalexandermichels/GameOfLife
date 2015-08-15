var Creature = require('./');

function Spider(game, map) {
    Creature.call(this, game, "spider", map);
}

Spider.prototype = Object.create(Creature.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.live = function() {
	this.move(creature.moveRandomly(2), 2, creature.moveRandomly(2), map);
};

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Spider;