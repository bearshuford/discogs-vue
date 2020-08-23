import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    video: {},
    release: {},
    isPlaying: false,
  },
  mutations: {
    setVideo(state, video) {
      state.video = video;
    },
    setRelease(state, release) {
      state.release = release;
    },
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    toggle(state) {
      state.isPlaying = !state.isPlaying;
    },
  },
  actions: {
    play({ commit }) {
      commit("play");
    },
    pause({ commit }) {
      commit("pause");
    },
    toggle({ commit }) {
      commit("toggle");
    },
    setVideo(context, video) {
      context.commit("setVideo", video);
    },
    setRelease(context, release) {
      context.commit("setRelease", release);
    },
    playNew({ state, commit }, payload) {
      // clicking on currently playing vid
      const isCurrentVideo = payload?.video?.id === state.video?.id;
      const isCurrentRelease =
        payload?.release?.releaseId === state.release?.releaseId;

      if (state.isPlaying && isCurrentVideo) commit("pause");
      else if (!state.isPlaying && isCurrentVideo) commit("play");
      else {
        if (!isCurrentVideo) commit("setVideo", payload.video);
        if (!isCurrentRelease) commit("setRelease", payload.release);
      }
    },
  },
});
