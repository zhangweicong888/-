import axios from 'axios'
import Vue from 'vue'
import router from '@/router.js'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// restful请求风格
//  查: get
//  增：post
//  删： delete
//  改： put 

const actionMapping = {
    'get': 'view',
    'post': 'add',
    'put': 'edit',
    'delete': 'delete'
}
// 为了方便服务器鉴别身份，除登录请求以外的都要携带token
axios.interceptors.request.use((req) => {
    // console.log(req.url)  //请求路径
    // console.log(req.method) // 请求方式
    if(req.url !== 'login') {
        // 不是登录请求，需要在请求头中携带 token
        req.headers.Authorization = sessionStorage.getItem('token')
        // 判断非权限范围内的请求
        const action = router.currentRoute.meta
        const method = actionMapping[req.method]
        if(action && action.indexOf(method) == -1) {
            // 没有权限
            alert('没有权限')
            return Promise.reject(new Error('没有权限'))
        }

    }
    return req

})

// 响应的拦截
axios.interceptors.response.use((res) => {
    if(res.data.meta.status === 401) {
        router.push('/login')
        sessionStorage.clear()
        window.location.reload()
    }
    return res
})

Vue.prototype.$http = axios