var Creature = require('./');

function Cow(game, map) {
    Creature.call(this, game, 'cow', map);
    this.eating = false;
    this.moving = false;
    this.food;
    this.singleFood;
}

Cow.prototype = Object.create(Creature.prototype);
Cow.prototype.constructor = Cow;

Cow.prototype.findFood = function() {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    var around = [];
    this.map.data.forEach(function(row, rowIndex) {
        if (rowIndex <= x + 3 && rowIndex >= x - 3) {
            row.forEach(function(cell, cellIndex) {
                if (cellIndex <= z + 3 && cellIndex >= z - 3)
                    around.push(cell);
            })
        }
    })
    var food = around.filter(function(cell) {
        return cell.material === "grass";
    })

    return food.length ? food : false;
}

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Cow;