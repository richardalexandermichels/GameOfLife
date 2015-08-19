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



##Basic File Structiure
##Creature (in folder 'creature')
index.js - the constructor for all creatures
render.js - three.js rendering for creatures
shape.js - a collection of objects for each creature's shape
BEHAVIOR (folder)
index.js - shared creature behaviors
Eating.js - eating behaviors (separate behaviors for herbivores and carnivores)
moveWorker.js - a web worker to handle movement calculations (saves us a few frames)
The creature constructor takes an object of options. 

##Forest
function and models for building a forest of trees (modded from npm module 'voxel-forest')
##Tree
functions and models for building trees (mostly modded code from npm module 'voxel-tree')

##root folder
index.js - building the game, rendering and placing initial generation of creatures
map.js - constructs an array of cell objects that correspond to the play field
moving-map.js ??? legacy code?