(function (window) {
    'use strict';
    var Machete = window.Machete;
    window.Player = function (element) {
        this.element = element;
        this.element.style.left = "0px";

        let keyCodes = Machete.inputManager.keyboard.keyCodes;
        Machete.inputManager.keyboard.onKeyPress(keyCodes.LEFT, event => {
            this.dX = -10;
        });
        Machete.inputManager.keyboard.onKeyPress(keyCodes.RIGHT, event => {
            this.dX = 10;
        });

        this.update = delta => {
            this.currX = parseInt(this.element.style.left) + this.dX;
            this.dX = 0;
        };
        this.act = () => {
            this.element.style.left = this.currX + "px";
        };
    }
}(window));
