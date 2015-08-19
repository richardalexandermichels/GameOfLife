var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Creature = require('../index.js');
util.inherits(Creature, EventEmitter);

Creature.prototype.getFood = function() {
    var x = this.position.x;
    var z = this.position.z;
    var min;
    var closestCell;
    var objective;
    if(this.isHerbivore){
        objective = 'material';
    }else{
        objective = 'hasAnimal';
    }
    var ard = this.lookAround(this.vision, objective);
    var foodSource;

    ard.forEach(function(cell) {
        var dist = Math.sqrt(Math.pow((cell.x - x), 2) + Math.pow((cell.z- z), 2)) ;
        if(!min){
            min = dist;
            closestCell = cell;
        }else if(dist < min){
            min = dist;
            closestCell = cell;
        }
    });
    this.food = closestCell || "none";
    this.moveTowardsObjective(this.food);
};

Creature.prototype.eat = function() {
    console.log(this.name + " ate " + this.food.material, this.food.hasAnimal);
    this.game.emit('eat', this.position.x, this.position.z, this);
    if(this.hunger > 0){
        this.hunger -= 10;  
    }
    this.foundFood = undefined;
    this.food = 'none';
};

Creature.prototype.findFood = function() {
    console.log("find food was called", this.foundFood);
    if (this.foundFood === undefined) this.getFood();
    if (this.foundFood) this.eat();
    else {
        this.moveRandomly(2);
    }
};


module.exports = Creature;