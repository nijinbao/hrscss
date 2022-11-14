import {getToken,setToken,removeToken} from "@/utils/auth"
import {login, getUserInfo ,getUserDetailInfoById} from "@/api/user"
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
        // 通过用户id获取用户基本信息完成数据的合并
        let baseInfo = await getUserDetailInfoById(res.userId)
        let newInfo = {...res, ...baseInfo}
        context.commit("setUserInfo", newInfo)
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