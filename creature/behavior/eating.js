var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Creature = require('../index.js');
util.inherits(Creature, EventEmitter);

Creature.prototype.getFood = function(foodType) {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;
    var min;
    var closestCell;
    var ard = this.lookAround(this.vision);
    var foodSource;

    ard.forEach(function(cell) {
        if(this.isHerbivore){
            foodSource = cell.material;
        }
        else{
            if(cell.hasAnimal) foodSource = cell.hasAnimal.name;
        }
        if (foodSource === foodType) {
            var dist = Math.sqrt(Math.pow((cell.x - x),2) + Math.pow((cell.z- z),2)) ;
            if(!min){
                min = dist;
            }else if(dist < min){
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
    if (typeof this.food === 'object' && this.moving) {
        this.moveTowardsObjective(this.food);
    }
    if (this.foundFood && !this.moving) {
        console.log('FOUND FOOD');
        this.eat();
        if(this.hunger > 0){
         this.hunger -= 10;    
        }
        this.moving = true;
    }
};


module.exports = Creature;