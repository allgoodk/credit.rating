import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store.js'

// Components import
import Login from '@/components/registration/Login'
import Questionnaire from '@/components/Questionnaire'

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
      path: '/questionnaire',
      name: 'Questionnaire',
      component: Questionnaire,
      meta: {
        auth: true
      }
    }
  ],
  redirect: {
    '*': '/login'
  }
})

// Global route guard
router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth)
  if (authRequired) {
    if (store.getters.getAuthorized) {
      next()
    } else {
      router.push('/')
    }
  } else {
    next()
  }
})

export default router
