import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  getters: {
    userPhoto (state) {
      return state.user.photo
    }
  },
  mutations: {
    setUser (state, userObj) {
      state.user = userObj
      localStorage.setItem('user', JSON.stringify(userObj))
    }
  },
  actions: {
  },
  modules: {
  }
})
