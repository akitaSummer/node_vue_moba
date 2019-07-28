import Vue from 'vue'
import Router from 'vue-router'

import Main from '../pages/Main/Main'
import Login from '../pages/Login/Login'
import CategoryEdit from '../pages/Main/Categories/CategoryEdit'
import CategoryList from '../pages/Main/Categories/CategoryList'
import ItemEdit from'../pages/Main/Items/ItemEdit'
import ItemList from'../pages/Main/Items/ItemList'
import HeroEdit from "../pages/Main/Heros/HeroEdit"
import HeroList from "../pages/Main/Heros/HeroList"
import ArticlesEdit from '../pages/Main/Articles/ArticlesEdit'
import ArticlesList from '../pages/Main/Articles/ArticlesList'
import ADsEdit from '../pages/Main/ADs/ADsEdit'
import ADsList from '../pages/Main/ADs/ADsList'
import AdminUsersEdit from '../pages/Main/AdminUsers/AdminUsersEdit'
import AdminUsersList from '../pages/Main/AdminUsers/AdminUsersList'

Vue.use(Router)

const router = new Router({
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
        // 广告位
        {
          path: '/ads/create',
          component: ADsEdit
        },
        {
          path: '/ads/list',
          component: ADsList
        },
        {
          path: '/ads/edit/:id',
          component: ADsEdit,
          props: true
        },
        // 管理员
        {
          path: '/admin_users/create',
          component: AdminUsersEdit
        },
        {
          path: '/admin_users/list',
          component: AdminUsersList
        },
        {
          path: '/admin_users/edit/:id',
          component: AdminUsersEdit,
          props: true
        },
        {
          path: '',
          redirect: '/items/list'
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
})
router.beforeEach((to, from , next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
