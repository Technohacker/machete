(function (window, Sprite) {
    'use strict';
    let element = document.querySelector("#player");

    window.Player = new Sprite(element, function () {
        let keys = Machete.inputManager.keyboard.keys;

        const DELTA = 3;

        this.delta = {
            x: 0,
            y: 0
        };

        Machete.inputManager.keyboard.onKeyPress(keys.LEFT, event => {
            this.delta.x += -DELTA;
        }, event => {
            this.delta.x += DELTA;
        });

        Machete.inputManager.keyboard.onKeyPress(keys.RIGHT, event => {
            this.delta.x += DELTA;
        }, event => {
            this.delta.x += -DELTA;
        });
    }, function (delta) {
        this.moveBy(this.delta);
    }, function () {

    });
}(window, window.Machete.sprite.Sprite));
