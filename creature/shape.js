var shape = {
    basic: function() {
        var T = game.THREE;
        var body = new T.Object3D();

        var head = new T.Mesh(
            new T.CubeGeometry(10, 10, 10),
            new T.MeshLambertMaterial({
                color: 0x800830,
                ambient: 0x800830
            })
        );
        head.position.set(0, 5, 0);
        body.add(head);

        var eyes = [0, 1].map(function() {
            var eye = new T.Mesh(
                new T.CubeGeometry(1, 1, 1),
                new T.MeshLambertMaterial({
                    color: 0xffffff,
                    ambient: 0xffffff
                })
            );
            body.add(eye);
            return eye;
        });
        eyes[0].position.set(2, 8, 5);
        eyes[1].position.set(-2, 8, 5);

        return body;
    },
    spider: function() {
        var T = game.THREE;

        var body = new T.Object3D;

        var abdomen = new T.Mesh(
            new T.CubeGeometry(10, 10, 10),
            new T.MeshLambertMaterial({
                color: 0x200830,
                ambient: 0x200830
            })
        );
        abdomen.position.set(0, 10, 0);
        body.add(abdomen);

        var head = new T.Mesh(
            new T.CubeGeometry(5, 5, 5),
            new T.MeshLambertMaterial({
                color: 0x200830,
                ambient: 0x200830
            })
        );
        head.position.set(0, 8, 7.5);
        body.add(head);

        var eyes = [0, 1].map(function() {
            var eye = new T.Mesh(
                new T.CubeGeometry(1, 1, 1),
                new T.MeshLambertMaterial({
                    color: 0xffffff,
                    ambient: 0xffffff
                })
            );
            body.add(eye);
            return eye;
        });
        eyes[0].position.set(1.5, 9, 10);
        eyes[1].position.set(-1.5, 9, 10);

        var legs = [];
        for (var side = 0; side <= 1; side++) {
            for (var i = 0; i < 4; i++) {
                var leg = new T.Object3D;
                leg.position.z = i * 1.5;
                leg.state = i % 2;
                leg.position.y = leg.state + 3;

                legs.push(leg);
                body.add(leg);

                var horiz = new T.Mesh(
                    new T.CubeGeometry(5, 1, 1),
                    new T.MeshLambertMaterial({
                        color: 0x200830,
                        ambient: 0x200830
                    })
                );
                horiz.position.x = 7.5 - side * 15;
                horiz.position.y = 4;
                leg.add(horiz);

                var vert = new T.Mesh(
                    new T.CubeGeometry(1, 5, 1),
                    new T.MeshLambertMaterial({
                        color: 0x200830,
                        ambient: 0x200830
                    })
                );
                vert.position.x = 10 - side * 20;
                vert.position.y = 1.5;
                leg.add(vert);
            }
        }
        setInterval(function() {
            legs.forEach(function(leg) {
                leg.state = !leg.state;
                leg.position.y = leg.state + 3;
            });
        }, 250);

        return body;
    },
    cow: function() {
        var T = game.THREE;
        var body = new T.Object3D();

        var abdomen = new T.Mesh(
            new T.CubeGeometry(10, 10, 15),
            new T.MeshLambertMaterial({
                color: 0xffffff,
                ambient: 0xffffff
            })
        );
        abdomen.position.set(0, 15, 0);
        body.add(abdomen);

        var head = new T.Mesh(
            new T.CubeGeometry(8, 8, 5),
            new T.MeshLambertMaterial({
                color: 0xffffff,
                ambient: 0xffffff
            })
        );
        head.position.set(0, 17, 10);
        body.add(head);

        var eyes = [0, 1].map(function() {
            var eye = new T.Mesh(
                new T.CubeGeometry(1, 1, 1),
                new T.MeshLambertMaterial({
                    color: 0x000000,
                    ambient: 0x000000
                })
            );
            body.add(eye);
            return eye;
        });
        eyes[0].position.set(1.5, 18, 12.5);
        eyes[1].position.set(-1.5, 18, 12.5);

        var legs = [0, 1, 2, 3].map(function() {
            var leg = new T.Mesh(
                new T.CubeGeometry(3, 8, 3),
                new T.MeshLambertMaterial({
                    color: 0xffffff,
                    ambient: 0xffffff
                })
            );
            body.add(leg);
            return leg;
        });

        legs[0].position.set(3.5, 9, 6);
        legs[1].position.set(-3.5, 6, 6);
        legs[2].position.set(-3.5, 9, -6);
        legs[3].position.set(3.5, 6, -6);

        var check = true;
        setInterval(function() {
            if (check) {
                check = false;
                legs.forEach(function(leg, index) {
                    if (index % 2) leg.position.y += 3;
                    else leg.position.y -= 3;
                });
            } else {
                check = true;
                legs.forEach(function(leg, index) {
                    if (index % 2) leg.position.y -= 3;
                    else leg.position.y += 3;
                });
            }
        }, 250);

        var snout = new T.Mesh(
            new T.CubeGeometry(9, 5, 6),
            new T.MeshLambertMaterial({
                color: 0xff99ff,
                ambient: 0xff99ff
            })
        );
        snout.position.set(0, 14.5, 10.5);
        body.add(snout);

        var nostrils = [0, 1].map(function() {
            var nostril = new T.Mesh(
                new T.CubeGeometry(2, 2, 1),
                new T.MeshLambertMaterial({
                    color: 0x000000,
                    ambient: 0x000000
                })
            );
            body.add(nostril);
            return nostril;
        });
        nostrils[0].position.set(2.5, 14.5, 13.5);
        nostrils[1].position.set(-2.5, 14.5, 13.5);

        var antennae = [0, 1].map(function() {
            var antenna = new T.Mesh(
                new T.CubeGeometry(1.5, 4, 1.5),
                new T.MeshLambertMaterial({
                    color: 0x999999,
                    ambient: 0x999999
                })
            );
            body.add(antenna);
            return antenna;
        });
        antennae[0].position.set(2.5, 23, 11);
        antennae[1].position.set(-2.5, 23, 11);

        var ears = [0, 1].map(function() {
            var ear = new T.Mesh(
                new T.CubeGeometry(3, 3, 1.5),
                new T.MeshLambertMaterial({
                    color: 0x000000,
                    ambient: 0x000000
                })
            );
            body.add(ear);
            return ear;
        });
        ears[0].position.set(5.5, 18.5, 10);
        ears[1].position.set(-5.5, 18.5, 10);

        var tail = new T.Mesh(
            new T.CubeGeometry(2, 5, 1.5),
            new T.MeshLambertMaterial({
                color: 0x999999,
                ambient: 0x999999
            })
        );
        tail.position.set(0, 16, -8.25);
        body.add(tail);

        return body;
    }
};

module.exports = shape;