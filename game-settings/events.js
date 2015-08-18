module.exports = function(game, creatures) {
    return function() {
        return setEvent(game, creatures);
    };
};


// function step(animalPos, foodPos) {
//     if (animalPos < foodPos) return 1;
//     else if (animalPos > foodPos) return -1;
//     else return 0;
// }


//RULE: Logical Event to be set in HERE using the game.AddEvent
// => For Animation: Use Game.setInterval <=
function setEvent(game, creatures) {
    // var cow = creatures.cow[0];

    //Notified that an Creature is eating grass at position x,z
    game.on('eat', function(x, z) {
        // console.log(x, z);
        map.empty(x, z);
    });

    //Creature is procreating
    game.on('procreate', function(x, z, type) {
        console.log(type);
    });
    game.on('speed', function() {
        console.log(game.speed);
    });

    game.on('speed2', function() {
        console.log(speed);
    });



    // <------ TICK ------>
    //Game.add Event takes a function that will be called at every 10 game time unit.
    game.addEvent(function() {
        map.growGrass(game);
    }, 10);
    
    map.creatures.forEach(function(creature){
        game.addEvent(function(){
            creature.exist();
        }, creature.speed, creature.item.avatar.id);
    });
}