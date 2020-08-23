<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn to="/" icon>
        <v-icon v-if="showBack">mdi-arrow-left</v-icon>
        <v-icon v-else>mdi-record-player</v-icon>
      </v-btn>
      <v-toolbar-title @click="$router.push('/')">
        {{ username }}'s Collection
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view username="vcr_headset"></router-view>
      <player></player>
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
    };
  },
  components: {
    player: Player,
  },
  computed: {

    showBack() {
      return this.$route.path.length > 1;
    },
  },
};
</script>
