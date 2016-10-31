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
            return new Game(stageElement, gameObj);
        },
        extend(pluginName, plugin) {
            Machete[pluginName] = plugin;
            return this;
        },
        querySelector: selector => {
            return window.document.querySelector(selector);
        },
        querySelectorAll: selector => {
            return window.document.querySelectorAll(selector);
        },
        getOffsetPosition(element) {
            let stagePos = this.stage.getBoundingClientRect();
            let elemPos = element.getBoundingClientRect();

            let scrollTop = window.scrollY;
            let scrollLeft = window.scrollX;

            let top = elemPos.top + scrollTop - stagePos.top;
            let left = elemPos.left + scrollLeft - stagePos.left;
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
        }
    }

    global.Machete = Machete;
}(window));

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

(function (Machete) {
    'use strict';
    Machete.extend("audio", {
        music: {
            currentIndex: 0,
            playlist: [],
            isPlaying: false,
            init(playlist) {
                this.playlist = playlist;
                return this;
            },
            play(shouldLoop) {
                let track = this.playlist[this.currentIndex].source;
                track.playbackRate = this.playlist[this.currentIndex].speed;

                if (!track) {
                    return;
                }

                track.onended = (event) => {
                    this.currentIndex += 1;
                    let currTrackObj = this.playlist[this.currentIndex];
                    if (!currTrackObj && shouldLoop) {
                        this.currentIndex = 0;
                        currTrackObj = this.playlist[this.currentIndex];
                        this.isPlaying = true;
                    } else if (currTrackObj) {
                        track = currTrackObj.source;
                        track.playbackRate = currTrackObj.speed;
                        this.isPlaying = true;
                        track.play();
                    } else {
                        this.isPlaying = false;
                    }
                };
                track.play();
            },
            pause() {
                console.log("Pause");
                this.isPlaying = false;
                this.playlist[this.currentIndex].source.pause();
            }
        }
    });
}(window.Machete));

(function (Machete) {
    'use strict';
    Machete.extend("constants", {
        input: {
            keys: Object.freeze({
                SPACE: "Space",
                LEFT: "ArrowLeft",
                UP: "ArrowUp",
                RIGHT: "ArrowRight",
                DOWN: "ArrowDown",
                PAGEUP: "PageUp",
                PAGEDOWN: "PageDown",
                A: "KeyA",
                B: "KeyB",
                C: "KeyC",
                D: "KeyD",
                E: "KeyE",
                F: "KeyF",
                G: "KeyG",
                H: "KeyH",
                I: "KeyI",
                J: "KeyJ",
                K: "KeyK",
                L: "KeyL",
                M: "KeyM",
                N: "KeyN",
                O: "KeyO",
                P: "KeyP",
                Q: "KeyQ",
                R: "KeyR",
                S: "KeyS",
                T: "KeyT",
                U: "KeyU",
                V: "KeyV",
                W: "KeyW",
                X: "KeyX",
                Y: "KeyY",
                Z: "KeyZ"
            })
        }
    });
}(Machete));

(function (Machete) {
    'use strict';
    Machete.extend("inputManager", {
        keyboard: {
            // TODO: Keep multiple key arrays for X-Browser compat
            keys: Machete.constants.input.keys,
            keyboardEvents: {},
            getCurrentKey(event) {
                // HACK: Quite a messy way of standardizing event values
                if (event.code) {
                    // Send the actual key code if it is available
                    return event.code;
                } else if (event.key) {
                    // Or convert the event.key value to a standard
                    if (event.key.length === 1) {
                        // One character string. Mostly letter keys
                        return "Key" + event.key.toUpperCase();
                    } else {
                        // Multichar strings. Mostly special keys
                        return event.key;
                    }
                    // TODO: Add numeric key processing
                }
            },
            registerInputHandlers(inputHandlerArr) {
                if (!inputHandlerArr) {
                    throw Error("No handlers passed to register!");
                }
                for (let keyHandler of inputHandlerArr) {
                    let {
                        key,
                        keyDown,
                        keyUp
                    } = keyHandler;
                    if (!this.keyboardEvents[key]) {
                        this.keyboardEvents[key] = {
                            activated: false,
                            listeners: {
                                keyDown: [],
                                keyUp: []
                            }
                        };
                    }
                    this.keyboardEvents[key].listeners.keyDown.push(keyDown);
                    this.keyboardEvents[key].listeners.keyUp.push(keyUp);
                }
            }
        }
    });
    document.addEventListener("keydown", event => {
        event.preventDefault();
        let currentKey = Machete.inputManager.keyboard.getCurrentKey(event),
            keyObj = Machete.inputManager.keyboard.keyboardEvents[currentKey];
        if (keyObj) {
            if (!keyObj.activated) {
                keyObj.activated = true;
                for (let keyDown of keyObj.listeners.keyDown) {
                    keyDown(event);
                }
            }
            return true;
        }
        return false;
    });
    document.addEventListener("keyup", event => {
        let currentKey = Machete.inputManager.keyboard.getCurrentKey(event),
            keyObj = Machete.inputManager.keyboard.keyboardEvents[currentKey];
        if (keyObj) {
            if (keyObj.activated) {
                keyObj.activated = false;
                for (let keyUp of keyObj.listeners.keyUp) {
                    keyUp(event);
                }
            }
            return true;
        }
    });
}(window.Machete));

(function (window) {
    'use strict';

    const Machete = window.Machete;
    const Composite = window.Matter.Composite;

    Machete.extend("matterjs", {
        world(engine) {
            let bodies = window.Matter.Composite.allBodies(engine.world);

            for (var body of bodies) {
                let element = body.element;

                element.style.width = `${body.width}px`;
                element.style.height = `${body.height}px`;
                element.style.top = `${body.bounds.min.y}px`;
                element.style.left = `${body.bounds.min.x}px`;
                element.style.transform = `rotate(${body.angle}rad)`;
            }
        }
    });
}(window));

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

(function (window) {
    'use strict';
    const Machete = window.Machete;
    const Bodies = window.Matter.Bodies;
    const Body = window.Matter.Body;

    Machete.extend("sprite", {
        Sprite: function (spriteElement, init, update, act, physics) {

            this.spriteInit = init;
            this.spriteUpdate = update;
            this.spriteAct = act;

            this.rigidBody = Bodies.rectangle(
                physics.x,
                physics.y,
                physics.width,
                physics.height,
                physics.other
            );

            Body.set(this.rigidBody, "element", spriteElement);
            Body.set(this.rigidBody, "width", physics.width);
            Body.set(this.rigidBody, "height", physics.height);


            this.applyForce = (force) => {
                Body.applyForce(this.rigidBody, {
                    x: this.rigidBody.position.x,
                    y: this.rigidBody.position.y
                }, force);
            }

            this.update = (delta) => {
                this.spriteUpdate(delta);
            };
            this.act = () => {
                this.spriteAct();
            };
            this.spriteInit();
        },
    });
}(window));
