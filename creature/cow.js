var Creature = require('./');

function Cow(game, map) {
    Creature.call(this, game, "cow", map);
    this.moving;
    this.foundFood;
    this.singleFood = "none";
    this.eatingCount = 0;
    this.hp = 10;
    this.hpCount = 0;
    this.hungry;
    this.alive = true;
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
        if (this.eatingCount === 4) {
            this.eat();
            this.hp++
            this.hpCount = 0;
            this.getFood();
            this.eatingCount = 0;
            this.moving = true;
        } else this.eatingCount++;
    }
}

Cow.prototype.exist = function() {
    if (this.alive) {
        this.hpCount++;
        if (this.hpCount === 10) {
            this.hp--;
            this.hpCount = 0;
        }

        if (this.hp === 0) this.alive = false;
        if (this.hp <= 5) this.hungry = true;
        if (this.hp === 10) this.hungry = false;

        if (this.hungry) this.findFood();
        else this.moveRandomly(2);
    } else this.alive = false;

};

Cow.prototype.live = function() {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    if (!this.food) this.food = this.findFood();
    if (this.food && !this.singleFood) {
        this.singleFood = this.food.shift();
        if (!this.food.length) this.food = false;
    }

    if (this.moving && this.food) {
        if (x === this.singleFood.x && z === this.singleFood.z) {
            this.moving = false;
            this.eating = true;
        } else this.move(step(x, this.singleFood.x), 0, step(z, this.singleFood.z));
    }

    if (this.moving && !this.food) {
        this.move(this.moveRandomly(2), 0, this.moveRandomly(2));
    }

    if (this.eating) {
        this.eat();
        this.singleFood = false;
        this.eating = false;
    }

    if (!this.eating && !this.moving) {
        if (!this.food) {
            this.move(this.moveRandomly(2), 0, this.moveRandomly(2));
            this.moving = true;
        } else {
            this.move(step(x, this.singleFood.x), 0, step(z, this.singleFood.z));
            this.moving = true;
        }
    }
};

var util = require('util');

//Loads basic/shared behavior
// util.inherits(Creature, require('./behavior/basic.js'));

module.exports = Cow;