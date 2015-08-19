var util = require('util');
var EventEmitter = require('events').EventEmitter;
var render = require('../render.js')
util.inherits(Creature, EventEmitter);
util.inherits(Creature, require('./eating.js'));

function Creature() {}

Creature.prototype.setPosition = function(x, y, z) {
    parseXYZ(x, y, z);
    this.position.y = y;
    this.position.x = x;
    this.position.z = z;
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
    map.creatures.forEach(function(creature, index){
        if (self.item.avatar.id === creature.item.avatar.id) {
            ind = index;
            map.creatures.splice(ind, 1);
        }
    });
    game.removeItem(this);
    game.scene.remove(this.item.avatar);
    game.removeEvent(this.item.avatar.id)
    };

Creature.prototype.procreate = function() {
    this.game.emit("procreate", 5.5, this.position.z, this.name);
    var newCreature = new this.constructor({
        name: this.name,
        size: this.size,
        vision: this.vision,
        isHerbivore: this.isHerbivore
    });
    map.creatures.push(newCreature);
    render(newCreature, map);
    newCreature.setPosition(this.position.x, 10, this.position.z);
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
    map.getCell(self.position.x, self.position.z).hasAnimal = null;
    myWorker.onmessage=function (result){
        self.position.x = result.data.x;
        self.position.y = result.data.y;
        self.position.z = result.data.z;
        self.rotation.y = Number(result.data.rotY) || self.rotation.y;
        map.getCell(self.position.x, self.position.z).hasAnimal = self;
    };
};

Creature.prototype.moveRandomly = function(amt) {
    var x = Math.round((Math.random() * amt) - amt/2);
    var z = Math.round((Math.random() * amt) - amt/2);
    this.move(x, 0, z);
};


Creature.prototype.jump = function(x) {
    if (x === undefined) x = 1;
    this.move(0, x, 0);
};


Creature.prototype.lookAt = function(obj) {
    var a = obj.position || obj;
    var b = this.position;

    this.rotation.y = Math.atan2(a.x - b.x, a.z - b.z) + Math.random() * 1 / 4 - 1 / 8;
};

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

Creature.prototype.lookAround = function(searchRadius, objective) {
    var x = this.position.x;
    var z = this.position.z;
    var xPlus = x + searchRadius ;
    var xMinus = x - searchRadius;
    var zPlus = z + searchRadius ;
    var zMinus = z - searchRadius;
    var self = this;
    var around = [];

    for(var i = xMinus; i <= xPlus; i++){
        for(var j = zMinus; j<= zPlus; j++){
            var cell = map.getCell(i,j);
            if(cell){
                around.push(cell);
            }
        }
    }
    if(objective === 'material'){
        return around.filter(function(cell){
            return cell.material === 'grass';
        });
    }
    else{
        return around.filter(function(cell){
                if(cell.x !== self.position.x && cell.z !== self.position.z){
                    return cell.hasAnimal !== null && cell.hasAnimal !== undefined ;
                }
        });
    }
    //get surrounding area
    // this.map.data.forEach(function(row, rowIndex) {
    //     if (rowIndex <= x + searchRadius && rowIndex >= x - searchRadius) {
    //         row.forEach(function(cell, cellIndex) {
    //             if (cellIndex <= z + searchRadius && cellIndex >= z - searchRadius) {
    //                 around.push({
    //                     cell: cell,
    //                     x: rowIndex,
    //                     z: cellIndex
    //                 });
    //             }
    //         });
    //     }
    // });

};

Creature.prototype.step = function(dir, objective) {
    if (dir < objective) return 1;
    else if (dir > objective) return -1;
    else return 0;
};

Creature.prototype.moveTowardsObjective = function(cell) {
    var x = this.position.x;
    var z = this.position.z;
    var self = this;
    //if moving 0 in all directions
    //this.rotation.y / (Math.PI / 180)
    var ard = [
        [x - 1, z],
        [x + 1, z],
        [x + 1, z - 1],
        [x + 1, z - 1],
        [x - 1, z - 1],
        [x - 1, z + 1],
        [x, z - 1],
        [x, z + 1]
    ];

    ard.forEach(function(coords){
        if(map.getCell(coords[0],coords[1]) === cell){
            console.log(self.name + " has found food");
            self.foundFood = true;
            self.lookAt(cell);
        }
    });
    if(this.foundFood === false){
        this.move(this.step(x, cell.x), 0, this.step(z, cell.z));
        console.log(this.name, " is moving toward food", this.position);
    }
};

Creature.prototype.herd = function() {
    var x = this.position.x;
    var z = this.position.z;
    var neighbors = this.lookAround(this.social, 'hasAnimal');
    var foundNeighbor = false;
    var self = this;
    var min;
    neighbors.forEach(function(cell) {
        if(cell.hasAnimal !== null){
            if (cell.hasAnimal.name === self.name) {
                foundNeighbor = true;
                var dist = Math.sqrt(Math.pow((cell.x - x),2) + Math.pow((cell.z - z),2)) ;
                if(!min){
                    min = dist;
                    closestCell = cell;
                }else if(dist < min){
                    min = dist;
                    closestCell = cell;
                }
            }
        }
    });
    if(foundNeighbor) this.moveTowardsObjective(closestCell);
    else this.moveRandomly(2);  
};

Creature.prototype.exist = function() {
    if (this.alive) {
        console.log("NAME: " + this.name + ", Hunger: " + this.hunger + ", HP: " + this.hp);
        this.hunger++;
        if (this.hunger >= Math.floor(this.hp)) this.hp--;

        if (this.hp <= 0) this.die();

        if (this.hunger >= Math.floor(this.hp / 2)) {
            console.log(this.name + " is looking for food");
            this.findFood();
        }
        else {
            console.log(this.name + " is herding");
            this.herd();
        }
    }
};

module.exports = Creature;