module.exports = function(game) {
  return function(type) {
    return new Creature(game, type);
    // return new Creature(game, type, opts); // If we wanted to include options later
  };
};

//require the node.js utils packet and add event emitter
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Creature,EventEmitter);

//Where all shape are stored
var shape = require('./shape.js');

function Creature(game, type, opts) {
  console.log(shape);
  var obj = shape[type]; // Get shape for creature
  var T = game.THREE;
  this.game = game;

  if (!opts) opts = {};
  var force = opts.force || [0, -0.00009, 0];
  if (Array.isArray(force)) {
    force = new T.Vector3(force[0], force[1], force[2]);
  } else force = new T.Vector3(force.x, force.y, force.z);

  var dims = opts.dims || new T.Vector3(0.04, 0.04, 0.04); //missing a skin option ?
  obj.scale = new T.Vector3(0.04, 0.04, 0.04);

  this.item = game.makePhysical(obj);
  this.item.subjectTo(game.gravity);
  game.scene.add(obj);
  game.addItem(this.item); //this line breaks

  this.position = this.item.yaw.position;
  this.rotation = this.item.yaw.rotation;
}

Creature.prototype.jump = function(x) {
  if (x === undefined) x = 1;
  this.move(0, x, 0);
};
Creature.prototype.move = function(x, y, z) {
    var xyz = parseXYZ(x, y, z);
    this.position.x += xyz.x;
    this.position.y += xyz.y;
    this.position.z += xyz.z;
};

Creature.prototype.lookAt = function(obj) {
  var a = obj.position || obj;
  var b = this.position;

  this.item.yaw.rotation.y = Math.atan2(a.x - b.x, a.z - b.z) + Math.random() * 1 / 4 - 1 / 8;
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