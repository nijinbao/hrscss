import {getToken,setToken,removeToken} from "@/utils/auth"
import {login} from "@/api/user"
const state = {
  token:getToken()//vuex加载就从本地缓存中获取token
}
const mutations = {
  setToken(state,token) {
    state.token = token;
    // 完成tokenxuex存储的同时完成本地存储
    setToken(token)
  },
  removeToken(state) {
    state.token = null ;
    // 实现vuex数据和本地数据同步
    removeToken()
  }
}
const actions = {
  async login(context,data) {
    let {data:res} =await login(data) 
    if(res.success) {
      context.commit("setToken", res.data)
    }
  }
}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}