import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {},
    authorized: false,
    token: ''
  },
  mutations: {
    setAuthorized (state) {
      state.authorized = true
    },
    setUser (state, user) {
      state.user = user.body.data.user
    },
    setToken (state, token) {
      state.token = token
    },
    unsetToken (state) {
      state.token = ''
    },
    unsetAuthorized (state) {
      state.authorized = false
    },
    unsetUser (state) {
      state.user = {}
    }
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getAuthorized: state => {
      return state.authorized
    }
  }
})

