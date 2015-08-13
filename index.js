// <------ MATERIALS ------>
var grass = ['grass', 'dirt', 'grass_dirt'];
var dirt = ['dirt', 'dirt', 'dirt'];
var materials = [grass, dirt];

// <------ MAP ------>
var Map = require('./Map');
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


var createCreature = require('voxel-creature')(game);
var creature = createCreature((function() {
    var T = game.THREE;
    var body = new T.Object3D();

    var head = new T.Mesh(
        new T.CubeGeometry(10, 10, 10),
        new T.MeshLambertMaterial({
            color: 0x800830,
            ambient: 0x800830
        })
    );
    head.position.set(0, 5, 0);
    body.add(head);

    var eyes = [0, 1].map(function() {
        var eye = new T.Mesh(
            new T.CubeGeometry(1, 1, 1),
            new T.MeshLambertMaterial({
                color: 0xffffff,
                ambient: 0xffffff
            })
        );
        body.add(eye);
        return eye;
    });
    eyes[0].position.set(2, 8, 5);
    eyes[1].position.set(-2, 8, 5);

    return body;
})());

window.creature = creature;

creature.position.y = 2;
creature.position.x = 2;
creature.position.z = 2;
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
    // var position = positionME;
    // if (position) game.createBlock(positionYES, 1);
    // else game.setBlock(position, 0)
})


// <------ TICK ------>
game.setInterval(function() {
    map.growGrass(game);
}, 2000);