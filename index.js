// <------ MATERIALS ------>
var grass = ['grass', 'dirt', 'grass_dirt'];
var dirt = ['dirt', 'dirt', 'dirt'];
var materials = [grass, dirt];

// <------ MAP ------>
var Map = require('./map');
// Create Map
var map = new Map(10);
window.map = map;
map.fertilize(5, 5);

// <------ GAME ------>
//voxel-engine: base module
var createGame = require('voxel-engine');
var game = createGame({
    generate: function(x, y, z) {
        return (y === 0 && x >= 0 && x <= 10 && z >= 0 && z <= 10) ? map.getMaterial(x, z) : 0;
    },
    materials: materials,
    texturePath: './textures/',
    controls: {
        discreteFire: true
    }
});


window.game = game; //for debugging
var container = document.body;
game.appendTo(container);

var createCreature = require('./creature')(game);
var basicCreature = createCreature("spider");
window.creature1 = basicCreature;
basicCreature.setPosition(2, 10, 2);


// <------ PLAYER ------>

//voxel-player: add player that can move around. It needs a copy of the game
var createPlayer = require('voxel-player')(game);
var player = createPlayer('textures/player.png'); //creates player and provide dummy texture
window.player = player;
// player.pov('third');
player.possess(); //camera follow player
player.yaw.position.set(1, 10, 1);
//Toggle Camera First / Third Person View
window.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 'R'.charCodeAt(0)) {
        player.toggle();
    }
});


var highlight = require('voxel-highlight')
var highlighter = highlight(game)
var positionME;
highlighter.on('highlight', function(voxelPosArray) {
    positionME = voxelPosArray
})

game.on('fire', function(pos) {
    console.log(pos)
})

// <------ TICK ------>
game.setInterval(function() {
    map.growGrass(game);
}, 2000);