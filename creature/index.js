function Creature (opts) {
    this.name = opts.name;
    this.alive = true;
    this.size = opts.size;
    this.isCarnivore = opts.isCarnivore || false;
    this.isHerbivore = opts.isHerbivore || true;
    this.hp = getHp(opts.size);
    this.hunger = Math.floor(this.hp / 4);
    this.vision = opts.vision;
    this.intelligence = opts.intelligence || 10;
    this.social = opts.social || 10;
    this.memory = [];
    this.food = [];
    this.offspring;
    this.pregnant = false;
    this.position = {
    	x: 0,
    	y: 0,
    	z: 0
    };
    this.rotation = {
    	x: 0,
    	y: 0,
    	z: 0
    };
};

function getHp(size){
	return size * 10;
};

var util = require('util');
var EventEmitter = require('events').EventEmitter;

util.inherits(Creature, EventEmitter);
util.inherits(Creature, require('./behavior/index.js'));

module.exports = Creature;