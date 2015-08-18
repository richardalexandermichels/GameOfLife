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
for(var i = 0; i < map.data.length; i++){
  for(var j = 0; j < map.data.length; j++){
    map.fertilize(i,j)
  }
}
// map.fertilize(5, 5); //initial fertilized voxel; grass will grow at after 10 seconds;

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
map.growGrass(game)

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


//<----------Forest-------------------->
var Forest = require('./forest')(game, {
    bark: 3,
    leaves: 4,
    densityScale: 2,
    treeType: 'subspace'
});



// <------ SKY ------>
var createSky = require('./sky')({
    game: game,

    // starting time of the day
    // time: 2400,

    // size of the sky
    size: game.worldWidth() * 2,
    // how fast the sky rotates
    speed: 0.1

});
var sky = createSky();
game.on('tick', sky);

// <------ CLOUDS ------>
var clouds = require('voxel-clouds')({
  // pass a copy of the game
  game: game,

  // how high up the clouds should be from the player
  high: 10,

  // the distance from the player the clouds should repeat
  distance: 100,

  // how many clouds to generate
  many: 25,

  // how fast the clouds should move
  speed: 0.01,

  // material of the clouds
  material: new game.THREE.MeshBasicMaterial({
    emissive: 0xffffff,
    shading: game.THREE.FlatShading,
    fog: false,
    transparent: true,
    opacity: 0.5,
  }),
});

// <------ CREATURE ------>
map.creatures = []; //all creatures
var render = require('./creature/render.js');
var Creature = require('./creature/index.js');

var cow = new Creature({
  name: 'cow',
  size: 8,
  vision: 3
});
window.cow = cow; //for debugging
map.creatures.push(cow);

// var basic = new Creature({
//   name: 'basic',
//   size: 2,
//   vision: 3
// });
// window.basic = basic; //for debugging
// map.creatures.push(basic);


// var spider = new Creature({
//   name: 'spider',
//   size: 3,
//   vision: 5
// });
// window.spider = spider; //for debugging
// map.creatures.push(spider);

// var elephant = new Creature({
//   name: 'elephant',
//   size: 10,
//   vision: 3
// });
// window.elephant = elephant; //for debugging
// map.creatures.push(elephant);

// var giraffe = new Creature({
//   name: 'giraffe',
//   size: 7,
//   vision: 5
// });
// window.giraffe = giraffe; //for debugging
// map.creatures.push(giraffe);

// var fox = new Creature({
//   name: 'fox',
//   size: 3,
//   vision: 5
// });
// window.fox = fox; //for debugging
// map.creatures.push(fox);

// var lion = new Creature({
//   name: 'lion',
//   size: 6,
//   vision: 6
// });
// window.lion = lion; //for debugging
// map.creatures.push(lion);

// var turtle = new Creature({
//   name: 'turtle',
//   size: 1,
//   vision: 2
// });
// window.turtle = turtle; //for debugging
// map.creatures.push(turtle);

// var penguin = new Creature({
//   name: 'penguin',
//   size: 2,
//   vision: 3
// });
// window.penguin = penguin; //for debugging
// map.creatures.push(penguin);

// var deer = new Creature({
//   name: 'deer',
//   size: 5,
//   vision: 3
// });
// window.deer = deer; //for debugging
// map.creatures.push(deer);

// var chick = new Creature({
//   name: 'chick',
//   size: 1,
//   vision: 1
// });
// window.chick = chick; //for debugging
// map.creatures.push(chick);

var wildDog = new Creature({
  name: 'wildDog',
  size: 4,
  vision: 5,
  isHerbivore: false
});
window.wildDog = wildDog; //for debugging
map.creatures.push(wildDog);

// var crocodile = new Creature({
//   name: 'crocodile',
//   size: 4,
//   vision: 3
// });
// window.crocodile = crocodile; //for debugging
// map.creatures.push(crocodile);

// var beaver = new Creature({
//   name: 'beaver',
//   size: 2,
//   vision: 2
// });
// window.beaver = beaver; //for debugging
// map.creatures.push(beaver);

// var pigeon = new Creature({
//   name: 'pigeon',
//   size: 1,
//   vision: 3
// });
// window.pigeon = pigeon; //for debugging
// map.creatures.push(pigeon);

// var duck = new Creature({
//   name: 'duck',
//   size: 2,
//   vision: 3
// });
// window.duck = duck; //for debugging
// map.creatures.push(duck);

map.creatures.forEach(function(creature){
    render(creature, map);
});

//<---- CONVERT TOOL --->
var convert = require('voxel-critter').Convert();
convert.readImage('./duck.png', function(err, hash) {
  var data = convert.toVoxels(hash);
  window.png = data;
  // data now contains the voxels, colors, and bounds
});




// on tick, move the clouds
game.on('tick', clouds.tick.bind(clouds));

//<----- HIGHLIGHT HELPER ------>
var highlight = require('voxel-highlight');
var highlighter = highlight(game);
var positionME;
highlighter.on('highlight', function(voxelPosArray) {
    positionME = voxelPosArray;
});


//<----- GAME EVENT ------>
var setEvent = require('./game-settings/events.js')(game, map.creatures);
setEvent();
