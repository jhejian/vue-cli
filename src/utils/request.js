// 请求封装

// 当我们访问某个地址页面时，有时会要求我们重新登录后再访问该页面，也就是身份认证失效了，如token丢失了，或者是token依然存在本地，但是却失效了，
// 所以单单判断本地有没有token值或者是vuex中有没有token值并不能解决问题。此时请求时服务器返回的是401错误，授权出错，也就是没有权利访问该页面。 
// 我们可以在发送所有请求之前和操作服务器响应数据之前对这种情况过滤。

import http from 'axios'
import store from '../store'
import router from '../router'
// http request 请求拦截器，有token值则配置上token值
http.interceptors.request.use(
    config => {
        if (store.state.token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.auth = store.state.token + 'jhe';
        }
        return config;
    },
    err => {
        return Promise.reject(err);//请求错误时，直接结束
        //return Promise.resolve(err);//请求错误时，不会直接结束，将会继续传到then里面,无论请求成功还是失败，在成功的回调中都能收到通知
    }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误(400)' ; break;
                case 401:
                    // 这里写清除token的代码
                    store.commit('del_token')
                    error.message = '未授权，请重新登录(401)';
                    // console.log('未授权，请重新登录(401)')//'未授权，请重新登录(401)'
                    router.replace({
                        path: '/HelloWorld',
                        //query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
                    break;
                case 403: error.message = '拒绝访问(403)'; break;
                case 404: error.message = `请求出错(404)`; break;
                case 408: error.message = '请求超时(408)'; break;
                case 500: error.message = '服务器错误(500)'; break;
                case 501: error.message = '服务未实现(501)'; break;
                case 502: error.message = '网络错误(502)'; break;
                case 503: error.message = '服务不可用(503)'; break;
                case 504: error.message = '网络超时(504)'; break;
                case 505: error.message = 'HTTP版本不受支持(505)'; break;
                default: error.message = `连接出错(${error.response.status})!`;
            }
        }
        return Promise.reject(error.message)//请求错误时，直接结束
        //return Promise.resolve(error);//请求错误时，不会直接结束，将会继续传到then里面,无论请求成功还是失败，在成功的回调中都能收到通知    
    }
);
export default http