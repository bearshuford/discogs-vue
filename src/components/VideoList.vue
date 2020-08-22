<template>
  <v-list :v-if="release.videos" two-line subheader>
    <v-subheader inset>videos</v-subheader>
    <v-list-item
      v-for="video in release.videos"
      :key="video.title"
      v-on:click="playPause({ video, release })"
    >
      <v-list-item-avatar tile>
        <v-img :src="video.thumb"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="video.title"></v-list-item-title>
        <v-list-item-subtitle v-text="video.description"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-play-arrow</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list>
</template>

<script>
export default {
  props: ["release"],
  methods: {
    playPause({ video, release }) {
      this.$emit("play-pause", {
        video,
        release: {
          releaseId: release.releaseId,
          artists: release.formattedArtists,
          title: release.title,
        },
      });
    },
  },
};
</script>
