export class KeyboardManager {
    constructor() {
        this.keyEventHandlers = {};
        document.addEventListener("keydown", event => {
            event.preventDefault();
            if (this.keyEventHandlers[event.code]) {
                this.keyEventHandlers[event.code].keyDown.forEach(callback => callback(event));
            }
            return false;
        });
        document.addEventListener("keyup", event => {
            if (this.keyEventHandlers[event.code]) {
                this.keyEventHandlers[event.code].keyUp.forEach(callback => callback(event));
            }
            return false;
        });
    }

    registerListener(key) {
        if (!this.keyEventHandlers[key.code]) {
            this.keyEventHandlers[key.code] = {
                keyDown: [],
                keyUp: []
            }
        }
        this.keyEventHandlers[key.code].keyDown.push(key.down);
        this.keyEventHandlers[key.code].keyUp.push(key.up);
    }
}
