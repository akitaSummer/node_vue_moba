import Vue from 'vue'
import Router from 'vue-router'

import Main from '../pages/Main/Main'
import CategoryEdit from '../pages/Main/Categories/CategoryEdit'
import CategoryList from '../pages/Main/Categories/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/list',
          component: CategoryList
        }
      ]
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
})
