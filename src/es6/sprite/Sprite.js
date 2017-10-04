export class Sprite {
    constructor(spriteElement) {
        if (!spriteElement) {
            throw "No Sprite element specified!";
        }
        this.element = spriteElement;
        this.dimensions = {
            width: parseInt(this.element.style.width, 10),
            height: parseInt(this.element.style.height, 10)
        };
        this.coords = {
            x: parseInt(this.element.style.left, 10),
            y: parseInt(this.element.style.top, 10)
        };
    }

    setPosition(coords) {
        this.coords = coords;
    }

    moveBy(directions) {
        this.coords = {
            x: this.coords.x + directions.x,
            y: this.coords.y + directions.y
        };
    }

    moveTo(coords) {
        this.position = coords;
    }

    updateSprite() {

    }

    drawSprite() {
        this.element.style.left = this.coords.x + "px";
        this.element.style.top = this.coords.y + "px";
    }

    removeSprite() {
        this.element.parentNode.removeChild(this.element);
    }
}
