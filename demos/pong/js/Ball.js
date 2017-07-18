import {
    Sprite,
    Machete
} from "machete/index.js";

export class Ball extends Sprite {
    constructor(element) {
        super(element);
        this.stageElement = Machete.getDOMElement(".machete-stage");
        this.delta = {
            x: 0,
            y: 0
        };
    }

    setDelta(delta) {
        this.delta = delta;
    }

    updateSprite() {
        let {x, y} = this.coords,
            {width, height} = this.stageElement.style;

        [width, height] = [parseInt(width, 10), parseInt(height, 10)]
        if (x <= 0 || x >= width) {
            this.delta.x = -this.delta.x;
        }
        if (y <= 0 || y >= height) {
            this.delta.y = -this.delta.y;
        }
        this.moveBy(this.delta);
    }
}
