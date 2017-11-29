import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'

import { store } from '../store/store.js'

import Home from '@/components/Home'
import Accounts from '@/components/user/pages/Accounts'
import Archive from '@/components/user/pages/Archive'
import credit from '@/components/user/pages/Credit'
import Profile from '@/components/user/pages/Profile'
import Api from '@/components/Api'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts
    },
    {
      path: '/api',
      name: 'Api',
      component: Api
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/credit',
      name: 'credit',
      component: credit,
      meta: {
        auth: true
      }

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
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
