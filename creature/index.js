module.exports = Creature;
var voxel = require('voxel');
var voxelMesh = require('voxel-engine/node_modules/voxel-mesh');


// <---- deprecated ---->
// return function(type) {
//     return new Creature(game, type);
//     // return new Creature(game, type, opts); // If we wanted to include options later


//Where all shape are stored
var shape = require('./shape.js');
var T = game.THREE;

function Creature(game, type, map, opts) {
    var obj = shape[type]; // Get shape for creature
    if(typeof obj !=="function"){
        obj = build(obj);
        obj.scale = new T.Vector3(0.5,0.5,0.5)
    } else{
        obj = obj();
        obj.scale = new T.Vector3(0.04, 0.04, 0.04);
    }
    console.log("this line is called");
    this.game = game;
    this.map = map;

    //<--- Not currently Used --->
    // if (!opts) opts = {};
    // var force = opts.force || [0, -0.00009, 0];
    // if (Array.isArray(force)) {
    //   force = new T.Vector3(force[0], force[1], force[2]);
    // } else force = new T.Vector3(force.x, force.y, force.z);
    // var dims = opts.dims || new T.Vector3(0.04, 0.04, 0.04); //missing a skin option ?

    this.item = game.makePhysical(obj);
    this.item.subjectTo(game.gravity);
    game.scene.add(obj);
    game.addItem(this.item); //this line breaks

    this.position = this.item.yaw.position;
    this.rotation = this.item.yaw.rotation;

    this.pregnant = false;
}

//Convert voxel-builder critter into our critter already converted hash
function build(obj) {
  var bounds = obj.bounds;
  var voxels = obj.voxels;
  var colors = obj.colors;

  // create voxels
  bounds[0] = bounds[0].map(function(b) { return b - 1; });
  bounds[1] = bounds[1].map(function(b) { return b + 1; });
  var voxels = generate(bounds[0], bounds[1], function(x, y, z) {
    return voxels[[x, y, z].join('|')] || 0;
  });
  console.log(voxels);
  // create mesh
  var scale = 0.4;
  var mesh = voxelMesh(voxels, this.game.mesher, new this.game.THREE.Vector3(scale, scale, scale), this.game.THREE);
  var mat = new self.game.THREE.MeshBasicMaterial({vertexColors: this.game.THREE.FaceColors});
  mesh.createSurfaceMesh(mat);

  // colorize
  for (var i = 0; i < mesh.surfaceMesh.geometry.faces.length; i++) {
    var face = mesh.surfaceMesh.geometry.faces[i];
    var index = Math.floor(face.color.b*255 + face.color.g*255*255 + face.color.r*255*255*255);
    var color = colors[index] || colors[0];
    face.color.setRGB(color[0], color[1], color[2]);
  }

  function generate(l, h, f, game) {
  var d = [ h[0]-l[0], h[1]-l[1], h[2]-l[2] ]
  var v = new Int8Array(d[0]*d[1]*d[2])
  var n = 0
  for(var k=l[2]; k<h[2]; ++k)
  for(var j=l[1]; j<h[1]; ++j)
  for(var i=l[0]; i<h[0]; ++i, ++n) {
    v[n] = f(i,j,k,n,game)
  }
  return {voxels:v, dims:d}
}


  // center the geometry
  this.game.THREE.GeometryUtils.center(mesh.surfaceMesh.geometry);
  mesh.setPosition(0, 1.5, 0);

  // create creature
  var body = new this.game.THREE.Object3D();
  body.add(mesh.surfaceMesh);
  return body;
};


//require the node.js utils packet and add event emitter
//Adds event emitter functionality to Creature
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Creature, EventEmitter);

//Loads basic behavior
util.inherits(Creature, require('./behavior/basic.js'));