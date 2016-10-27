(function (Machete) {
    'use strict';
    Machete.extend("assetManager", {
        assetList: [],
        assetCache: {},
        init(assetList) {
            this.assetList = assetList;
            return this;
        },
        start() {
            return new Promise((resolve, reject) => {
                let loadedCount = 0;
                let onLoadHandler = ((resolve, reject) => {
                    this.assetCache[assetInfo.name] = load;
                    loadedCount += 1;
                    if (loadedCount === this.assetList.length) {
                        resolve();
                    }
                });

                for (var assetInfo of this.assetList) {
                    console.log(assetInfo);
                    switch (assetInfo.type) {
                    case "image":
                        var load = new Image();
                        load.onLoad = () => onLoadHandler(resolve, reject);
                        load.src = assetInfo.href;
                        break;
                    case "audio":
                        // TODO: Multiple format support
                        var load = document.createElement("audio");
                        load.oncanplaythrough = () => onLoadHandler(resolve, reject);
                        load.src = assetInfo.href;
                        break;
                    default:
                        reject(new Error("Unknown Asset Type: " + assetInfo.type));
                    }
                }
            });
        },
        get(assetName) {
            return this.assetCache[assetName];
        }
    });
}(window.Machete));
