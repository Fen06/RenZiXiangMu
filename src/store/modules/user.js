import { getUserDetail, getUserInfoApi, login } from '@/api/user'

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
    },
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userDetail = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userDetail })
    }
  }
}
