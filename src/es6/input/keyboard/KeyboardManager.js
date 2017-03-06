export default class KeyboardManager {
    constructor(keyEventHandlers) {
        this.keyEventHandlers = keyEventHandlers;

        document.addEventListener("keydown", event => {
            event.preventDefault();

            let keyObj = Machete.inputManager.keyboard.keyboardEvents[event.code];
            if (keyObj) {
                if (!keyObj.activated) {
                    keyObj.activated = true;
                    keyObj.listeners.keyDown.forEach(keyDown => keyDown(event));
                }
                return true;
            }
            return false;
        });
        document.addEventListener("keyup", event => {
            event.preventDefault();

            let keyObj = Machete.inputManager.keyboard.keyboardEvents[event.code];
            if (keyObj) {
                if (keyObj.activated) {
                    keyObj.activated = false;
                    keyObj.listeners.keyDown.forEach(keyUp => keyUp(event));
                }
                return true;
            }
            return false;
        });
    }
}
