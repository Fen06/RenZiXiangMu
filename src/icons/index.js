import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 注册组件
Vue.component('svg-icon', SvgIcon)
// 一次性导入所有组件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
