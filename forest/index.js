var Tree = require('voxel-forest');
module.exports = function(game) {
    this.treeArr = [];
    this.createForest = function(x,y,z) {
        var randCoords = function() {
            var randX = Math.floor(Math.random() * map.size) + 1;
            var randZ = Math.floor(Math.random() * map.size) + 1;
            var randH = Math.floor(Math.random() * map.size) + 4;
            if (treeArr.length) {
                for (var i = 0; i < treeArr.length; i++) {
                    if (treeArr[i][0] === randX || treeArr[i][1] === randZ) {
                        randCoords();
                    }
                    return [randX, randZ, randH];
                }
            }
            return [randX, randZ, randH];
        };
        var density = Math.floor(map.size / 5);

        for(var i = 0; i < density; i++) {
            var treePos = randCoords();
            treeArr.push(treePos);
            Tree(game, {
                position:{x: treePos[0], y:0, z:treePos[1]},
                height: treePos[2],
                bark: 3,
                leaves: 4,
                treeType: 'subspace'
            });
        }
    }
};
