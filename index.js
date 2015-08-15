// <------ HELPERS -------->
var _ = require("lodash");

// <------ MATERIALS ------>
var grass = ['grass', 'dirt', 'grass_dirt'];
var dirt = ['dirt', 'dirt', 'dirt'];
var bark = ['tree_side'];
var leaves = ['leaves_opaque'];
var materials = [grass, dirt, bark, leaves];
var size = 20;

// <------ MAP ------>
var Map = require('./map');
// Create Map
var map = new Map(size);
window.map = map;
map.fertilize(5, 5); //initial fertilized voxel; grass will grow at after 10 seconds;

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
    },
    // lightsDisabled: true
});

var start = require('./game-settings/start')(game);

//Set the game time unit
var setTime= require('./game-settings/time.js')(game)();

window.game = game; //for debugging
var container = document.body;
game.appendTo(container);


//<----------Forest-------------------->
var Forest = require('./forest')(game, {
    bark: 3,
    leaves: 4,
    densityScale: 2,
    treeType: 'random'
});



//<------ SKY ------>
var createSky = require('voxel-sky')({
    game: game,

    // starting time of the day
    time: 2400,

    // size of the sky
    size: game.worldWidth() * 2,
    // how fast the sky rotates
    // speed: 1

});
var sky = createSky(1200);
game.on('tick', sky);

function initialize(creatures, name, newCreature) {
    if (creatures.hasOwnProperty(name)) creatures[name].push(newCreature);
    else creatures[name] = [newCreature];
}

// <------ CREATURE ------>
var creatures = {}; //all creatures

var Basic = require('./creature/basicCreature.js');
var basicCreature = new Basic(game, map);
window.creature = basicCreature;
basicCreature.setPosition(Math.round(Math.random()*size), 10, Math.round(Math.random()*size));
initialize(creatures, 'basicCreature', basicCreature);

var Cow = require('./creature/cow.js');
var cow = new Cow(game, map);
window.cow = cow;
cow.setPosition(Math.round(Math.random()*size), 10, Math.round(Math.random()*size));
initialize(creatures, 'cow', cow);

var Spider = require('./creature/spider.js');
var spider = new Spider(game, map);
window.spider = spider;
spider.setPosition(Math.round(Math.random()*size), 10, Math.round(Math.random()*size));
initialize(creatures, 'spider', spider);


// <------ PLAYER ------>
var fly = require('voxel-fly');


//voxel-player: add player that can move around. It needs a copy of the game
var createPlayer = require('voxel-player')(game);
var player = createPlayer('textures/player.png'); //creates player and provide dummy texture
window.player = player;
// player.pov('third');
player.possess(); //camera follow player
player.yaw.position.set(size/2, 10, size/2);
//creating fly and assigning to current player controller character
var makeFly = fly(game);
var target = game.controls.target();
game.flyer = makeFly(target);
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
var setEvent = require('./game-settings/events.js')(game,creatures);
setEvent();
