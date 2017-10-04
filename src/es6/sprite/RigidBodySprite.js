import {
    Sprite
} from "./Sprite.js";

export class RigidBodySprite extends Sprite {
    constructor(spriteElement, world) {
        if (!window.Matter) {
            throw Error("Matter.js is not included!");
        }
        super(spriteElement);
        let attribs = {};
        for (let attribute of spriteElement.attributes) {
            attribs[attribute.name] = attribute.value;
        }

        let options = {
            label: attribs.name,
            restitution: (parseFloat(attribs.restitution) || 0),
            isStatic: !!attribs.static,
            friction: parseFloat(attribs.friction),
            angle: RigidBodySprite.getAngle(spriteElement.style.transform)
        };

        if (spriteElement.classList.contains("circle")) {
            // NOTE: I assume circular objects only. No elliptical objects
            this.rigidBody = Matter.Bodies.circle(
                (this.coords.x + (this.dimensions.width / 2)),
                (this.coords.y + (this.dimensions.height / 2)),
                (this.dimensions.width / 2), options
            );
        } else {
            this.rigidBody = Matter.Bodies.rectangle(
                (this.coords.x + (this.dimensions.width / 2)),
                (this.coords.y + (this.dimensions.height / 2)),
                this.dimensions.width,
                this.dimensions.height, options
            );
        }
        this.world = world;
    }

    setPosition(coords) {
        Matter.Body.setPosition(this.rigidBody, {
            x: coords.x + (this.dimensions.width / 2),
            y: coords.y + (this.dimensions.height / 2)
        });
    }

    setAngle(angle) {
        Matter.Body.setAngle(this.rigidBody, angle);
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

    removeSprite() {
        Matter.World.remove(this.world, this.rigidBody);
        super.removeSprite();
    }

    static getAngle(transform) {
        if (transform === "none") {
            return 0;
        }
        // Taken from https://css-tricks.com/get-value-of-css-rotation-through-javascript/
        let values = transform.split('(')[1].split(')')[0].split(','),
            a = values[0],
            b = values[1],
            scale = Math.sqrt(a * a + b * b);

        return Math.atan2(b, a);
    }
}
