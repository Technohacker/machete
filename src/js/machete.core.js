(function (global) {
    'use strict';
    let Game = function (stageElement, gameObj) {
        this.stageElement = stageElement;

        this.init = gameObj.init;
        this.update = gameObj.update;
        this.draw = gameObj.draw;

        this.frame = currTime => {
            global.requestAnimationFrame(this.frame);

            if (!this.prevTime) {
                this.prevTime = currTime;
            }
            let delta = currTime - this.prevTime;

            this.update(delta);
            this.draw(delta);

            this.prevTime = currTime;
        };
        this.start = () => {
            this.init();
            global.requestAnimationFrame(this.frame);
        };
        this.stop = () => {
            global.cancelAnimationFrame(this.frame);
        };
    };

    let Machete = {
        stage: null,
        init(stageElement, gameObj) {
            if (!stageElement.classList.contains("machete-stage")) {
                throw Error("Stage does not have the 'machete-stage' class!");
            }
            this.stage = stageElement;
            this.stage.requestFullscreen = this.stage.requestFullscreen ||
                this.stage.webkitRequestFullscreen ||
                this.stage.mozRequestFullScreen ||
                this.stage.msRequestFullscreen ||
                function () {
                    throw Error("Browser not supported!")
                };

            return new Game(stageElement, gameObj);
        },
        extend(pluginName, plugin) {
            Machete[pluginName] = plugin;
            return this;
        },
        querySelector: selector => window.document.querySelector(selector),
        querySelectorAll: selector => window.document.querySelectorAll(selector),
        getOffsetPosition(element) {
            let stagePos = this.stage.getBoundingClientRect();
            let elemPos = element.getBoundingClientRect();

            let scrollTop = window.scrollY;
            let scrollLeft = window.scrollX;

            let top = (elemPos.top + scrollTop - stagePos.top) + (elemPos.height / 2);
            let left = (elemPos.left + scrollLeft - stagePos.left) + (elemPos.width / 2);
            let bottom = stagePos.height - (top + elemPos.height);
            let right = stagePos.width - (left + elemPos.width);
            let width = elemPos.width;
            let height = elemPos.height;

            return {
                top,
                left,
                bottom,
                right,
                width,
                height
            };
        },
        fullScreenStage() {
            if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozmozFullScreenElement || document.msFullscreenElement)) {
                this.stage.requestFullscreen();
            }
        },
        exitFullscreen: () => {
            return (document.exitFullscreen ||
                document.webkitExitFullscreen ||
                document.mozCancelFullScreen ||
                document.msExitFullscreen).call(document);
        }
    }

    global.Machete = Machete;
}(window));
