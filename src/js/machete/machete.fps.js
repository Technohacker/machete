(function (document, Machete) {
    'use strict';
    Machete.extend("fpsCounter", {
        fps: 0.0,
        fpsCounterElement: null,
        init(fpsElement) {
            fpsElement.classList.add("fps-wrapper");

            let fpsText = document.createElement("span");
            fpsText.innerHTML = "FPS: ";

            let fpsCounter = document.createElement("span");
            this.fpsCounterElement = fpsCounter;

            fpsElement.appendChild(fpsText);
            fpsElement.appendChild(fpsCounter);
        },
        tick(delta) {
            this.fps = (1000 / delta);
            this.fpsCounterElement.innerHTML = parseInt(this.fps, 10);
        }
    });
}(document, window.Machete))
