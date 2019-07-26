import Vue from 'vue'
import Router from 'vue-router'

import Main from '../pages/Main/Main'
import CategoryEdit from '../pages/Main/Categories/CategoryEdit'
import CategoryList from '../pages/Main/Categories/CategoryList'
import ItemEdit from'../pages/Main/Items/ItemEdit'
import ItemList from'../pages/Main/Items/ItemList'
import HeroEdit from "../pages/Main/Heros/HeroEdit"
import HeroList from "../pages/Main/Heros/HeroList"
import ArticlesEdit from '../pages/Main/Articles/ArticlesEdit'
import ArticlesList from '../pages/Main/Articles/ArticlesList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        // 分类
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
        {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true
        },
        // 物品
        {
          path: '/items/create',
          component: ItemEdit
        },
        {
          path: '/items/list',
          component: ItemList
        },
        {
          path: '/items/edit/:id',
          component: ItemEdit,
          props: true
        },
        // 英雄
        {
          path: '/heros/create',
          component: HeroEdit
        },
        {
          path: '/heros/list',
          component: HeroList
        },
        {
          path: '/heros/edit/:id',
          component: HeroEdit,
          props: true
        },
        // 文章
        {
          path: '/articles/create',
          component: ArticlesEdit
        },
        {
          path: '/articles/list',
          component: ArticlesList
        },
        {
          path: '/articles/edit/:id',
          component: ArticlesEdit,
          props: true
        },
      ]
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
})
