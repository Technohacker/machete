export default class SoundFX {
    constructor(fxMap) {
        this.fxMap = fxMap;
    }

    playFX(fxName) {
        this.fxMap[fxName].play();
    }
}
