(function (Machete) {
    'use strict';
    Machete.extend("inputManager", {
        keyboard: {
            // TODO: Keep multiple key arrays for X-Browser compat
            keyCodes: Object.freeze({
                LEFT: "ArrowLeft",
                UP: "ArrowUp",
                RIGHT: "ArrowRight",
                DOWN: "ArrowDown",
                PAGEUP: "PageUp",
                PAGEDOWN: "PageDown",
                A: "a",
                B: "b",
                C: "c",
                D: "d",
                E: "e",
                F: "f",
                G: "g",
                H: "h",
                I: "i",
                J: "j",
                K: "k",
                L: "l",
                M: "m",
                N: "n",
                O: "o",
                P: "p",
                Q: "q",
                R: "r",
                S: "s",
                T: "t",
                U: "u",
                V: "v",
                W: "w",
                X: "x",
                Y: "y",
                Z: "z"
            }),
            keyboardEvents: {},
            onKeyPress(key, keyDown, keyUp) {
                if (!this.keyboardEvents[key]) {
                    this.keyboardEvents[key] = {
                        activated: false,
                        listeners: {
                            keyDown: [],
                            keyUp: []
                        }
                    };
                }
                this.keyboardEvents[key].listeners.keyDown.push(keyDown);
                this.keyboardEvents[key].listeners.keyUp.push(keyUp);
            }
        }
    });
    document.addEventListener("keydown", event => {
        let currentKey = Machete.inputManager.keyboard.keyboardEvents[event.key];
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
        let currentKey = Machete.inputManager.keyboard.keyboardEvents[event.key];
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
