import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'

import { store } from '../store/store.js'

import Api from '@/components/Api'
import Login from '@/components/registration/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/api',
      name: 'Api',
      component: Api
    }
  ],
  redirect: {
    '*': '/home'
  }
})

// Global route guard
router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth)
  if (authRequired) {
    if (!store.getters.getAuthorized) {
      console.log('here')
      auth.signIn()
      next('/')
    } else {
      console.log('how?')
      next()
    }
  } else {
    auth.signIn()
    console.log('shhhho')
    next()
  }
})

/*  if (to.matched.some(route => route.meta.auth)) {
    // this route requires auth, check if logged in
    if (store.getters.getAuthorized) {
      // only proceed if authenticated.
      next()
    } else {
      auth.signIn()
      next()
    }
  } else {
    console.log('restricted')
    next()
  }
}) */

export default router
