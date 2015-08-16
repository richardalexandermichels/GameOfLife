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
    },
    elephant: {
        "voxels": {
            "-2|0|2": 5,
            "-2|1|2": 5,
            "-2|1|1": 5,
            "-2|1|0": 5,
            "-2|2|3": 5,
            "-1|2|3": 5,
            "0|2|3": 5,
            "1|2|3": 5,
            "2|2|3": 5,
            "0|2|4": 5,
            "0|3|4": 5,
            "0|4|4": 5,
            "-2|2|2": 5,
            "-1|2|2": 5,
            "0|2|2": 5,
            "1|2|2": 5,
            "2|2|2": 5,
            "2|1|2": 5,
            "2|1|1": 5,
            "2|1|0": 5,
            "2|1|-1": 5,
            "2|0|-1": 5,
            "-2|1|-1": 5,
            "-2|0|-1": 5,
            "2|2|1": 5,
            "1|2|1": 5,
            "0|2|1": 5,
            "-1|2|1": 5,
            "-2|2|1": 5,
            "-2|2|0": 5,
            "-1|2|0": 5,
            "0|2|0": 5,
            "1|2|0": 5,
            "2|2|0": 5,
            "2|2|-1": 5,
            "1|2|-1": 5,
            "0|2|-1": 5,
            "-1|2|-1": 5,
            "-2|2|-1": 5,
            "-2|3|3": 5,
            "-1|3|3": 5,
            "0|3|3": 5,
            "1|3|3": 5,
            "2|3|3": 5,
            "-3|3|3": 5,
            "-4|3|3": 5,
            "3|3|3": 5,
            "4|3|3": 5,
            "-4|4|3": 5,
            "-3|4|3": 5,
            "-1|4|3": 5,
            "0|1|4": 5,
            "0|1|5": 5,
            "0|5|4": 5,
            "1|4|3": 5,
            "0|4|3": 5,
            "3|4|3": 5,
            "4|4|3": 5,
            "3|5|3": 5,
            "4|5|3": 5,
            "0|5|3": 5,
            "-4|5|3": 5,
            "-3|5|3": 5,
            "4|6|3": 5,
            "3|6|3": 5,
            "2|6|3": 5,
            "1|6|3": 5,
            "0|6|3": 5,
            "0|6|4": 5,
            "-1|6|3": 5,
            "-2|6|3": 5,
            "-3|6|3": 5,
            "-4|6|3": 5,
            "-2|2|4": 4,
            "2|2|4": 4,
            "2|3|1": 5,
            "2|3|2": 5,
            "2|4|2": 5,
            "2|5|2": 5,
            "2|3|0": 5,
            "2|3|-1": 5,
            "1|3|-1": 5,
            "0|3|-1": 5,
            "-1|3|-1": 5,
            "-2|3|-1": 5,
            "1|3|2": 5,
            "1|4|2": 5,
            "1|4|1": 5,
            "1|3|1": 5,
            "1|3|0": 5,
            "0|3|1": 5,
            "0|3|0": 5,
            "-1|3|1": 5,
            "0|3|2": 5,
            "-1|3|2": 5,
            "-2|3|2": 5,
            "-2|3|1": 5,
            "-2|3|0": 5,
            "-1|3|0": 5,
            "2|4|1": 5,
            "2|4|0": 5,
            "2|4|-1": 5,
            "1|4|0": 5,
            "1|4|-1": 5,
            "0|4|-1": 5,
            "-1|4|-1": 5,
            "-2|4|-1": 5,
            "-2|4|0": 5,
            "-1|5|-1": 5,
            "0|4|0": 5,
            "-1|4|0": 5,
            "0|4|1": 5,
            "0|4|2": 5,
            "-1|4|2": 5,
            "-1|4|1": 5,
            "-2|4|1": 5,
            "-2|4|2": 5,
            "-2|5|2": 5,
            "-1|5|2": 5,
            "0|5|2": 5,
            "1|5|2": 5,
            "2|5|1": 5,
            "1|5|1": 5,
            "0|5|1": 5,
            "-1|5|1": 5,
            "-2|5|1": 5,
            "-2|5|0": 5,
            "-1|5|0": 5,
            "0|5|0": 5,
            "1|5|0": 5,
            "2|5|0": 5,
            "2|5|-1": 5,
            "1|5|-1": 5,
            "0|5|-1": 5,
            "-2|5|-1": 5,
            "0|4|-2": 5,
            "0|3|-2": 5,
            "0|2|-2": 2,
            "2|0|2": 5,
            "2|7|3": 5,
            "3|7|3": 5,
            "4|7|3": 5,
            "-2|7|3": 5,
            "-4|7|3": 5,
            "-3|7|3": 5,
            "2|4|3": 2,
            "-2|4|3": 2,
            "1|5|3": 5,
            "2|5|3": 5,
            "-1|5|3": 5,
            "-2|5|3": 5
        },
        "colors": [
            [
                0.1803921568627451,
                0.8,
                0.44313725490196076
            ],
            [
                0.20392156862745098,
                0.596078431372549,
                0.8588235294117647
            ],
            [
                0.20392156862745098,
                0.28627450980392155,
                0.3686274509803922
            ],
            [
                0.9019607843137255,
                0.49411764705882355,
                0.13333333333333333
            ],
            [
                0.9254901960784314,
                0.9411764705882353,
                0.9450980392156862
            ],
            [
                0.5568627450980392,
                0.6980392156862745,
                0.7254901960784313
            ]
        ],
        "bounds": [
            [-4, 0, -2],
            [
                4,
                7,
                5
            ]
        ]
    }
};

module.exports = shape;