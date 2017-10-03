export class MouseInput {
    constructor() { }

    registerListener(options) {
        if (options.mousedown) {
            options.element.addEventListener("mousedown", options.mousedown);
        }
        if (options.mouseup) {
            options.element.addEventListener("mouseup", options.mouseup);
        }
        if (options.click) {
            options.element.addEventListener("click", options.click);
        }
        if (options.mouseover) {
            options.element.addEventListener("mouseover", options.mouseover);
        }
    }
}
