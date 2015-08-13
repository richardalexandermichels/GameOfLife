function Creature(){}
Creature.prototype.jump = function(x) {
  if (x === undefined) x = 1;
  this.move(0, x, 0);
};
Creature.prototype.move = function(x, y, z) {
    var xyz = parseXYZ(x, y, z);
    this.position.x += xyz.x;
    this.position.y += xyz.y;
    this.position.z += xyz.z;
};

Creature.prototype.lookAt = function(obj) {
  var a = obj.position || obj;
  var b = this.position;

  this.item.yaw.rotation.y = Math.atan2(a.x - b.x, a.z - b.z) + Math.random() * 1 / 4 - 1 / 8;
};

Creature.prototype.notice = function(target, opts) {
  var self = this;
  if (!opts) opts = {};
  if (opts.radius === undefined) opts.radius = 500;
  if (opts.collisionRadius === undefined) opts.collisionRadius = 25;
  if (opts.interval === undefined) opts.interval = 1000;
  var pos = target.position || target;

  return setInterval(function() {
    var dist = self.position.distanceTo(pos);
    if (dist < opts.collisionRadius) {
      self.emit('collide', target);
    }

    if (dist < opts.radius) {
      self.noticed = true;
      self.emit('notice', target);
    } else {
      self.noticed = false;
      self.emit('frolic', target);
    }
  }, opts.interval);
};

Creature.prototype.setPosition = function(x, y, z) {
  this.position.y = y;
  this.position.x = x;
  this.position.z = z;
};


module.exports = Creature;