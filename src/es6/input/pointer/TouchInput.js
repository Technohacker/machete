export class TouchInput {
    constructor() { }

    registerListener(options) {
        if (options.start) {
            options.element.addEventListener("touchstart", options.start);
        }
        if (options.stop) {
            options.element.addEventListener("touchend", options.stop);
        }
        if (options.click) {
            options.element.addEventListener("click", options.click);
        }
    }
}
