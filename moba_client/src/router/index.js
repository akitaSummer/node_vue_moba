import Vue from 'vue'
import Router from 'vue-router'

import Main from '../pages/Main/Main'
import Home from '../pages/Main/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        }
      ]
    }
  ]
})
