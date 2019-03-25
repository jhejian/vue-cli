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
  </div>
</template>

<script>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
