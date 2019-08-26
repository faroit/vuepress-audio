<template>
  <div id='player'>
    <div>
      <div class="column is-narrow" ref="playbutton">
        <span class="icon">
          <i class="fa fa-keyboard"></i>
        </span>

        <span class="buttons">
          <a class="button is-success"
            v-bind:class="{ 'is-active': isPlaying, 'is-disabled': isLoading }"
            v-on:click='playpause'><span v-bind:class="isPlaying ? 'fa fa-pause' : 'fa fa-play' "></span>
          </a>
          <a class="button is-danger"
            v-bind:class="{ 'is-disabled': isLoading }"
            v-on:click='stop'><span class="fa fa-stop"></span></a>
        </span>
      </div>
    </div>
    <div id="playlist"></div>
  </div>
</template>

<script>
import fontawesome from 'font-awesome/css/font-awesome.min.css'
import Mousetrap from 'mousetrap'
import player from './player.js'


export default {
  name: "MultiTrack",
  props: {
    urls: Array,
    title: String,
  },
  data: function () {
    return {
      isPlaying: false,
      isLoading: false,
      player: Object,
      loaderColor: 'orange',
      loaderHeight: '26px',
      playbackPosition: 0,
      lastplaybackPosition: 0
    }
  },
  mounted: function () {
    Mousetrap.bind('3', this.playpause )
    this.player = new player();
    this.player.playlist.getEventEmitter().on('audiosourcesloaded', this.audioLoaded);
    this.player.playlist.getEventEmitter().on('timeupdate', this.updateTime);
    this.update_tracks();
  },
  beforeDestroy: function () {
    Mousetrap.unbind('3');
    for (var i = 0; i < this.player.playlist.tracks.length; ++i) {
      (function (i) {
      Mousetrap.unbind(String(i + 1));
      })(i);
    }
    this.stop();
    delete this.player;
  },
  methods: {
    update_tracks: function () {
      if(this.isLoading != true) {
        this.saveState()
        this.stop()
        this.isLoading = true
        this.player.loadTargets(this.urls)
        for (var i = 0; i < this.urls.length; ++i) {
            (function (i, e) {
                Mousetrap.bind(String(i + 1), function () {
                  e.player.playlist.getEventEmitter().emit('solo', e.player.playlist.tracks[i])
                });
                Mousetrap.bind(['ctrl+' + String(i + 1), 'meta+' + String(i + 1)], function () {
                  e.player.playlist.getEventEmitter().emit('mute', e.player.playlist.tracks[i])
                });
            })(i, this)
          }
        }
    },
    addTrack: function (url) {
      this.isLoading = true
      this.player.addTrack(url)
    },
    saveState: function () {
      this.lastplaybackPosition = this.playbackPosition
    },
    playpause: function (event) {
      if (this.isPlaying) {
        this.player.playlist.getEventEmitter().emit('pause')
      }
      else {
        this.player.playlist.getEventEmitter().emit('play')
        this.player.playlist.getEventEmitter().on('finished', this.stop);
      }
      this.isPlaying = ! this.isPlaying
      event.stopPropagation();
      return false;
    },
    stop: function () {
      this.player.playlist.getEventEmitter().emit('stop')
      this.isPlaying = false
    },
    toggleMode: function () {
      this.$emit('toggleMode', "foo")
    },
    audioLoaded: function () {
      this.$nextTick(() => this.$refs.playbutton.focus())
      this.isLoading = false
    },
    updateTime: function (playbackPosition) {
      this.playbackPosition = playbackPosition
    },

  },
  watch: {
    urls: {
      handler: 'update_tracks',
      deep: true
    },
  }
}
</script>

<style>


.playlist-tracks .mix header {
  background-color: black;
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  color: black;
}

.playlist-tracks .vocals header {
  color: white;
  background-color: #56B4E9;
  position: absolute;
}

.playlist-tracks .accompaniment header {
  color: white;
  background-color: #818181;
}

.playlist-tracks .drums header {
  color: white;
  background-color: #009E73;
}

.playlist-tracks .bass header {
  color: white;
  background-color: #D55E00;
}

.playlist-tracks .other header {
  color: white;
  background-color: #CC79A7;
}

.playlist .channel-wrapper .controls .btn {
    margin-left: 4px;
}

.playlist .channel-wrapper .controls .btn-solo.active {
    background-color: orange!important;
}

.playlist .channel-wrapper .controls .btn-mute {
    display: none !important;
}

.playlist {
  margin: 0em 0;
  width: 100%;
}
 .playlist .playlist-time-scale {
    height: 30px; }
 .playlist .playlist-tracks {
    background: transparent; }
 .playlist .channel {
    background: grey; }
 .playlist .channel-progress {
    background: orange; }
 .playlist .cursor {
    background: black; }
 .playlist .wp-fade {
    background-color: rgba(0, 0, 0, 0.1); }
 .playlist .state-cursor,
 .playlist .state-select {
    cursor: text; }
 .playlist .state-fadein {
    cursor: w-resize; }
 .playlist .state-fadeout {
    cursor: e-resize; }
 .playlist .state-shift {
    cursor: ew-resize; }
 .playlist .selection.point {
    background: #00d1b2; }
 .playlist .selection.segment {
    background: rgba(0, 0, 0, 0.1); }
 .playlist .channel-wrapper.silent .channel {
    opacity: 0.3; }

</style>
