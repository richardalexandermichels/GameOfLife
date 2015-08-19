# Game-of-Life-2.0

##Contributors
- [Richard Michels](https://github.com/richardalexandermichels)
- [Justin Kim](https://github.com/jkim430)
- [Pete Steele](https://github.com/celanajaya)
- [Yves Yuen](https://github.com/justYves)

##Time
At 1X speed, a second IRL equals to 4 minutes IG.
1 day ig = 1 month ig

|IG      | 1x            | 2X            | 4X    |
|--------| :------------- |:-------------:| -----:|
| 1 day  | 6 m     | 3m | 90s |
| 1 month| 6 m      | 3m     |   90s|
| 1 year| 1h12m| 36m    |    18m |


##Creature
The creature constructor takes an object of options. The name property must correspond to a shape in the shape.js file.
The default entries are size and vision. Other creature properties are: isAlive, Carnivore, Herbivore, intelligence, social, memory, food, hunger, pregnant, position and rotation. In order to be visible on the map, any new instance of a creature must have the "render" function called on it (that function takes the instance and the map).
