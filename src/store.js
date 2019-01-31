import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    time(state) {
      return state.score;
    }
  },
  state: {
    score: 0
  },
  mutations: {
    tick(state, data) {
      state.score = data
    }
  },
  actions: {
    tick({ commit }, data) {
      commit('tick', data)
    }
  }
})
