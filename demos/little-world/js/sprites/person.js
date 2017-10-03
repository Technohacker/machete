import {
    Machete,
    RigidBodySprite
} from "machete/index.js";

export class Person extends RigidBodySprite {
    constructor(keyboardInput) {
        super(Machete.getDOMElement(".person"));
        keyboardInput.registerListener({
            code: "ArrowLeft",
            down: event => this.applyForce({
                x: -0.1,
                y: 0
            }),
            up: event => {}
        });
        keyboardInput.registerListener({
            code: "ArrowRight",
            down: event => this.applyForce({
                x: 0.1,
                y: 0
            }),
            up: event => {}
        });
    }
}
