import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* NavBar */
    isNavBarVisible: false,
  },
  mutations: {
    //login page navbar
    navbarHide(state, payload = null) {
      state.isNavBarVisible = payload;
    },
  },
  actions: {},
  modules: {},
});
