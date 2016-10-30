(function (window, Sprite, KeyboardInput) {
    'use strict';
    let element = document.querySelector("#player");
    window.Player = new Sprite(element, function () {
        let keys = KeyboardInput.keys;

        const DELTA = 3;

        this.delta = {
            x: 0,
            y: 0
        };

        KeyboardInput.registerInputHandlers([{
            key: keys.LEFT,
            keyDown: (event) => this.delta.x += -DELTA,
            keyUp: (event) => this.delta.x += DELTA
        }, {
            key: keys.RIGHT,
            keyDown: (event) => this.delta.x += DELTA,
            keyUp: (event) => this.delta.x += -DELTA
        }, {
            key: keys.UP,
            keyDown: (event) => {
                if (this.delta.y < 15) {
                    this.delta.y -= 3;
                } else {
                    this.delta.y = 0;
                }
            },
            keyUp: (event) => {
                if (this.delta.y > 0) {
                    this.delta.y += 3;
                } else {
                    this.delta.y = 0;
                }
            }
        }]);
    }, function (delta) {
        this.moveBy(this.delta);
    }, function () {

    });
}(window, window.Machete.sprite.Sprite, window.Machete.inputManager.keyboard));
