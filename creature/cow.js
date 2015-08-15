var Creature = require('./');

function Cow(game, map) {
    Creature.call(this, game, "cow", map);
    this.moving;
    this.foundFood;
    this.singleFood = "none";
    this.eatingCount = 0;
    this.hp = 25;
    this.hunger = 0;
}

Cow.prototype = Object.create(Creature.prototype);
Cow.prototype.constructor = Cow;


Cow.prototype.getFood = function() {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    //get surrounding area
    var around = [];
    this.map.data.forEach(function(row, rowIndex) {
        if (rowIndex <= x + 3 && rowIndex >= x - 3) {
            row.forEach(function(cell, cellIndex) {
                if (cellIndex <= z + 3 && cellIndex >= z - 3)
                    around.push({
                        cell: cell,
                        x: rowIndex,
                        z: cellIndex
                    });
            })
        }
    })
    //get closest food voxel
    var min, closestCell;
    around.forEach(function(cell) {
        if (cell.cell.material === "grass") {
            var dist = Math.abs(x + z - (cell.x + cell.z));
            if (!min) {
                min = dist;
                closestCell = cell;
            } else if (dist < min) {
                min = dist;
                closestCell = cell;
            }

        }
    })

    this.singleFood = closestCell || "none"
}

// Cow.prototype.moveRandomly = function(amt) {
//     this.moving = true;
//     var x = Math.round(Math.random() * amt) - amt / 2;
//     var z = Math.round(Math.random() * amt) - amt / 2;
//     this.move(x, 0, z)
// }

Cow.prototype.step = function(dir, str) {
    if (dir < this.singleFood[str]) return 1;
    else if (dir > this.singleFood[str]) return -1;
    else return 0;
};

Cow.prototype.moveTowardsFood = function() {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    //if moving 0 in all directions
    if (!this.step(x, "x") && !this.step(z, "z")) {
        this.foundFood = true;
        this.moving = false;
    } else {
        this.move(this.step(x, "x"), 0, this.step(z, "z"));
    }
};

Cow.prototype.findFood = function() {
    if (this.singleFood === "none") {
        this.getFood();
        this.moving = true;
    }

    if (this.singleFood === "none") {
        this.moveRandomly(2);
    }

    if (typeof this.singleFood === "object" && this.moving) {
        this.moveTowardsFood();
    }
    if (this.foundFood) {
        if (this.eatingCount === 2) {
            this.eat();
            this.hp++
            this.getFood();
            this.eatingCount = 0;
            this.moving = true;
        } else this.eatingCount++;
    }
}

Cow.prototype.live = function() {
    console.log('HP:' + this.hp + "hunger:" + this.hunger);
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;
    if (this.isAlive) {
        this.hunger++;
        if (this.hp === 0) this.die()
        if (this.hunger <= 10) {
            this.move(this.moveRandomly(2), 0, this.moveRandomly(2));
        }
        else {
            this.getFood();
            if (x === this.singleFood.x && z === this.singleFood.z) {
                this.moving = false;
                this.eating = true;
                this.eat(10);
            } 
            
            else {
                this.move(this.step(x, this.singleFood.x), 0, this.step(z, this.singleFood.z));
            }
        }
        if (this.hunger >= 50) this.hp--
    }
};

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Cow;