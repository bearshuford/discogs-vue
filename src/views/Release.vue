<template>
  <v-container>
    <h2>{{release.title}}</h2>
    <h3>{{release.formattedArtists}}</h3>
    <videolist :release="release" v-on:play-pause="playPause"></videolist>
  </v-container>
</template>

<script>
import { fetcher, endpoints } from "../utils";
import VideoList from "../components/VideoList";

export default {
  props: ["releaseId"],
  data() {
    return {
      release: {},
    };
  },
  components: {
    videolist: VideoList,
  },
  mounted() {
    if (this.endpoint) this.getData();
  },
  computed: {
    endpoint: function() {
      return this.releaseId && endpoints.release(this.releaseId);
    },
  },
  watch: {
    endpoint: "getData",
  },
  methods: {
    async getData() {
      const release = await fetcher(this.endpoint);
      this.release = release;
    },
    playPause(video) {
      this.$emit("play-pause", video);
    },
  },
};
</script>
