module.exports = function(game) {
    return function(type) {
        return setEvent(game);
        // return new Creature(game, type, opts); // If we wanted to include options later
    };
};

function setEvent(game) {

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
        cow.move(moveRandomly(1), 0, moveRandomly(1), map)
    }, 1000);
}