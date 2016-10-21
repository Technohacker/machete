(function (global) {
    'use strict';
    Machete = {
        stage: null,
        init(stageElement) {
            if (!stage.className.includes("machete-stage")) {
                throw Error("Stage does not have the 'machete-stage' class!");
            }
            this.stage = stageElement;
            return this;
        },
        extend(pluginName, plugin) {
            Machete[pluginName] = plugin;
            return this;
        }
    }

    global.Machete = Machete;
}(window));
