export class Game {
    frame(currentTime) {
        this.requestID = window.requestAnimationFrame(this.frame);

        if (!this.prevTime) {
            this.prevTime = currentTime;
        }
        let delta = currentTime - this.prevTime;

        this.update(delta);
        this.draw(delta);

        this.prevTime = currentTime;
    }

    start() {
        this.init();
        window.requestAnimationFrame(this.frame);
    }

    stop() {
        window.cancelAnimationFrame(this.requestID);
    }
}
