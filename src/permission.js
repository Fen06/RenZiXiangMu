import router from '@/router'
import store from '@/store'
// 全局路由守卫
const whileList = ['/login', '/404']
//to:去哪里的路由信息
//from:来自哪个路由信息
//next:是否进入
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //   登录后是否进入登录页
    if (!store.state.user.userinfo.userId) {
      store.dispatch('user/getUserInfo')
    }

    if (to.path === '/login') return next('/')
    next()
  } else {
    //访问的是否在白名单中
    const isCludes = whileList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
