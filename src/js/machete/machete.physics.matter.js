(function (window) {
    'use strict';

    const Machete = window.Machete;
    const Composite = window.Matter.Composite;

    Machete.extend("matterjs", {
        world(engine) {
            let bodies = window.Matter.Composite.allBodies(engine.world);

            for (var body of bodies) {
                let element = body.element;

                element.style.width = `${body.width}px`;
                element.style.height = `${body.height}px`;
                element.style.top = `${body.bounds.min.y}px`;
                element.style.left = `${body.bounds.min.x}px`;
                element.style.transform = `rotate(${body.angle}rad)`;
            }
        }
    });
}(window));
