(function (Machete) {
    'use strict';
    Machete.extend("scenes", {
        currentScene: null,
        scenes: {},
        init(scenes, activeScene) {
            this.scenes = scenes;
            this.currentScene = this.scenes[activeScene];
            this.currentScene.classList.add("active");
        },
        setActiveScene(sceneName) {
            this.currentScene.classList.remove("active");
            this.currentScene = this.scenes[sceneName];
            this.currentScene.classList.add("active");
        }
    });
}(window.Machete));
