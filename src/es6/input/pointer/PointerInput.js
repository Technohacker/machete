import {
    TouchInput
} from "./TouchInput.js";
import {
    MouseInput
} from "./MouseInput.js";

export class PointerInput {
    constructor() {
        this.symbol = Symbol("touchSupported");
        let inputHandler;
        if (PointerInput.isTouchSupported()) {
            inputHandler = new TouchInput();
        } else {
            inputHandler = new MouseInput();
        }
        this.registerListener = inputHandler.registerListener;
    }

    static isTouchSupported() {
        // Taken from http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
        if (window[this.symbol] !== undefined) {
            return window[this.symbol];
        }
        let el = document.createElement('div'),
            events = ["ontouchstart", "ontouchend", "ontouchcancel", "ontouchmove"],
            isSupported = true;

        events.forEach(event => {
            if (!(event in el)) {
                isSupported = false;
            }
        });

        if (!isSupported) {
            events.forEach(event => {
                el.setAttribute(event, 'return;');
                if (typeof el[event] !== 'function') {
                    isSupported = false;
                }
            });
        }
        el = null;
        return isSupported;
    }
}
