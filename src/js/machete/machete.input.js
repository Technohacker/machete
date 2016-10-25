(function (Machete) {
    'use strict';
    Machete.extend("inputManager", {
        keyboard: {
            keyCodes: Object.freeze({
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                PAGEUP: 33,
                PAGEDOWN: 34,
                A: 65,
                B: 66,
                C: 67,
                D: 68,
                E: 69,
                F: 70,
                G: 71,
                H: 72,
                I: 73,
                J: 74,
                K: 75,
                L: 76,
                M: 77,
                N: 78,
                O: 79,
                P: 80,
                Q: 81,
                R: 82,
                S: 83,
                T: 84,
                U: 85,
                V: 86,
                W: 87,
                X: 88,
                Y: 89,
                Z: 90
            }),
            keyboardEvents: {},
            onKeyPress(keyCode, keyDown, keyUp) {
                if (!this.keyboardEvents[keyCode]) {
                    this.keyboardEvents[keyCode] = {
                        activated: false,
                        listeners: {
                            keyDown: [],
                            keyUp: []
                        }
                    };
                }
                this.keyboardEvents[keyCode].listeners.keyDown.push(keyDown);
                this.keyboardEvents[keyCode].listeners.keyUp.push(keyUp);
            }
        }
    });
    document.addEventListener("keydown", event => {
        let currentKey = Machete.inputManager.keyboard.keyboardEvents[event.which];
        if (currentKey) {
            if (!currentKey.activated) {
                currentKey.activated = true;
                for (let keyDown of currentKey.listeners.keyDown) {
                    keyDown(event);
                }
            }
            return true;
        }
        return false;
    });
    document.addEventListener("keyup", event => {
        let currentKey = Machete.inputManager.keyboard.keyboardEvents[event.which];
        if (currentKey) {
            if (currentKey.activated) {
                currentKey.activated = false;
                for (let keyUp of currentKey.listeners.keyUp) {
                    keyUp(event);
                }
            }
        }
    });
}(window.Machete));
