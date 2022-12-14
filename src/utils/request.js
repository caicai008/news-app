import ajax from 'axios'

import { getToken, setToken } from '@/utils/token'
import { getTokenAPI } from '@/api/user'

const axios = ajax.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 统一携带 token
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // Notify({ type: 'danger', message: '身份过期，请重新登录！' })
    // router.replace('/login')
    // token续签方式1:
    // store.commit('setToken', '')
    // router.push({ path: '/login' })

    // token续签方式2: refreshToken(用户无感知)
    const res = await getTokenAPI()
    setToken('caicai', res.data.data.token)
    // 把新的token赋予到下一次axios请求的请求头中
    error.config.headers.Authorization = 'Bearer ' + res.data.data.token
    // return到await的地方
    return ajax(error.config)
  }
  return Promise.reject(error)
})

// 到初自定义函数 参数对象解构赋值
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })

// 以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
//   return $.ajax({
//     url: url,
//     type: method,
//     data: data,
//     header: headers
//   })
}
