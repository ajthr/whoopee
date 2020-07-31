import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://192.168.1.7:3000/',
    // baseUrl: 'http://localhost:3000/',
    imgUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2',
    imdbUrl: 'https://www.imdb.com/title/',
    page: 1,
    searchPage: 1,
    loggedIn: false,
    profileModalActive: false,
  },
  mutations: {
    setPage(state, page) {
      state.page = page
    },
    setUser(state, bool) {
      state.loggedIn = bool
    },
    setProfileModal(state, bool) {
      state.profileModalActive = bool
    },
  },
  actions: {},
  modules: {},
})
