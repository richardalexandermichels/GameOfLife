var util = require('util');
var EventEmitter = require('events').EventEmitter;
var render = require('../render.js')
util.inherits(Creature, EventEmitter);
util.inherits(Creature, require('./eating.js'));

function Creature() {}

Creature.prototype.setPosition = function(x, y, z) {
    parseXYZ(x, y, z);
    this.position.y = y;
    this.position.x = x + 0.5;
    this.position.z = z + 0.5;
};

function parseXYZ(x, y, z) {
    if (typeof x === 'object' && Array.isArray(x)) {
        return {
            x: x[0],
            y: x[1],
            z: x[2]
        };
    } else if (typeof x === 'object') {
        return {
            x: x.x || 0,
            y: x.y || 0,
            z: x.z || 0
        };
    }
    return {
        x: Number(x),
        y: Number(y),
        z: Number(z)
    };
}

Creature.prototype.die = function(){
    this.isAlive = false;
    var ind;
    var self = this;
    console.log(map.creatures);
    map.creatures.forEach(function(creature, index){
        if (self.item.avatar.id === creature.item.avatar.id) {
            ind = index;
            map.creatures.splice(ind, 1);
        }
    });
    game.removeItem(this);
    game.scene.remove(this.item.avatar);
};

Creature.prototype.procreate = function() {
    this.game.emit("procreate", 5.5, this.position.z - 0.5, this.name);
    var newCreature = new this.constructor({
        name: this.name,
        size: this.size,
        vision: this.vision
    });
    map.creatures.push(newCreature);
    render(newCreature, map);
    newCreature.setPosition(this.position.x - 0.5, 10, this.position.z - 0.5);
    game.addEvent(function(){
        newCreature.exist();
    }, 1);
};

Creature.prototype.move = function(x, y, z) {
    var data={
        x:x,
        y:y,
        z:z,
        currentX:this.position.x,
        currentY:this.position.y,
        currentZ:this.position.z,
        size: this.map.size
    };

    var myWorker = new Worker("./creature/behavior/moveWorker.js");
    myWorker.postMessage(data);
    var self = this;
    map.getCell(self.position.x - 0.5, self.position.z - 0.5).hasAnimal = null;
    myWorker.onmessage=function (result){
        self.position.x = result.data.x;
        self.position.y = result.data.y;
        self.position.z = result.data.z;
        self.rotation.y = Number(result.data.rotY) || self.rotation.y;
        // console.log(self.constructor.name + " " +result.data.rotY); //for debugging
    };
    map.getCell(self.position.x - 0.5, self.position.z - 0.5).hasAnimal = self;
};

Creature.prototype.moveRandomly = function(amt) {
    this.moving = true;
    var x = Math.round(Math.random() * amt) - amt / 2;
    var z = Math.round(Math.random() * amt) - amt / 2;
    this.move(x, 0, z);
};


Creature.prototype.jump = function(x) {
    if (x === undefined) x = 1;
    this.move(0, x, 0);
};


// Creature.prototype.lookAt = function(obj) {
//     var a = obj.position || obj;
//     var b = this.position;

//     this.rotation.y = Math.atan2(a.x - b.x, a.z - b.z) + Math.random() * 1 / 4 - 1 / 8;
// };

// Creature.prototype.notice = function(target, opts) {
//     var self = this;
//     if (!opts) opts = {};
//     if (opts.radius === undefined) opts.radius = 500;
//     if (opts.collisionRadius === undefined) opts.collisionRadius = 25;
//     if (opts.interval === undefined) opts.interval = 1000;
//     var pos = target.position || target;

//     return setInterval(function() {
//         var dist = self.position.distanceTo(pos);
//         if (dist < opts.collisionRadius) {
//             self.emit('collide', target);
//         }

//         if (dist < opts.radius) {
//             self.noticed = true;
//             self.emit('notice', target);
//         } else {
//             self.noticed = false;
//             self.emit('frolic', target);
//         }
//     }, opts.interval);
// };

Creature.prototype.lookAround = function(search) {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    //get surrounding area
    var around = [];
    this.map.data.forEach(function(row, rowIndex) {
        if (rowIndex <= x + search && rowIndex >= x - search) {
            row.forEach(function(cell, cellIndex) {
                if (cellIndex <= z + search && cellIndex >= z - search) {
                    around.push({
                        cell: cell,
                        x: rowIndex,
                        z: cellIndex
                    });
                }
            });
        }
    });

};

Creature.prototype.step = function(dir, objective) {
    if (dir < objective) return 1;
    else if (dir > objective) return -1;
    else return 0;
};

Creature.prototype.moveTowardsObjective = function(cell) {
    var x = this.position.x - 0.5;
    var z = this.position.z - 0.5;

    //if moving 0 in all directions
    if (!this.step(x, cell.x) && !this.step(z, cell.z)) {
        this.foundFood = true;
        this.moving = false;
    } else {
        this.move(this.step(x, cell.x), 0, this.step(z, cell.z));
    }
};

Creature.prototype.herd = function() {
    var neighbors = this.lookAround(this.social);
        neighbors.forEach(function(cell) {
        if (cell.cell.hasAnimal.name=== this.name) {
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
    this.moveTowardsObjective(closestCell);
};

Creature.prototype.exist = function() {
    if (this.alive) {
        console.log("hunger ", this.hunger, "hp ", this.hp)
        this.hunger++;
        if (this.hunger >= Math.floor(this.hp)) this.hp--;

        if (this.hp === 0) this.die();

        if (this.hunger >= Math.floor(this.hp / 4)) this.findFood();
        if (this.herbivore) this.herd();
        else this.moveRandomly(2);
    }
};

module.exports = Creature;