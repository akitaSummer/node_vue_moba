// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'

import App from './App'
import router from './router'
import ajax from './api/ajax'
import './assets/css/style.css'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

const api = 'http://localhost:4001/admin/api/'
Vue.prototype.$http = (url, data = {}, type = 'GET') => {return ajax(api+url, data, type)}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data.message
    })
    if (error.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
});

Vue.mixin({
  computed: {
    // 图片上传地址
    uploadUrl() {
      return 'http://localhost:4001/admin/api/upload'
    }
  },
  methods: {
    // 图片上传时添加localStorage.token
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
