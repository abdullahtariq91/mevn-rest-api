import Vue from 'vue'
import Router from 'vue-router'

import usersPage from '../pages/users.vue'
import homePage from '../pages/home.vue'
import loginPage from '../pages/login.vue'

Vue.use(Router)

const router = new Router ({
  root: '/login',
  routes:
  [
    {
      path: '/login',
      name: 'login',
      component: loginPage
    },
    {
      path: '/users',
      name: 'users',
      component: usersPage
    },
    {
      path: '/home',
      name: 'home',
      component: homePage
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
