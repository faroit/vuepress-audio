import * as WaveformPlaylist from 'waveform-playlist'

var Player = function (refs) {
    console.log(refs)
    this.playlist = WaveformPlaylist.init({
        samplesPerPixel: 1400,
        waveHeight: 80,
        container: document.getElementById("playlist"),
        timescale: true,
        mono: true,
        exclSolo: false,
        state: 'cursor',
        colors: {
            waveOutlineColor: 'white'
        },
        controls: {
            show: false, //whether or not to include the track controls
            width: 160 //width of controls in pixels
        },
        zoomLevels: [1400]
    });
}

Player.prototype.loadTargets = function (trackurls) {
    this.playlist.getEventEmitter().emit('stop')
    this.playlist.tracks = []
    var tracksToLoad = []
    for (let track of trackurls) {
        tracksToLoad.push(
            {
                "src": "other.m4a",
                "name": track.name,
                "muted": track.mute,
                "soloed": track.solo,
            }
        );
    }
    this.playlist.load(tracksToLoad);
}

Player.prototype.addTrack = function (track) {

    this.playlist.load([
        {
            "src": "other.m4a",
            "name": track.name,
            "muted": track.mute,
            "soloed": track.solo,
        }
    ])
}

export default Player
