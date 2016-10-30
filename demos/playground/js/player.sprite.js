(function (window) {
    'use strict';

    const Sprite = window.Machete.sprite.Sprite;
    const KeyboardInput = window.Machete.inputManager.keyboard;
    const Bodies = window.Matter.Bodies;
    const Body = window.Matter.Body;

    let element = document.querySelector("#player");
    let style = window.getComputedStyle(element);
    window.Player = new Sprite(element, function () {
        let keys = KeyboardInput.keys;
        //Body.set(this.rigidBody, "element", element);
        /*
                const DELTA = 5;

                this.delta = {
                    x: 0,
                    y: 0
                };

                KeyboardInput.registerInputHandlers([{
                    key: keys.LEFT,
                    //            keyDown: (event) => this.delta.x -= DELTA,
                    keyDown: (event) => {
                        Body.applyForce(this.rigidBody, {
                            x: 0,
                            y: 0
                        }, {
                            x: DELTA,
                            y: 0
                        });
                    },
                    keyUp: (event) => {}
                }, {
                    key: keys.RIGHT,
                    keyDown: (event) => this.delta.x += DELTA,
                    keyUp: (event) => this.delta.x -= DELTA
                }, {
                    key: keys.UP,
                    keyDown: (event) => this.delta.y -= DELTA,
                    keyUp: (event) => this.delta.y += DELTA
                }, {
                    key: keys.DOWN,
                    keyDown: (event) => this.delta.y += DELTA,
                    keyUp: (event) => this.delta.y -= DELTA
                }]);
                */
    }, function (delta) {
        //this.moveBy(this.delta);
    }, function () {

    });
}(window));
