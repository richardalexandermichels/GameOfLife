function Creature (opts) {
    this.name = opts.name;
    this.alive = true;
    this.hp = getHp(opts.size);
    this.hunger = Math.floor(this.hp / 4);
    this.vision = opts.vision;
    this.intelligence = opts.intelligence;
    this.social = opts.social;
    this.memory = [];

};

function getHp = function(size) {
	return size * 10;
};

var util = require('util');
var EventEmitter = require('events').EventEmitter;

util.inherits(Creature, EventEmitter);
util.inherits(Creature, require('./behavior/basic.js'));