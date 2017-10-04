import {
    Machete,
    RigidBodySprite
} from "machete/index.js";

export class Cannon extends RigidBodySprite {
    constructor(pointerInput, world) {
        let element = Machete.getDOMElement(".cannon"),
            angle = document.querySelector("input[name='angle']");

        super(element, world);

        angle.addEventListener("change", e => this.setAngle(angle.value * (Math.PI / 180)));

        let startTime;

        pointerInput.registerListener({
            element,
            start: event => {
                event.preventDefault();
                startTime = Date.now()
            },
            stop: event => {
                event.preventDefault();
                this.launchProjectile(-(Math.PI / 180) * (90 - angle.value), (Date.now() - startTime)/500);
            }
        });
        this.projectileNum = 0;
        this.projectiles = {};
    }

    launchProjectile(angle, force) {
        let projectile = document.createElement("button");

        // Give it a name
        projectile.setAttribute("name", `projectile${this.projectileNum}`);
        projectile.setAttribute("friction", "1");

        // Make it a sprite
        projectile.classList.add("sprite");

        // Give it a position and angle
        projectile.style.bottom = "100px";
        projectile.style.left = "50px";
        projectile.style.transform = `rotate(${angle}rad)`;

        // Add some text
        projectile.innerText = "BOOM!";

        // Add it to the stage
        document.querySelector(".machete-stage").appendChild(projectile);

        // Reset the projectile element styles
        projectile = Machete.resetStyles(projectile);

        // Add a RigidBody with some force
        let rigidBodySprite = new RigidBodySprite(projectile, this.world);

        Matter.World.add(this.world, rigidBodySprite.rigidBody);
        this.projectiles[`projectile${this.projectileNum}`] = rigidBodySprite;

        rigidBodySprite.applyForce({
            x: Math.cos(angle) * force * 0.1,
            y: Math.sin(angle) * force * 0.1
        });

        this.projectileNum += 1;

        setTimeout(() => {
            rigidBodySprite.removeSprite();
            delete this.projectiles[rigidBodySprite.rigidBody.name];
            rigidBodySprite = null;
        }, 5000);
    }

    updateSprite(delta) {
        super.updateSprite(delta);
        for (var projectile in this.projectiles) {
            if (this.projectiles.hasOwnProperty(projectile)) {
                this.projectiles[projectile].updateSprite(delta);
            }
        }
    }

    drawSprite() {
        super.drawSprite();
        for (var projectile in this.projectiles) {
            if (this.projectiles.hasOwnProperty(projectile)) {
                this.projectiles[projectile].drawSprite();
            }
        }
    }
}
