function Map(n) {
    this.size = n;
    this.data = [];
    this.fertilized = [];
    this.createMap(n);
    this.setNeighbors();
}

Map.prototype.createMap = function(n) {
    //Instanciate world Array 10X10 map
    //Instanciate all map to dirt;
    for (var x = 0; x <= n; x++) {
        if (!this.data[x]) this.data[x] = new Array(n);
        for (var z = 0; z <= n; z++) {
            this.data[x][z] = new Cell(x, z);
        }
    }
};

Map.prototype.setNeighbors = function() {
    var self = this;
    this.data.forEach(function(column) {
        column.forEach(function(cell) {
            for (var x = cell.x - 1; x <= cell.x + 1; x++) {
                for (var z = cell.z - 1; z <= cell.z + 1; z++) {
                    if ((cell.x == x || cell.z == z) && (!(cell.x == x && cell.z == z))) {
                        var neighbor = self.getCell(x, z);
                        if (neighbor) cell.neighbors.push(neighbor);
                    }
                }
            }
        });
    });
};


Map.prototype.getCell = function(x, z) {
    if (x >= 0 && x <= this.size && z >= 0 && z <= this.size) {
        return this.data[x][z];
    } else {
        return false;
    }
};
Map.prototype.getMaterial = function(x, z) {
    return this.data[x][z].material === "dirt" ? 2 : 1; //Need to modify so that it's not hard coded
};


Map.prototype.fertilize = function(x, z) {
    // z is optional, if want to pass in multiple cells, 
    // pass in 2d array as x, otherwise pass in coordinates 
    // individually
    // check if fertilizing a whole patch or just one cell
    if (Array.isArray(x)) {
        // x is 2d array of coordinates [[x1,z1],[x2,z2]]
        x.forEach(function(cell) {
            this.fertilized.push(this.data[cell[0]][cell[1]]);
        });
    } else {
        // x and z are individual coords
        this.fertilized.push(this.data[x][z]);
    }
};

Map.prototype.growGrass = function(game) {
    var nextRound = [];
    this.fertilized.forEach(function(cell) {
        cell.setMaterial("grass");
        game.setBlock(cell.coordinate, 1); // 1 = grass
        cell.neighbors.forEach(function(neighbor) {
            if (neighbor.material !== "grass") {
                if (Math.random() > 0.9)
                    nextRound.push(neighbor);
                else nextRound.push(cell);
            }
        });
    });

    //replace fertilized with the next round
    this.fertilized = nextRound;
};

function Cell(x, z, material) {
    this.material = material || "dirt";
    this.coordinate = [x, 0, z];
    this.neighbors = [];
    this.x = x;
    this.y = 0;
    this.z = z;
}

Cell.prototype.setMaterial = function(material) {
    this.material = material;
};

Cell.prototype.getCoordinate = function() {
    return [x, y, z];
};
module.exports = Map;