<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      {{ username }}'s Collection
    </v-app-bar>

    <v-main>
      <router-view username="vcr_headset"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    username: "vcr_headset"
  })
};
</script>
