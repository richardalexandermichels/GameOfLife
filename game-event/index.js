module.exports = setEvent;

function moveRandomly(dir) {
    return Math.round(Math.random() * dir - dir / 2)
}

function setEvent(game, creatures) {
    var cow = creatures.cow[0];

    //Notified that an animal is eating grass at position x,z
    game.on('eat', function(x, z) {
        console.log(x, z);
        map.empty(x, z);
    });

    // <------ TICK ------>
    game.setInterval(function() {
        map.growGrass(game);
    }, 10000);
    game.setInterval(function() {
        cow.exist();
        spider.move(moveRandomly(2), Math.abs(moveRandomly(2)), moveRandomly(2), map)
        creature.move(moveRandomly(2), 0, moveRandomly(2), map)
    }, 1000);
}