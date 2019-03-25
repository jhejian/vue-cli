import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',// 去掉vue路由中的#号
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }, 
    {
      path: '/News',
      name: 'News',
      component: () => import('@/views/News')
    },
    {
      path: '/Order/:OrderId/:OrderNumber',
      name: 'Order',
      component: () => import('@/views/Order')
    },
    {
      path: '/Message',
      name: 'Message',
      component: () => import('@/views/Message')
    }
  ]
})
