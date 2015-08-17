var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Creature, EventEmitter);

Creature.prototype.getFood = function() {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    //get surrounding area
    var around = [];
    this.map.data.forEach(function(row, rowIndex) {
        if (rowIndex <= x + this.vision && rowIndex >= x - this.vision) {
            row.forEach(function(cell, cellIndex) {
                if (cellIndex <= z + this.vision && cellIndex >= z - this.vision)
                    around.push({
                        cell: cell,
                        x: rowIndex,
                        z: cellIndex
                    });
            })
        }
    });
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
    });

    this.food = closestCell || "none";
};

Creature.prototype.step = function(dir, str) {
    if (dir < this.food[str]) return 1;
    else if (dir > this.food[str]) return -1;
    else return 0;
};

Creature.prototype.moveTowardsFood = function() {
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

Creature.prototype.eat = function() {
    this.game.emit('eat', this.position.x - 0.5, this.position.z - 0.5);
};

Creature.prototype.findFood = function() {
    if (this.food === "none") {
        this.getFood();
        this.moving = true;
    }

    if (this.food === "none") {
        this.moveRandomly(2);
    }
    if (typeof this.food === "object" && this.moving) {
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
};


module.exports = Eating;