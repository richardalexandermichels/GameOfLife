//voxel-engine: base module
var createGame = require('voxel-engine');

var grass = ['grass', 'dirt', 'grass_dirt'];
var dirt = ['dirt','dirt','dirt'];

var materials= [grass, dirt];

//Instanciate world Array 10X10 map
var worldArray =[];
for(var x= 0; x<=10; x++){
  worldArray[x] = new Array(10);
}

//Instanciate all map to dirt;
for(var x= 0; x<=10; x++){
  for(var y=0 ; y<=10;y++){
    worldArray[x][y] = new Cell("dirt");
  }
}

//set 1X1 to be grass;
worldArray[1][1].material="grass";

function color(x,y,z){
  return worldArray[x][z]["material"]==="dirt" ? 2 : 1;
}



function Cell(material) {
  this.material = material;
  // this.neighbor = [//cells];
}

var game = createGame({
    generate: function(x,y,z){
      return (y === 0 && x>=0 && x<=10 && z>=0 && z<=10) ? color(x,y,z) : 0;
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
var container = document.body;
game.appendTo(container);

return game;