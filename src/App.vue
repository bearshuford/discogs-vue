<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn to="/"  icon>
        <v-icon v-if="showBack">mdi-arrow-left</v-icon>
        <v-icon v-else>mdi-record-player</v-icon>
      </v-btn>
      <v-toolbar-title @click="$router.push('/')">
        {{ username }}'s Collection
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view
        username="vcr_headset"
        v-on:play-pause="playPause"
      ></router-view>
      <player
        :release="currentRelease"
        :video="currentVideo"
        :playing="isPlaying"
        :isOpen="isOpen"
        :progress="this.progress"
        v-on:play-pause="playPause"
      ></player>
      <youtube
        :video-id="currentVideo.id"
        ref="youtube"
        v-show="false"
        :player-vars="{ autoplay: 1 }"
        @playing="playing"
        @paused="paused"
      ></youtube>
    </v-main>
  </v-app>
</template>

<script>
import { Player } from "./components";
export default {
  name: "App",
  data() {
    return {
      username: "vcr_headset",
      video: {},
      release: {},
      isPlaying: false,
      time: "00:00",
      progress: 0,
      processId: null,
    };
  },
  components: {
    player: Player,
  },
  methods: {
    resetTime() {
      this.time = "00:00";
      this.progress = 0;
      this.processId = null;
    },
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    toggleVideo() {
      if (this.isPlaying) this.pauseVideo();
      else this.playVideo();
    },
    playPause(item) {
      const { video: selected, release: selectedRelease } = item || {};
      if (!selected || selected.id === this.currentVideo.id) this.toggleVideo();
      else {
        this.video = selected;
        this.release = selectedRelease;
        this.playVideo();
      }
    },
    async playing() {
      this.isPlaying = true;
      let totalTime = await this.player.getDuration();

      this.processId = setInterval(() => {
        this.player.getCurrentTime().then((time) => {
          let progress = (time / totalTime) * 100;

          this.progress = progress < 100 ? progress : 100;
          this.updateTime(time + 1);
        });
      }, 100);
    },

    updateTime(time) {
      time = Math.round(time);
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      this.time = minutes + ":" + seconds;
    },
    paused() {
      this.isPlaying = false;
      clearInterval(this.processId);
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    isOpen() {
      return this.video && this.video.title?.length > 0;
    },
    currentVideo() {
      return this.video;
    },
    currentRelease() {
      return this.release;
    },
    showBack() {
      return this.$route.path.length > 1;
    },
  },
};
</script>
