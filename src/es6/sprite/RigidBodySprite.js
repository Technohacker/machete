import {
    Sprite
} from "./Sprite.js";

export class RigidBodySprite extends Sprite {
    constructor(spriteElement) {
        if (!window.Matter) {
            throw Error("Matter.js is not included!");
        }
        super(spriteElement);
        let attribs = {};
        for (let attribute of spriteElement.attributes) {
            attribs[attribute.name] = attribute.value;
        }
        this.rigidBody = Matter.Bodies.rectangle(
            (this.coords.x + (this.dimensions.width / 2)),
            (this.coords.y + (this.dimensions.height / 2)),
            this.dimensions.width,
            this.dimensions.height, {
                label: attribs.name,
                restitution: parseFloat(attribs.restitution),
                isStatic: !!attribs.static
            }
        );
    }

    applyForce(force) {
        Matter.Body.applyForce(this.rigidBody, {
            x: this.rigidBody.position.x,
            y: this.rigidBody.position.y
        }, force);
    }

    updateSprite() {

    }

    drawSprite() {
        this.element.style.left = (this.rigidBody.position.x - (this.dimensions.width / 2)) + "px";
        this.element.style.top = (this.rigidBody.position.y - (this.dimensions.height / 2)) + "px";
        this.element.style.transform = `rotate(${this.rigidBody.angle}rad)`;
    }
}
