<template>
  <div>
    <v-chip-group active-class="primary--text" v-model="filters">
      <v-chip v-for="genre in genres.sorted" :key="genre">
        {{ genre }}
      </v-chip>
    </v-chip-group>
    <collectionlist
      :collection="filteredCollection"
      :nav="isNav"
    ></collectionlist>
  </div>
</template>

<script>
import { fetcher, endpoints } from "../utils";
import CollectionList from "../components/CollectionList";

export default {
  props: ["nav"],
  data() {
    return {
      collection: [],
      username: "vcr_headset",
      filters: [],
    };
  },
  components: {
    collectionlist: CollectionList,
  },
  mounted() {
    if (this.endpoint) this.getData();
  },
  computed: {
    endpoint: function() {
      return this.username && endpoints.collection(this.username);
    },
    genres: function() {
      const allGenres = [].concat(
        ...this.collection.map(({ genres }) => genres)
      );
      return this.parseGenres(allGenres);
    },
    isNav: function() {
      return this.nav;
    },
    filteredCollection: function() {
      const { sorted } = this.genres;

      if (this.filters?.length < 1) return this.collection;

      const filterNames = !Array.isArray(this.filters)
        ? [sorted[this.filters]]
        : this.filters.map((filterIndex) => sorted[filterIndex]);
      return this.collection.filter(({ genres }) => {
        for (let i = 0; i < genres.length; i++)
          if (filterNames.includes(genres[i])) return true;
        return false;
      });
    },
  },
  watch: {
    endpoint: "getData",
  },
  methods: {
    async getData() {
      const collection = await fetcher(this.endpoint);
      this.collection = collection;
    },
    formatArtists(artists) {
      return artists.map(({ name }) => name).join(", ");
    },
    parseGenres(allGenres) {
      const freq = allGenres.reduce((r, e) => {
        if (!r[e]) r[e] = 1;
        else r[e]++;
        return r;
      }, {});

      const sorted = allGenres.sort((a, b) => {
        return freq[b] - freq[a] || a - b;
      });

      return { freq, sorted: [...new Set(sorted)] };
    },
  },
};
</script>
