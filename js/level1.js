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
                        keyDown: (event) => this.applyForce({
                            x: 0,
                            y: -0.01
                        }),
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
                        density: 100
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

            World.add(this.engine.world, [this.player.rigidBody]);

            let position = Machete.getOffsetPosition(document.querySelector("#wall1"));

            var wallBodies = [
                Bodies.rectangle(position.left, position.top, position.width, position.height, {
                    isStatic: true,
                    element: document.querySelector("#wall1"),
                    width: position.width,
                    height: position.height
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
