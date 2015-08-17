var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Creature = require('../index.js');
util.inherits(Creature, EventEmitter);

Creature.prototype.getFood = function(foodType) {
    var min, closestCell;
    var ard = this.lookAround(this.vision);
    ard.forEach(function(cell) {
        if (cell.cell.material === foodType) {
            var dist = Math.abs(x + z - (cell.x + cell.z));
            if (!min) {
                min = dist;
                closestCell = cell;
            } else if (dist < min) {
                min = dist;
                closestCell = cell;
            }
        }
    });
    this.food = closestCell || "none";
};

Creature.prototype.eat = function() {
    this.game.emit('eat', this.position.x - 0.5, this.position.z - 0.5);
};

Creature.prototype.findFood = function() {
    if (this.food === "none") {
        this.getFood("grass");
        this.moving = true;
    }

    if (this.food === "none") {
        this.moveRandomly(2);
    }
    if (typeof this.food === "object" && this.moving) {
        this.moveTowardsObjective(this.food);
    }
    if (this.foundFood) {
        if (this.eatingCount === 4) {
            this.eat();
            this.hp++;
            this.getFood("grass");
            this.eatingCount = 0;
            this.moving = true;
        } else this.eatingCount++;
    }
};


module.exports = Creature;