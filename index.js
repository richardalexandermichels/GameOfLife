//voxel-engine: base module
var createGame = require('voxel-engine');

var grass = ['grass', 'dirt', 'grass_dirt'];
var dirt = ['dirt','dirt','dirt'];

var materials= [grass, dirt];

var Map = require('./Map');
//set 1X1 to be grass;
var map = new Map(10);
map.fertilize(5,5);

var game = createGame({
    generate: function(x,y,z){
      return (y === 0 && x>=0 && x<=10 && z>=0 && z<=10) ? map.getMaterial(x,z) : 0;
    },
    materials: materials,
    texturePath: './textures/'
});





//voxel-player: add player that can move around. It needs a copy of the game
var createPlayer = require('voxel-player')(game);

var player = createPlayer('textures/player.png'); //creates player and provide dummy texture

// player.pov('third');
player.possess(); //camera follow player
player.yaw.position.set(0,10,0);

window.player=player;

window.game = game; //for debugging
window.map = map;
var container = document.body;
game.appendTo(container);


game.setInterval(function() {
  map.growGrass(game);
}, 2000);
