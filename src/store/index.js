import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token:''
    },
    mutations:{
        // 设置token
        set_token(state, token) {
            state.token = token
            sessionStorage.token = token
        },
        // 移除token
        del_token(state) {
            state.token = ''
            sessionStorage.removeItem('token')
        }
    }
})
