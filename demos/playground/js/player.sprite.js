(function (window) {
    'use strict';
    var Machete = window.Machete;
    window.Player = function (element) {
        this.element = element;
        this.element.style.left = "0px";
        this.currX = 0;
        this.dX = 0;

        let keyCodes = Machete.inputManager.keyboard.keyCodes;
        Machete.inputManager.keyboard.onKeyPress(keyCodes.LEFT, event => {
            this.dX += -3;
        }, event => {
            this.dX += 3;
        });
        Machete.inputManager.keyboard.onKeyPress(keyCodes.RIGHT, event => {
            this.dX += 3;
        }, event => {
            this.dX += -3;
        });

        this.update = delta => {
            this.currX += this.dX;
        };
        this.act = () => {
            this.element.style.left = this.currX + "px";
        };
    }
}(window));
