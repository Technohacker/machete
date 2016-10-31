(function (window) {
    'use strict';

    window.Matter.DOM = {
        render(engine) {
            let bodies = window.Matter.Composite.allBodies(engine.world);
            for (var body of bodies) {
                let element = body.element;
                element.style.top = `${body.position.y}px`;
                element.style.left = `${body.position.x}px`;
                element.style.transform = `rotate(${body.angle}rad)`;
            }
        }
    };
}(window));
