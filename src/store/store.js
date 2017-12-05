import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
    },
    authorized: true,
    token: ''
  },
  mutations: {
    setAuthorized (state) {
      state.authorized = true
    },
    setUser (state, user) {
      state.user = user.body.data.user
    },
    setUserValues (state, values) {
      state.user = {...state.user, ...values}
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
    },
    getUser: state => {
      return state.user
    }
  }
})
