module.exports = setEvent;

function moveRandomly(dir) {
    return Math.round(Math.random() * dir - dir / 2)
}

function setEvent(game, creatures) {
    var cow = creatures.cow[0];

    //Notified that an Creature is eating grass at position x,z
    game.on('eat', function(x, z) {
        console.log(x, z);
        map.empty(x, z);
    });

    //Creature is procreating
    game.on('procreate',function(x,z,type){
        console.log(type);
    });


    // //<--------keep player from falling off!-------->
    // window.addEventListener('keydown', function check() {
    //     var posX = player.position.x;
    //     var posZ = player.position.z;

    //     if (posX >= map.size - 1 || posX <= 1) player.position.set(map.size - 1, 1, posZ);
    //     if (posZ >= map.size - 1 || posZ <= 1) player.position.set(posX, 1, map.size - 1);
    //     setTimeout(check,1000);
    // });

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