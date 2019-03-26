import Vue from 'vue'
import { Message } from 'element-ui'
import Router from 'vue-router'
import store from '../store'
// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router =new Router({
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
      component: () => import('@/views/News'),
      meta: {
        requireAuth:true
      }
    },
    {
      path: '/Order/:OrderId/:OrderNumber',
      name: 'Order',
      component: () => import('@/views/Order'),
      meta: {
        requireAuth:true
      }
    },
    {
      path: '/Message',
      name: 'Message',
      component: () => import('@/views/Message'),
      meta: {
        requireAuth:true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    }else {
      Message('访问该路由需登录以获得token');
      next({
        path: '/HelloWorld'
      })
    }
  }else{
    //无需登录
    next() 
  }
})
export default router