import router from "./router";
import NProgress from "nprogress"
import "nprogress/nprogress.css" //引入进度条样式
import store from "./store"
const whiteList = ["/login", "/404"]

// 全局前置守卫 开始路由跳转
router.beforeEach(async (to,from,next)=>{
  // 开始进度条的显示
  NProgress.start()
  // 如果存在token
  if(store.getters.token) {
    // 如果访问login
    if(to.path === "/login") {
      next('/') 
    } else {
      // 判断是否存在用户Id
      if(!store.getters.userId) {
       await store.dispatch("user/getUserInfo")
      }
      next()
    }
  } else {
    // 如果访问的地址在白名单内
    if(whiteList.includes(to.path)) {
      next()
    }else {
      next("/login")
    }
  }
  // 解决手动切换地址，全局后置守卫无法坚听
  NProgress.done()
})
// 全局后置守卫，在完成路由跳转之后触发
router.afterEach((to,from)=>{
  // 结束进度条
  NProgress.done()
})
