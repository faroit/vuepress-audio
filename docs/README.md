# Hello Waveform Playlist

<ClientOnly>
<MultiTrack :urls="tracklist"></MultiTrack>
</ClientOnly>

<script>
export default {
  computed: {
    tracklist: function () {
      var trackstoload = []
      trackstoload.push(
            { 'name': "vocals",
              'solo': false,
              'mute': false,
              'file': "public/other.m4a"
            },
            { 'name': "drums",
              'solo': false,
              'mute': false,
              'file': "public/other.m4a"
            }

      )

      return trackstoload
    }
  }
}
</script>
