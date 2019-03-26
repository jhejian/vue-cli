<template>
    <div>
        <el-button type='success' size='small' @click="toLogin">登录=>token</el-button>
        <br/>
        <el-button size='small' @click="getData">测试axios拦截器</el-button>

        <p>{{ myTitle }}</p>
        <br/><br/>
    </div>
</template>
<script>
import {loginApi} from '@/api/loginManage'
export default {
    name: 'Login',
    data() {
        return {
            
        }
    },
    props: {
        myTitle: {
            type: String,
            default: '标题党'            
        }
    },
    methods: {
        toLogin(){
            this.$axios({
                method: 'post',
                url: loginApi(),
                data: {
                    username: "admin", 
                    password: "123456"
                }
            }).then(res =>{
                // console.log(res, '登录响应')
                let data = res.data.Result
                // 1.全局存储Token
                this.$store.commit('set_token', data["Token"]);//执行vuex中mutations里的相应方法
                // 2.在store.js中对token状态进行监管

                // 根据token判断是否登录状态
                if (this.$store.state.token) {
                    this.$router.push('/News')
                }else{
                    this.$router.replace('/HelloWorld');
                }
            }).catch(error => {
                console.log(error, '账号或密码错误')
            })
        },
        getData(){
            this.$http.get('/api/manager/SysInsideTag/SysInsideTagList', {
                tagName: '',
                tagType: '',
                status: '',
                pageIndex: 1,
                pageSize: 20
            }).then(res => {
                console.log(res)
            }).catch(err =>{
                // return false
                console.log(err);//'未授权，请重新登录(401)'
            })
        }
    }
}
</script>
