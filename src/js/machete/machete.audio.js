(function (Machete) {
    'use strict';
    Machete.extend("audio", {
        music: {
            currentIndex: 0,
            playlist: [],
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
                    let currTrackObj = this.playlist[this.currentIndex];
                    if (!currTrackObj && shouldLoop) {
                        this.currentIndex = 0;
                        currTrackObj = this.playlist[this.currentIndex];
                    } else if (currTrackObj) {
                        track = currTrackObj.source;
                        track.playbackRate = currTrackObj.speed;
                        track.play();
                    } else {
                        this.pause();
                    }
                };
                track.play();
            }
        }
    });
}(window.Machete));
