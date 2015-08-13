module.exports = function(game) {
    return function(type) {
        return setEvent(game);
        // return new Creature(game, type, opts); // If we wanted to include options later
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

function setEvent(game) {

    //Notified that an Creature is eating grass at position x,z
    game.on('eat', function(x, z) {
        console.log(x, z);
        map.empty(x, z);
    });

    //Creature is procreating
    game.on('procreate',function(x,z,type){
        console.log(type);
    });

    // <------ TICK ------>
    game.setInterval(function() {
        map.growGrass(game);
    }, 10000);
    game.setInterval(function() {
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
            } else cow.move(step(x, cow.singleFood.x), 0, step(z, cow.singleFood.z))
        }

        if (cow.moving && !cow.food) {
            cow.move(moveRandomly(2), 0, moveRandomly(2))
        }

        if (cow.eating) {
            cow.eat();
            cow.singleFood = false;
            cow.eating = false;
        }

        if (!cow.eating && !cow.moving) {
            if (!cow.food) {
                cow.move(moveRandomly(2), 0, moveRandomly(2))
                cow.moving = true;
            } else {
                cow.move(step(x, cow.singleFood.x), 0, step(z, cow.singleFood.z))
                cow.moving = true;
            }
        }

        spider.move(moveRandomly(1), 0, moveRandomly(1), map)
        creature.move(moveRandomly(1), 0, moveRandomly(1), map)
    }, 1000);
}