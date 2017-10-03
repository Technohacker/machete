export class ResourceManager {
    constructor(resourceList) {
        this.resourceList = resourceList;
    }

    start() {
        return new Promise((resolve, reject) => {
            let loadedCount = 0;
            let onLoadHandler = (resourceInfo, load) => {
                this.resourceList[resourceInfo.name] = load;
                loadedCount += 1;
                if (loadedCount === this.resourceList.length) {
                    resolve();
                }
            };

            this.resourceList.forEach(resourceInfo => {
                switch (resourceInfo.type) {
                case "image":
                    var load = new Image();
                    load.onLoad = () => onLoadHandler(resourceInfo, load);
                    load.src = resourceInfo.href;
                    break;
                case "audio":
                    // TODO: Multiple format support
                    var load = document.createElement("audio");
                    load.oncanplaythrough = () => onLoadHandler(resourceInfo, load);
                    load.src = resourceInfo.href;
                    break;
                case "tilemap":
                    var load = {
                        data: {},
                        image: new Image()
                    };
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", () => {
                        load.data = JSON.parse(xhr.responseText);
                        var img = new Image();
                        img.onload = () => {
                            load.image = img;
                            onLoadHandler(resourceInfo, load);
                        };
                        img.src = load.data.image;
                    });
                    xhr.open("GET", resourceInfo.href);
                    xhr.send();
                    break;
                default:
                    reject(`Unknown Asset Type. Name: ${resourceInfo.name} Type: ${resourceInfo.type}`);
                }
            });
        });
    }

    getAsset(assetName) {
        return this.resourceList[assetName];
    }
}
