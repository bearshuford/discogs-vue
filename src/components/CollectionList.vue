<template>
    <v-list two-line subheader :nav="isNav">
        <v-list-item
          v-for="release in collection"
          :key="release.id"
          :to="`${'/' + release.id}`"
        >
          <v-list-item-avatar tile>
            <v-img :src="release.thumb"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="release.title"></v-list-item-title>
            <v-list-item-subtitle v-text="release.formattedArtists"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-list-item-action-text v-if="release.year" v-text="release.year"></v-list-item-action-text>
              <v-icon color="grey">mdi-info</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
</template>

<script>
  export default {
    props: ["username", "nav", "collection"],
    computed: {
        isNav: function() {
            return this.nav;
        }
    },
  };
</script>
