// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
}) // 创建一个axios的实例

function tokenOut() {
  const nowTimer = Date.now()
  const setToken = getTokenTime()
  const timeOut = 3 * 1000
  return nowTimer - setToken > timeOut
}
service.interceptors.request.use(async (config) => {
  //当前的配置
  if (store.state.user.token) {
    if (tokenOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }

  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    //成功的函数
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  // ?. 为es11 的语法 等同于 error && error.response 的写法
  async function (error) {
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
