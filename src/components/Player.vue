<template>
  <div class="text-center">
    <v-bottom-sheet
      ref="player"
      inset
      hide-overlay
      :value="show"
      :retain-focus="false"
      no-click-animation
      persistent
    >
      <v-card tile>
        <v-progress-linear
          :value="this.currentProgress"
          class="my-0"
          height="4"
        ></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                v-text="currentVideo.title"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="subtitle"></v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon v-on:click="playPause">
                <v-icon>{{ isPlaying ? "mdi-pause" : "mdi-play" }}</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ml-0"
              :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
            >
              <v-btn icon>
                <v-icon>mdi-skip-next</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <youtube
          v-show="false"
          ref="youtube"
          :video-id="currentVideo.id"
          :player-vars="{ autoplay: 1, playsinline: 1 }"
          @playing="onPlay"
          @paused="paused"
          @ready="ready"
        ></youtube>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      loaded: false,
      time: "00:00",
      progress: 0,
      processId: null,
      showVideo: false,
    };
  },
  methods: {
    ...mapActions(["play", "pause"]),
    ready() {
      this.loaded = true;
    },
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    toggleShowVideo() {
      this.showVideo = !this.showVideo;
    },
    playPause() {
      if (this.isPlaying) this.pauseVideo();
      else this.playVideo();
    },
    updateTime(time) {
      time = Math.round(time);
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      this.time = minutes + ":" + seconds;
    },
    async onPlay() {
      this.play();
      let totalTime = await this.player.getDuration();
      this.processId = setInterval(() => {
        this.player.getCurrentTime().then((time) => {
          let progress = (time / totalTime) * 100;
          this.progress = progress < 100 ? +progress.toFixed(3) : 100;
          this.updateTime(time + 1);
        });
      }, 100);
    },
    paused() {
      this.pause();
      clearInterval(this.processId);
    },
  },
  computed: {
    ...mapState(["video", "release", "isPlaying"]),
    isOpen() {
      return this.video && this.video.title?.length > 0;
    },
    player() {
      return this.$refs.youtube.player;
    },
    show: function() {
      return this.isOpen;
    },
    currentVideo: function() {
      return this.video;
    },
    currentProgress: function() {
      return this.progress;
    },
    subtitle: function() {
      const { title, artists } = this.release;
      return `${title} - ${artists}`;
    },
  },
  watch: {
    //https://github.com/vuetifyjs/vuetify/issues/6495#issuecomment-663547354
    show() {
      this.$nextTick(() => {
        this.$refs.player.showScroll();
      });
    },
    // isPlaying: function(play) {
    //   if (play) this.player.playVideo();
    //   else this.player.pauseVideo();
    // },
    loaded: "playVideo",
  },
};
</script>
