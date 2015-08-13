var Tree = require('../tree');
module.exports = function(game, opts) {
    if(opts.position === undefined) opts.position = {};
    if(!opts.position.x) opts.position.x = Math.floor(Math.random() * map.size) + 1;
    if(!opts.position.z) opts.position.z = Math.floor(Math.random() * map.size) + 1;
    if(!opts.densityScale) opts.densityScale = 5
    if(opts.treeType === undefined) opts.treeType = "subspace"
    if(opts.bark === undefined) throw "Must choose bark tile"
    if(opts.leaves === undefined) throw "Must choose leaves tile"
    var treeArr = [];
    var randCoords = function() {
        opts.position.x = Math.floor(Math.random() * map.size) + 1;
        opts.position.z = Math.floor(Math.random() * map.size) + 1;
        randH = Math.floor(Math.random() * map.size/2) + 3;
        if (treeArr.length) {
            for (var i = 0; i < treeArr.length; i++) {
                if (treeArr[i][0] === opts.position.x || treeArr[i][1] === opts.position.z) {
                    randCoords();
                }
                return [opts.position.x, opts.position.z, randH];
            }
        }
        return [opts.position.x, opts.position.z, randH];
    };
    var density = Math.floor(map.size / opts.densityScale);

    for(var i = 0; i < density; i++) {
        var treePos = randCoords();
        treeArr.push(treePos);
        if (opts.treeType === "random") {
            var treeTypeArr = ['subspace','guybrush', 'fractal']
            Tree(game, {
                position:{x: treePos[0], y:0, z:treePos[1]},
                height: treePos[2],
                bark: opts.bark,
                leaves: opts.leaves,
                treeType: treeTypeArr[Math.floor(Math.random() * treeTypeArr.length)]
        });
        }else{
            Tree(game, {
                position:{x: treePos[0], y:0, z:treePos[1]},
                height: treePos[2],
                bark: opts.bark,
                leaves: opts.leaves,
                treeType: opts.treeType
            });
        }
        map.getCell(treePos[0],treePos[1]).obstructed = true
    }
};
