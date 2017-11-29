// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import auth from './auth/index'

// import css
import 'normalize.css'

require('../static/css/custom.css')
require('../static/css/skeleton.css')

// import store
import { store } from './store/store.js'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueLodash, lodash)

// set API URL for vue-resource
Vue.http.options.root = 'http://webbankir.zend'

// eslint-disable-next-line
new Vue({
  el: '#app',
  auth,
  router,
  store,
  template: '<App/>',
  components: {App}
})

// Включаем эмуляцию JSONб без этого API видит пустое тело запроса
Vue.http.options.emulateJSON = true

// Добавляем токен к авторизации
/*
Vue.http.interceptors.push((request, next) => {
  console.log('Bearer ' + store.getters.getToken)

  if (store.getters.getToken) {
    request.headers.set('Authorization', 'Bearer ' + store.getters.getToken)
  }

})
*/
