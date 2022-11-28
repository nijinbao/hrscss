// 引入动态路由和静态路由
import {asyncRoutes, constantRoutes} from "@/router/index"
const state = {
  routes:[]
}
const mutations= {
  setRoutes(state,payload) {
    // 将静态路由和用户拥有权限的动态路由合并
    state.routes=[...constantRoutes,...payload]
  }
}
const actions = {
  // 返回用户拥有的动态路由
  filterRoutes(context, menu) {
      let routes = []
     menu.forEach(key=>routes.push(...asyncRoutes.filter(item => item.name === key)))
     context.commit('setRoutes',routes)
     return routes
  }
}
export default {
  // 开启命名空间
  namespaced:true,
  state,
  actions,
  mutations
  
}