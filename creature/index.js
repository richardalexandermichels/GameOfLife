//require the node.js utils packet and add event emitter
var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = function(game) {
  return function(type) {
    return new Creature(game, type);
    // return new Creature(game, type, opts); // If we wanted to include options later
  };
};

//Where all shape are stored
var shape = require('./shape.js');

function Creature(game, type, opts) {
  var obj = shape[type]; // Get shape for creature
  var T = game.THREE;
  this.game = game;

  //<--- Not currently Used --->
  // if (!opts) opts = {};
  // var force = opts.force || [0, -0.00009, 0];
  // if (Array.isArray(force)) {
  //   force = new T.Vector3(force[0], force[1], force[2]);
  // } else force = new T.Vector3(force.x, force.y, force.z);
  // var dims = opts.dims || new T.Vector3(0.04, 0.04, 0.04); //missing a skin option ?

  obj.scale = new T.Vector3(0.04, 0.04, 0.04);

  this.item = game.makePhysical(obj);
  this.item.subjectTo(game.gravity);
  game.scene.add(obj);
  game.addItem(this.item); //this line breaks

  this.position = this.item.yaw.position;
  this.rotation = this.item.yaw.rotation;
}

//Adds event emitter functionality to Creature
util.inherits(Creature,EventEmitter);

//Loads basic behavior
util.inherits(Creature,require('./behavior/basic.js'));
