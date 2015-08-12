//voxel-engine: base module
var createGame = require('voxel-engine');


var perlin = require('voxel-perlin-terrain');

var chunkSize = 32;
var chunkDistance = 2;
var texturePath ='./textures/';

var generate = perlin({
  chunkDistance: chunkDistance,
  chunkSize: chunkSize,
  scaleFactor: chunkDistance * chunkSize / 4
});


var game = createGame({
  // generate: function(x, y, z) {
  //   return (y = 1) ? 1 : 0;
  //  // flat World
  // },
  // generate: function(x,y,z) {
  //   return x*x+y*y+z*z <= 15*15 ? 1 : 0; // sphere world
  // },
    // generate: generate, //perlin
    generate: function(x, y, z) {
  // if (y === 5 && x === 5 && z === 5) { return 2; }
  // if (y === 4 && (x > 3 && x < 7) && (z > 3 && z < 7)) { return 2; }
  // if (y === 3 && (x > 2 && x < 8) && (z > 2 && z < 8)) { return 2; }
  // if (y === 2 && (x > 1 && x < 9) && (z > 1 && z < 9)) { return 2; }
  // if (y === 1 && (x > 0 && x < 10) && (z > 0 && z < 10)) { return 2; }
  return (y === 0 && Math.abs(x)<10 && Math.abs(z)<10) ? 1 : 0;
  }, // pyramide
    materials: [ 'grass', 'yellow' ],
    texturePath: './textures/'
});

// var game = createGame({
//   generateVoxelChunk: generate,
//   cubeSize: 25,
//   chunkSize: chunkSize,
//   chunkDistance: chunkDistance,
//   startingPosition: [185, 100, 0],
//   texturePath: texturePath,
//   worldOrigin: [0,0,0],
//   controlOptions: {jump: 6}
// })

//set sky
// var createSky = require('voxel-sky')(game);
// var sky = createSky();
// game.on('tick', sky);


//voxel-player: add player that can move around. It needs a copy of the game
var createPlayer = require('voxel-player')(game);

var player = createPlayer('textures/player.png'); //creates player and provide dummy texture

player.possess(); //camera follow player
player.yaw.position.set(0,100,0);



//Create trees
// var createTree = require('voxel-forest')
// // Create some trees.
// for (var i = 0; i < 25; i++) {
// createTree(game, {bark: 2, leaves: 3});
// }

window.player=player;

window.game = game; //for debugging
var container = document.body;
game.appendTo(container);

return game;