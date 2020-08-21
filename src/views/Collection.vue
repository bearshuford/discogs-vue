<template>
    <collectionlist :collection="collection" :nav="isNav"></collectionlist>
</template>

<script>
  import { fetcher, endpoints } from "../utils";
  import CollectionList from "../components/CollectionList";

  export default {
    props: ["nav"],
    data() {
      return {
        collection: [],
        username: "vcr_headset"
      };
    },
    components: {
      collectionlist: CollectionList
    },
    mounted() {
      if(this.endpoint) this.getData();
    },
    computed: {
      endpoint: function() {
        return this.username && endpoints.collection(this.username)
      },
      genres: function () {
        const allGenres = [].concat(...this.collection.map(({genres}) => genres));
        return allGenres;
      },
      isNav: function() {
        return this.nav;
      }
    },
    watch: {
      endpoint: "getData"
    },
    methods: {
      async getData() {
        const collection = await fetcher(this.endpoint);
        this.collection = collection;
      },
      formatArtists(artists) {
        return artists.map(({name}) => name).join(", ");
      }
    }
  };
</script>
