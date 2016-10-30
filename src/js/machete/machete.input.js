(function (Machete) {
    'use strict';
    Machete.extend("inputManager", {
        keyboard: {
            // TODO: Keep multiple key arrays for X-Browser compat
            keys: Machete.constants.input.keys,
            keyboardEvents: {},
            getCurrentKey(event) {
                // HACK: Quite a messy way of standardizing event values
                if (event.code) {
                    // Send the actual key code if it is available
                    return event.code;
                } else if (event.key) {
                    // Or convert the event.key value to a standard
                    if (event.key.length === 1) {
                        // One character string. Mostly letter keys
                        return "Key" + event.key.toUpperCase();
                    } else {
                        // Multichar strings. Mostly special keys
                        return event.key;
                    }
                    // TODO: Add numeric key processing
                }
            },
            registerInputHandlers(inputHandlerArr) {
                if (!inputHandlerArr) {
                    throw Error("No handlers passed to register!");
                }
                for (let keyHandler of inputHandlerArr) {
                    let {
                        key,
                        keyDown,
                        keyUp
                    } = keyHandler;
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
        }
    });
    document.addEventListener("keydown", event => {
        event.preventDefault();
        let currentKey = Machete.inputManager.keyboard.getCurrentKey(event),
            keyObj = Machete.inputManager.keyboard.keyboardEvents[currentKey];
        if (keyObj) {
            if (!keyObj.activated) {
                keyObj.activated = true;
                for (let keyDown of keyObj.listeners.keyDown) {
                    keyDown(event);
                }
            }
            return true;
        }
        return false;
    });
    document.addEventListener("keyup", event => {
        let currentKey = Machete.inputManager.keyboard.getCurrentKey(event),
            keyObj = Machete.inputManager.keyboard.keyboardEvents[currentKey];
        if (keyObj) {
            if (keyObj.activated) {
                keyObj.activated = false;
                for (let keyUp of keyObj.listeners.keyUp) {
                    keyUp(event);
                }
            }
            return true;
        }
    });
}(window.Machete));
