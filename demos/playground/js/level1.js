(function (window) {
    'use strict';
    const Sprite = window.Machete.sprite.Sprite;
    const KeyboardInput = window.Machete.inputManager.keyboard;
    const SceneManager = window.Machete.scenes;
    const DOMRenderer = window.Machete.matterjs;

    const Engine = window.Matter.Engine;
    const World = window.Matter.World;
    const Bodies = window.Matter.Bodies;
    const Body = window.Matter.Body;

    SceneManager.registerScene("level1", {
        element: Machete.querySelector("#level1"),
        init() {
            this.player = new Sprite(document.querySelector("#player"), function () {
                    this.jumpCount = 0;
                    let keys = KeyboardInput.keys;

                    KeyboardInput.registerInputHandlers([{
                        key: keys.LEFT,
                        keyDown: (event) => this.applyForce({
                            x: -0.01,
                            y: 0
                        }),
                        keyUp: (event) => {}
                    }, {
                        key: keys.RIGHT,
                        keyDown: (event) => this.applyForce({
                            x: 0.01,
                            y: 0
                        }),
                        keyUp: (event) => {}
                    }, {
                        key: keys.SPACE,
                        keyDown: (event) => {
                            if (this.jumpCount < 2) {
                                this.applyForce({
                                    x: 0,
                                    y: -0.01
                                });
                                this.jumpCount += 1;
                            }
                        },
                        keyUp: (event) => {}
                    }]);
                },
                () => {},
                () => {}, {
                    x: 220,
                    y: 150,
                    width: 20,
                    height: 20,
                    options: {
                        label: "Player",
                        restitution: 0.8
                    }
                });
            this.engine = Engine.create({
                world: World.create({
                    gravity: {
                        x: 0,
                        y: 1,
                        scale: 0.001
                    }
                })
            });
            Matter.Events.on(this.engine, "collisionActive", event => {
                if (event.pairs[0].bodyA.label === "Player" || event.pairs[0].bodyB.label === "Player") {
                    this.player.jumpCount = 0;
                }
            });

            World.add(this.engine.world, [this.player.rigidBody]);

            let wallBounds = [
                Machete.getOffsetPosition(document.querySelector("#ground")),
                Machete.getOffsetPosition(document.querySelector("#wall-left")),
                Machete.getOffsetPosition(document.querySelector("#wall-right")),
                Machete.getOffsetPosition(document.querySelector("#ceiling"))
            ]

            var wallBodies = [
                Bodies.rectangle(wallBounds[0].left, wallBounds[0].top, wallBounds[0].width, wallBounds[0].height, {
                    isStatic: true,
                    element: document.querySelector("#ground"),
                    width: wallBounds[0].width,
                    height: wallBounds[0].height,
                    restitution: 1
                }),
                Bodies.rectangle(wallBounds[1].left, wallBounds[1].top, wallBounds[1].width, wallBounds[1].height, {
                    isStatic: true,
                    element: document.querySelector("#wall-left"),
                    width: wallBounds[1].width,
                    height: wallBounds[1].height,
                    restitution: 1
                }),
                Bodies.rectangle(wallBounds[2].left, wallBounds[2].top, wallBounds[2].width, wallBounds[2].height, {
                    isStatic: true,
                    element: document.querySelector("#wall-right"),
                    width: wallBounds[2].width,
                    height: wallBounds[2].height,
                    restitution: 1
                }),
                Bodies.rectangle(wallBounds[3].left, wallBounds[3].top, wallBounds[3].width, wallBounds[3].height, {
                    isStatic: true,
                    element: document.querySelector("#ceiling"),
                    width: wallBounds[3].width,
                    height: wallBounds[3].height,
                    restitution: 0
                })
            ];

            World.add(this.engine.world, wallBodies);
        },
        update(delta) {
            this.player.update();
            Engine.update(this.engine, 1000 / 60);
        },
        draw() {
            DOMRenderer.world(this.engine);
        }
    });
}(window));
