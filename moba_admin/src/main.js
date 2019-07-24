// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import router from './router'
import ajax from './api/ajax'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

const api = 'http://localhost:4001/admin/api/'
Vue.prototype.$http = (url, data = {}, type = 'GET') => {return ajax(api+url, data, type)}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
