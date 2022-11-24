import { bind } from "core-js/core/function"

// 定义所有的自定义指令
export const imgeerror = {
  inserted:function(el,binding) {
    el.src = el.src || binding.value
    // 当被绑定的元素被插入到父节点时调用钩子函数
    // el表示自定义指令绑定的DOM元素 binging表示一个对象含有很多的属性，其中value属性表示自定义指令绑定的值
    // 给指令绑定的DOM元素添加事件监听，当img元素的src属性指向一个错误的地址就会触发error事件 
    // 但是如果图片的地址指向的为空，不会触发error事件
    el.onerror = function() {
      // 当图片无法正常的显示的时候，使用用户传递的值
      el.src = binding.value
    }
  },  
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated:function(el,binding) {
    el.src = el.src || binding.value
  }
}