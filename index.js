// <------ MATERIALS ------>
var grass = ['grass', 'dirt', 'grass_dirt'];
var dirt = ['dirt', 'dirt', 'dirt'];
var materials = [grass, dirt];
var size = 20; // <---- Set the Size HERE

// <------ MAP ------>
var Map = require('./map');
// Create Map
var map = new Map(size);
window.map = map;
map.fertilize(5, 5);

// <------ GAME ------>
//voxel-engine: base module
var createGame = require('voxel-engine');
var game = createGame({
    generate: function(x, y, z) {
        return (y === 0 && x >= 0 && x <= size && z >= 0 && z <= size) ? map.getMaterial(x, z) : 0;
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

// <------ CREATURE ------>
var Basic = require('./creature/basicCreature.js');
var basicCreature = new Basic(game);
window.creature = basicCreature;
basicCreature.setPosition(2, 10, 2);

var Cow = require('./creature/cow.js');
var cow = new Cow(game);
window.cow = cow;
cow.setPosition(3, 10, 2);

var Spider = require('./creature/spider.js');
var spider = new Spider(game);
window.spider = spider;
spider.setPosition(4, 10, 2);


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


//<----- HIGHLIGHT HELPER ------>
var highlight = require('voxel-highlight');
var highlighter = highlight(game);
var positionME;
highlighter.on('highlight', function(voxelPosArray) {
    positionME = voxelPosArray;
});


//<----- GAME EVENT ------>
var setEvent = require('./game-event')(game);
setEvent();

function moveRandomly(dir) {
    return Math.round(Math.random() * dir) || -Math.round(Math.random() * dir);
}