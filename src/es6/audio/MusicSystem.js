export default class MusicSystem {
    constructor(playlist) {
        this.currentTrack = null;
        this.playlist = playlist;
        this.isPlaying = false;
    }

    playTrack(trackName) {
        this.currentTrack = this.playlist[trackName];
        this.currentTrack.play();
        this.isPlaying = true;
    }

    pause() {
        this.currentTrack.pause();
        this.isPlaying = false;
    }
}
