<template>
  <div class="hello">
    {{ msg }}
    <br>
    <button @click="doLogin">
      登录
    </button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="getList">
      session问题
    </button>

    <br/><br/>
    <div>
      <!-- 挂载登录组件 -->
      <!-- 组件传值绑定属性时title一定得在data中定义，如若写死数据则需反引号转义 -->
      <v-login :myTitle="`title`"></v-login>
    </div>

    <pre>
      在vue中如何获取token，并将token写进header
        1.在login.vue中通过发送http请求获取token

        2.在store.js中对token状态进行监管

        3.在router/index.js中设置路由拦截

        4.在main.js中定义全局默认配置：
          Axios.defaults.headers.common['Token'] 
          = 
          store.state.token;
          Token：名字跟后台设置保持一致
        
        5.在main.js里添加拦截器
    </pre>
  </div>
</template>

<script>
// 引入登录组件
import Login from './Login'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to HelloWorld'
    }
  },
  methods: {
    doLogin(){
      this.$axios({
        method: 'post',
        url: 'http://192.168.1.251:8081/user/login',
        data: {
          UserName: 'admin',
          Password: this.$MD5('123456')
        }
      }).then(res =>{
        console.log(res, '登录响应')
      })
    },
    getList(){
      this.$axios({
        method: 'post',
        url: 'http://192.168.1.251:8081/api/product/queryproduct',
        data: {
          ProductName: '', // 物料品名
          PageIndex: 1, // 第几页
          PageSize: 10// 每页几条
        }
      }).then(res =>{
        // console.log(res.data.Message, '列表响应')//'登录超时，请重新登录' '列表响应' => 原因是session问题
        console.log(res.data.Data.ResultList)//可以获取到数据
      })
    }
  },
  mounted() {
    // this.doLogin()
  },
  // 注册登录组件
  components: {
    'v-login': Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
