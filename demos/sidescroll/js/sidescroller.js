(function (Machete) {
    'use strict';

    window.scroll(0, 0);

    const Sprite = Machete.sprite.Sprite;
    const KeyboardInput = Machete.inputManager.keyboard;
    const DOMRenderer = window.Machete.matterjs;

    const Engine = window.Matter.Engine;
    const World = window.Matter.World;
    const Bodies = window.Matter.Bodies;
    const Body = window.Matter.Body;

    window.game = Machete.init(Machete.querySelector(".machete-stage"), {
        init() {
            this.player = new Sprite(document.querySelector("#player"), function () {
                    this.jumpCount = 0;
                    let keys = KeyboardInput.keys;

                    KeyboardInput.registerInputHandlers([{
                        key: keys.LEFT,
                        keyDown: (event) => this.applyForce({
                            x: -0.02,
                            y: 0
                        }),
                        keyUp: (event) => {}
                    }, {
                        key: keys.RIGHT,
                        keyDown: (event) => this.applyForce({
                            x: 0.02,
                            y: 0
                        }),
                        keyUp: (event) => {}
                    }, {
                        key: keys.SPACE,
                        keyDown: (event) => {
                            if (this.jumpCount < 2) {
                                this.applyForce({
                                    x: 0,
                                    y: -0.02
                                });
                                this.jumpCount += 1;
                            }
                        },
                        keyUp: (event) => {}
                    }]);
                },
                () => {},
                () => {}, {
                    x: 40,
                    y: 40,
                    width: 30,
                    height: 30,
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

            let ground = Machete.getOffsetPosition(document.querySelector("#ground"));

            World.add(this.engine.world, Bodies.rectangle(ground.left, ground.top, ground.width, ground.height, {
                isStatic: true,
                element: document.querySelector("#ground"),
                width: 5000,
                height: 30,
                restitution: 1
            }));

            World.add(this.engine.world, [this.player.rigidBody]);
        },
        update(delta) {
            this.player.update();
            Engine.update(this.engine, 1000 / 60);
        },
        draw() {
            DOMRenderer.world(this.engine);
            window.scrollBy(1, 0);
        }
    });
})(window.Machete);
