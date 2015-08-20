function Creature (opts) {
    this.size = opts.size;
    this.appetite = divide(this.size / 4) || 1;
    this.hpMax = multiply(opts.size, 5); 
    this.hp = this.hpMax
    this.age = 0;
    this.name = opts.name;
    this.alive = true;
    this.lifeCycle = this.hp * 4;
    this.isHerbivore = opts.isHerbivore;
    this.hunger = divide(this.hp, 4);
    this.vision = opts.vision;
    this.speed = divide(this.size, 4)
    this.social = opts.social || 10;
    this.memory = [];
    this.food = "none";
    this.offspring;
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
    // this.intelligence = opts.intelligence || 10;
}

function multiply(trait, factor){
	return trait * factor;
}

function divide (trait, factor) {
    return Math.floor(trait / factor);
}

var util = require('util');
var EventEmitter = require('events').EventEmitter;

util.inherits(Creature, EventEmitter);
util.inherits(Creature, require('./behavior/index.js'));

module.exports = Creature;