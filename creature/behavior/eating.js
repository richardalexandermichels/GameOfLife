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
    if(this.name === "wildDog"){
        console.log('WHAT DID I FIND?',ard);
    }

    ard.forEach(function(cell) {
        var dist = Math.sqrt(Math.pow((cell.x - x),2) + Math.pow((cell.z- z),2)) ;
        if(!min){
            min = dist;
        }else if(dist < min){
            min = dist;
            closestCell = cell;
        }
    });
    this.food = closestCell || "none";
    console.log("CLosest FOOD", this.food)
};

Creature.prototype.eat = function() {
    this.game.emit('eat', this.position.x - 0.5, this.position.z - 0.5, this);
    if(this.hunger > 0){
        this.hunger -= 10;    
    }
    this.moving = true;
};

Creature.prototype.findFood = function() {
    if (this.food === "none") {
        this.getFood();
        this.moving = true;
    }
    if (typeof this.food === 'object' && this.moving) {
        this.moveTowardsObjective(this.food);
    }
    if (this.foundFood && !this.moving) {
        if(this.name === "wildDog"){
            console.log('FOUND FOOD', this.name,this.food);
        }
        this.eat();
        this.food = "none";
    }
    else{
        this.moveRandomly(2)
    }
};


module.exports = Creature;