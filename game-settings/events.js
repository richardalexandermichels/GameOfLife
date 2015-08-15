module.exports = function(game) {
    return function() {
        return setEvent(game);
    };
};

function moveRandomly(dir) {
    return Math.round(Math.random() * dir) - dir / 2
}

function step(animalPos, foodPos) {
    if (animalPos < foodPos) return 1;
    else if (animalPos > foodPos) return -1;
    else return 0;
}


//RULE: Logical Event to be set in HERE using the game.AddEvent
// => For Animation: Use Game.setInterval <=
function setEvent(game) {

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



    //<--------keep player from falling off!-------->
    window.addEventListener('keydown', function check() {
        var posX = player.position.x;
        var posZ = player.position.z;

        if (posX >= map.size - 1 || posX <= 1) player.position.set(map.size - 1, 1, posZ);
        if (posZ >= map.size - 1 || posZ <= 1) player.position.set(posX, 1, map.size - 1);
        setTimeout(check, 1000);
    });

    // <------ TICK ------>
    //Game.add Event takes a function that will be called at every 10 game time unit.
    game.addEvent(function() {
        map.growGrass(game);
    }, 10);

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

        spider.move(moveRandomly(1), 0, moveRandomly(1), map);
        creature.move(moveRandomly(1), 0, moveRandomly(1), map);
    }, 1);
}