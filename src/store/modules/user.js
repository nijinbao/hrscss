import {getToken,setToken,removeToken} from "@/utils/auth"
import {login, getUserInfo} from "@/api/user"
const state = {
  token:getToken(),//vuex加载就从本地缓存中获取token,
  userInfo:{}
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
  },
  setUserInfo(state,payload) {
    state.userInfo = payload
  },
  // 删除用户资料
  deleteUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context,data) {
      let res =await login(data) 
      context.commit("setToken", res)
    },
  async getUserInfo(context) {
        let res = await getUserInfo()
        context.commit("setUserInfo", res)
        return res
  },
  
  }
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}