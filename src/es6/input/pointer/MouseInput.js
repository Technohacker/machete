export class MouseInput {
    constructor() { }

    registerListener(options) {
        if (options.start) {
            options.element.addEventListener("mousedown", options.start);
        }
        if (options.stop) {
            options.element.addEventListener("mouseup", options.stop);
        }
        if (options.click) {
            options.element.addEventListener("click", options.click);
        }
        if (options.hover) {
            options.element.addEventListener("mouseover", options.hover);
        }
    }
}
