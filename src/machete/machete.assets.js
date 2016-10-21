(function (Machete) {
    'use strict';
    Machete.extend("assetManager", {
        assetList: [],
        assetCache: {},
        init(assetList) {
            this.assetList = assetList;
        },
        start() {
            return new Promise(function (resolve, reject) {
                let loadedCount = 0;
                let onLoadHandler = ((resolve, reject) => {
                    this.assetCache[assetInfo.name] = load;
                    loadedCount += 1;
                    if (loadedCount === this.assetList.length) {
                        resolve(this.assetCache);
                    }
                });

                for (var assetInfo in this.assetList) {
                    if (object.hasOwnProperty(assetInfo)) {
                        switch (assetInfo.type) {
                        case "image":
                            var load = new Image();
                            load.onLoad = (() => onLoadHandler(resolve, reject));
                            load.src = assetInfo.href;
                            break;
                        default:
                            reject(new Error("Unknown Asset Type: " + assetInfo.type));
                        }
                    }
                }
            });
        },
        get(assetName) {
            return this.assetCache[assetName];
        }
    });
}(window.Machete));
