import { getUserDetail, getUserInfoApi, login } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
    userinfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    async getToekn(context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
      setTokenTime()
    },
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userDetail = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userDetail })
      // 在这里通过userBaseInfo 处理动态路由
      // actions 内部可以通过return将数据传出去，类似then中的return
      return userBaseInfo
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()

      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
