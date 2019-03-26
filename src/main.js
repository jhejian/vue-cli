// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// vue怎么兼容IE
// 1.原因是Vue使用了ES6 Promise的问题，而IE浏览器不支持，解决方法是:使用babel-polyfill转换安装命令代码。
// cnpm install babel-polyfill --save-dev

// 2.使用vue-cli项目在webpack.config.js中添加以下代码
// require('babel-polyfill')
// entry: {
//   app: ['babel-polyfill','./src/main.js']
// },

// 3.解决IE不显示内容代码
// <meta http-equiv="X-UA-Compatible" content="IE=edge"/>

// 4.在需要兼容的代码添加即可
// <meta name="viewport" content="width=device-width,initial-scale=1.0">

// 5.如果出现语法不支持，比如 includes , 那么使用 babel-polyfill 解决方法代码
// cnpm install babel-polyfill --save-g

// 6.main.js中引入 babel-polyfill 对象方法代码：引入后就兼容了
import 'babel-polyfill' 

import App from './App'
import router from './router'
import store from './store'

import axios from "axios"
import http from './utils/request'//引入封装的请求
Vue.prototype.$http = http
// 设置post请求的请求头headers里面的Content-Type字段
// application/json
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
// qs模块
import Qs from 'qs'
import MD5 from 'js-md5'
Vue.prototype.$axios = axios
Vue.prototype.$Qs = Qs
Vue.prototype.$MD5 = MD5

// withCredentials默认是false，意思就是不携带cookie信息，那就让它为true
axios.defaults.withCredentials=true//vue前后端分离，session问题

Vue.config.productionTip = false//阻止启动生产消息，常用作指令。

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
