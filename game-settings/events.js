module.exports = function(game, creatures) {
    return function() {
        return setEvent(game, creatures);
    };
};


function moveRandomly(dir) {
    return Math.round(Math.random() * dir - dir / 2)
}

function step(animalPos, foodPos) {
    if (animalPos < foodPos) return 1;
    else if (animalPos > foodPos) return -1;
    else return 0;
}


//RULE: Logical Event to be set in HERE using the game.AddEvent
// => For Animation: Use Game.setInterval <=
function setEvent(game, creatures) {
    var cow = creatures.cow[0];

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
        map.growGrass(game)
    }, 10)


    game.addEvent(function() {
        var x = cow.position.x - 0.5;
        var z = cow.position.z - 0.5;

        if (!cow.food) cow.food = cow.findFood();
        if (cow.food && !cow.singleFood) {
            cow.singleFood = cow.food.shift();
            if (!cow.food.length) cow.food = false;
        }

        if (cow.moving && cow.food) {
            if (x === cow.singleFood.x && z === cow.singleFood.z) {
                cow.moving = false;
                cow.eating = true;
            } else cow.move(step(x, cow.singleFood.x), 0, step(z, cow.singleFood.z));
        }

        if (cow.moving && !cow.food) {
            cow.move(moveRandomly(2), 0, moveRandomly(2));
        }

        if (cow.eating) {
            cow.eat();
            cow.singleFood = false;
            cow.eating = false;
        }

        if (!cow.eating && !cow.moving) {
            if (!cow.food) {
                cow.move(moveRandomly(2), 0, moveRandomly(2));
                cow.moving = true;
            } else {
                cow.move(step(x, cow.singleFood.x), 0, step(z, cow.singleFood.z));
                cow.moving = true;
            }
        }

        spider.move(moveRandomly(2), Math.abs(moveRandomly(2)), moveRandomly(2), map)
        creature.move(moveRandomly(2), 0, moveRandomly(2), map)
    }, 1);
}