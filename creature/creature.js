module.exports = function (game) {
    return function (obj, opts) {
        return new Creature(game, obj, opts);
    };
};