(function (Machete) {
    'use strict';
    Machete.extend("scenes", {
        currentScene: null,
        scenes: {},
        registerScene(sceneName, sceneObject) {
            this.scenes[sceneName] = sceneObject;
        },
        setActiveScene(sceneName) {
            if (!this.currentScene) {
                this.currentScene = this.scenes[sceneName];
            } else {
                this.currentScene.element.classList.remove("active");
                this.currentScene = this.scenes[sceneName];
            }
            this.currentScene.element.classList.add("active");
            this.currentScene.init();
        },
        updateScene(delta) {
            this.currentScene.update(delta);
        },
        drawScene() {
            this.currentScene.draw();
        }
    });
}(window.Machete));
