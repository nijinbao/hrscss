// 定义所有的自定义指令
export const imgeerror = {
  inserted:function(el,binding) {
    // 当被绑定的元素被插入到父节点时调用钩子函数
    // el表示自定义指令绑定的DOM元素 binging表示一个对象含有很多的属性，其中value属性表示自定义指令绑定的值
    el.onerror = function() {
      // 当图片无法正常的显示的时候，使用用户传递的值
      el.src = binding.value
    }
  }
}