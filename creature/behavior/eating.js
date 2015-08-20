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
   
    var foodSource;

    //determine closest cell
    if(this.isHerbivore === false){
        var self = this;
        map.creatures.forEach(function(creature){
             if(creature !== self){
                var dist = Math.sqrt(Math.pow((creature.position.x - x), 2) + Math.pow((creature.position.z - z), 2)) ;
                if(!min){
                    min = dist;
                    closestCell = creature;
                }else if(dist < min){
                    min = dist;
                    closestCell = creature;
                }
            }

            // self.move(self.step(x, closestCell.x), 0, self.step(y, closestCell.y));
        });
        this.moveTowardsObjective(closestCell); 
    }

    if(this.isHerbivore){
        this.moveTowardsObjective("grass");
    }
};

Creature.prototype.eat = function(target) {
    // console.log(this.name + " ate " + this.food.material, this.food.hasAnimal);
    // this.game.emit('eat', this.position.x - 0.5, this.position.z - 0.5, target);
    if(this.hunger > 0){
        this.hunger -= 10; 
    }
    if(this.isHerbivore) map.empty(target.x, target.z);
    else target.die()
};



module.exports = Creature;