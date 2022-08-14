export const imgError = {
  //当前被绑定的元素插入到DOM中
  //令绑定的元素插入到dom的时候，图片数据还没返回回来，可以用下方的updata来解决
  inserted: function (el, { value }) {
    //聚集元素
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 解决方案
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}
