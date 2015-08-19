var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Creature = require('../index.js');
util.inherits(Creature, EventEmitter);

Creature.prototype.getFood = function() {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;
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

    //determine closest cell
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
    this.game.emit('eat', this.position.x - 0.5, this.position.z - 0.5, this);
    if(this.hunger > 0){
        this.hunger -= 10; 
    }
    this.food = 'none';
};



module.exports = Creature;