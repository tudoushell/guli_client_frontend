import axios from "axios";
import { Message, MessageBox } from 'element-ui'
import cookie from "js-cookie"


// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8080/api', // api 的 base_url
  timeout: 5000 // 请求超时时间
});


// HTTP request拦截器
service.interceptors.request.use(
  config => {

    //判断cookie里面是否有名称是'guli_token'的值
    if(cookie.get('token')){
      //把获取cookie值放到header里面
      config.headers['token'] = cookie.get('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;
