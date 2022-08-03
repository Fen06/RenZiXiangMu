export const imgError = {
  //当前被绑定的元素插入到DOM中
  inserted: function (el, { value }) {
    //聚集元素
    el.onerror = function () {
      el.src = value
    }
  }
}

export const abc = {}
