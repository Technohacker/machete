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
