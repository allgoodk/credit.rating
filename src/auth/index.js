import router from '../router/index.js'
import {store} from '../store/store'

export default {
  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post('login', creds)
      .then((response) => {
        localStorage.setItem('access_token', response.body.data.access_token)
        context.$store.commit('setAuthorized')
        context.$store.commit('setToken', response.body.data.access_token)
        if (redirect) {
          router.push(redirect)
        }
      })
      .catch(err => {
        context.error = err
      })
  },

  logout () {
    localStorage.removeItem('access_token')
    store.commit('unsetAuthorized')
    store.commit('unsetToken')
    store.commit('unsetUser')
  },

  checkAuth () {
    const jwt = localStorage.getItem('access_token')
    if (jwt) {
      store.commit('setAuthorized')
      store.commit('setToken', jwt)
    } else {
      store.commit('unsetAuthorized')
    }
  }
}
