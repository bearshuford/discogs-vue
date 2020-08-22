<template>
  <div class="text-center">
    <v-bottom-sheet
      ref="player"
      inset
      hide-overlay
      :value="show"
      :retain-focus="false"
      persistent
    >
      <v-card tile>
        <v-progress-linear
          :value="this.currentProgress"
          class="my-0"
          height="3"
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
              <v-btn icon v-on:click="$emit('play-pause')">
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
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: { video: Object, release: Object, playing: Boolean, isOpen: Boolean, progress: Number },
  computed: {
    show: function() {
      return this.isOpen;
    },
    isPlaying: function() {
      return this.playing;
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
  },
};
</script>
