export class Machete {
    // TODO: Implement polyfills

    /**
     * Utility function to get an element from the DOM.
     * It is needed because everytime we get an element from the DOM,
     * we reset its style to make sure code works as needed.
     * @param  string selector      CSS selector
     * @return Element              Selected element
     */
    static getDOMElement(selector) {
        return Machete.resetStyles(document.querySelector(selector));
    }

    static resetStyles(element) {
        let style = window.getComputedStyle(element);
        element.style.left = style.left;
        element.style.top = style.top;
        element.style.width = style.width;
        element.style.height = style.height;
        element.style.transform = style.transform;
        return element;
    }
}
