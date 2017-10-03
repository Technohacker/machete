export class Game {
    constructor(stageElement) {
        if (!stageElement) {
            throw "No stage element specified!";
        }
        this.stageElement = stageElement;
    }

    frame(currentTime) {
        this.requestID = window.requestAnimationFrame(currentTime => this.frame(currentTime));

        if (!this.prevTime) {
            this.prevTime = currentTime;
        }
        let delta = currentTime - this.prevTime;

        this.update(delta);
        this.draw(delta);

        this.prevTime = currentTime;
    }

    start() {
        window.requestAnimationFrame(currentTime => this.frame(currentTime));
    }

    stop() {
        window.cancelAnimationFrame(this.requestID);
    }
}
