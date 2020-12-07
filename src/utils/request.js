import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app/'
  baseURL: 'http://toutiao-app.itheima.net/',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }]

})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
