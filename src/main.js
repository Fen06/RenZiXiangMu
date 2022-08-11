import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

//参数1.自定义指令的名字，不需要+v-
//参数2.是配置对象
// Vue.directive('imgError', {
//   //当前被绑定的元素插入到DOM中
//   inserted: function (el, { value }) {
//     //聚集元素
//     el.onerror = function () {
//       el.src = value
//     }
//   }
// })

import * as directive from '@/directives'

for (let key in directive) {
  Vue.directive(key, directive[key])
}
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
