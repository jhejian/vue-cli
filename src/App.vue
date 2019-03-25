<template>
  <div id="app">
    <!-- 导航 -->
    <ul class="nav">
      <li>
        <!-- tag：是修改展示的标签元素的，不写的话默认a标签 -->
        <!-- active-class：是控制当前选中状态的类名，后边跟的值就是选中状态下的类名，不写这个属性，默认选中的类名就是router-link-active -->
        <router-link to="/HelloWorld" tag="button" active-class="current">
          HelloWorld
        </router-link>
      </li>
      <li>
        <!-- query：vue-router插件规定的，后边跟的是个对象，router会把对象中的每一项拼接到路由后边 -->
        <router-link :to="{path: '/News', query: {title: '中国城市GDP排名出炉', content: '深圳位列第3'}}">
          新闻
        </router-link>    
      </li>
      <li>
        <!-- params：vue-router插件规定的，后边跟的是个对象，这个地方不能再用path跳转，而必须用name(命名路由)跳转 -->
        <router-link :to="{name: 'Message', params: {content: '饿了么新增一条订单信息'}}">
          消息
        </router-link>      
      </li>
      <li>
        <router-link to="/Order/123/456">
          订单
        </router-link>    
      </li>
    </ul>

    <!-- 挂载路由 -->
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
html{
  font-size: 625%;
}
body{
  font-size: .16rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0;
}
#app .nav{
  /* flex布局的兼容性问题 */
  display: box;              /* OLD - Android 4.4- */
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */

  -webkit-box-pack: space-around;
  /* 12版 */
  -webkit-justify-content: space-around;
  -moz-justify-content: space-around;
  -ms-justify-content: space-around;
  -o-justify-content: space-around;
  justify-content: space-around;
  height: .44rem;
  background: #333;
}
.nav li{
  line-height: .44rem;
}
.nav li a{
  color: #fff;
}
.nav li .current{
  color: red;
}
</style>
