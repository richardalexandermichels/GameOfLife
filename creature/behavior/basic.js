var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Creature, EventEmitter);

function Creature() {}

Creature.prototype.spawn = function(map){
    this.setPosition(Math.round(Math.random()*map.size), 10, Math.round(Math.random()*map.size));
}

Creature.prototype.jump = function(x) {
    if (x === undefined) x = 1;
    this.move(0, x, 0);
};
Creature.prototype.move = function(x, y, z) {
    var data={
        x:x,
        y:y,
        z:z,
        currentX:this.position.x,
        currentY:this.position.y,
        currentZ:this.position.z,
        size:this.map.size,
    }

    var myWorker = new Worker("./creature/behavior/moveWorker.js");
    myWorker.postMessage(data);
    var self = this;
    myWorker.onmessage=function (result){
        self.position.x = result.data.x;
        self.position.y = result.data.y;
        self.position.z = result.data.z;
        self.rotation.y = Number(result.data.rotY) || self.rotation.y;
        // console.log(self.constructor.name + " " +result.data.rotY); //for debugging
    }
};

Creature.prototype.moveRandomly = function(dir) {
    return Math.round(Math.random() * dir - dir / 2);
};

Creature.prototype.eat = function() {
    this.game.emit('eat', this.position.x - 0.5, this.position.z - 0.5);
};

Creature.prototype.lookAt = function(obj) {
    var a = obj.position || obj;
    var b = this.position;

    this.rotation.y = Math.atan2(a.x - b.x, a.z - b.z) + Math.random() * 1 / 4 - 1 / 8;
};

Creature.prototype.notice = function(target, opts) {
    var self = this;
    if (!opts) opts = {};
    if (opts.radius === undefined) opts.radius = 500;
    if (opts.collisionRadius === undefined) opts.collisionRadius = 25;
    if (opts.interval === undefined) opts.interval = 1000;
    var pos = target.position || target;

    return setInterval(function() {
        var dist = self.position.distanceTo(pos);
        if (dist < opts.collisionRadius) {
            self.emit('collide', target);
        }

        if (dist < opts.radius) {
            self.noticed = true;
            self.emit('notice', target);
        } else {
            self.noticed = false;
            self.emit('frolic', target);
        }
    }, opts.interval);
};

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

Creature.prototype.procreate = function() {
    this.game.emit("procreate", 5.5, this.position.z - 0.5, this.constructor.name);
    var newCreature = new this.constructor(this.game,this.map);
    map.creatures.push(newCreature);
    newCreature.setPosition(this.position.x - 0.5, 10, this.position.z - 0.5);
    game.addEvent(function(){
        newCreature.live();
    }, 1);
};

module.exports = Creature;