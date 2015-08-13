var highlight = require('voxel-highlight')
var highlighter = highlight(game)
var positionME;
highlighter.on('highlight', function(voxelPosArray) {
    positionME = voxelPosArray
})
highlighter.on('highlight-adjacent', function(voxelPosArray) {
    positionYES = voxelPosArray
})

var blocks = []
for (var i = 0; i < 50; i++) {
    if (i % 4 === 0) blocks.push(i)
}
var time = 0;
var posxArr = [];
var step = 0;
for (var j = 0; j < 11; j++) posxArr.push(0);
game.on('tick', function(delta) {
    time++;
    if (time % 50 === 0) {
        step++;
        if (step === 1) {
            blocks.forEach(function(i) {
                game.setBlock([i, 4, i], 0)
                posxArr[i / 4]++;
                game.createBlock([i + posxArr[i / 4], 4, i], 1)
            })
        }
        if (step === 2) {
            blocks.forEach(function(i) {
                game.setBlock([i + posxArr[i / 4], 4, i], 0)
                game.createBlock([i + posxArr[i / 4], 4, i + posxArr[i / 4]], 1)
            })
        }
        if (step === 3) {
            blocks.forEach(function(i) {
                game.setBlock([i + posxArr[i / 4], 4, i + posxArr[i / 4]], 0)
                game.createBlock([i, 4, i + posxArr[i / 4]], 1)
            })
        }
        if (step === 4) {
            blocks.forEach(function(i) {
                game.setBlock([i, 4, i + posxArr[i / 4]], 0)
                posxArr[i / 4]--;
                game.createBlock([i, 4, i], 1)
            })
            step = 0;
        }
    }
})

game.on('fire', function(pos) {
    var position = positionME;
    if (position) game.createBlock(positionYES, 1);
    else game.setBlock(position, 0)
})


//Create trees
// var createTree = require('voxel-forest')
// // Create some trees.
// for (var i = 0; i < 25; i++) {
// createTree(game, {bark: 2, leaves: 3});
// }