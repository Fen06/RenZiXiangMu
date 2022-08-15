import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import Uploading from './Uploading'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('Uploading', Uploading) // 注册导入excel组件
  }
}
