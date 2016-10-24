(function (global) {
    'use strict';
    let Game = function (stageElement) {
        this.stageElement = stageElement;
        this.frame = ((currTime) => {
            global.requestAnimationFrame(this.frame);

            if (!this.prevTime) {
                this.prevTime = currTime;
            }
            let delta = currTime - this.prevTime;

            this.update(delta);
            this.draw(delta);

            this.prevTime = currTime;
        });
        this.start = (() => {
            this.init();
            global.requestAnimationFrame(this.frame);
        });
        this.stop = (() => {
            global.cancelAnimationFrame(this.frame);
        });
    };

    let Machete = {
        stage: null,
        init(stageElement) {
            if (!stageElement.className.includes("machete-stage")) {
                throw Error("Stage does not have the 'machete-stage' class!");
            }
            this.stage = stageElement;
            return new Game(stageElement);
        },
        extend(pluginName, plugin) {
            Machete[pluginName] = plugin;
            return this;
        }
    }

    global.Machete = Machete;
}(window));
