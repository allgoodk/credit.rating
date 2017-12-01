import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
      city: '',
      last_name: '',
      first_name: '',
      middle_name: '',
      male: '',
      p_number: '',
      p_serie: '',
      p_from: '',
      p_code: '',
      p_date: '',
      obr: '',
      profit_month: '',
      from_where: '',
      mobile_phone: '',
      work_sphere: '',
      work_vid: ''
    },
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
    }
  }
})

