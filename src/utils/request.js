import axios from "axios";
import store from "@/store";
import router from "@/router/index"
import { Message } from 'element-ui';
import { getTimeStamp } from "@/utils/auth"
const request = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // npm  run dev  => /api npm run build =>  /prod-api
  timeout: 5000 // 设置超时时间
})  
// 设置token的有效时间单位s
let effectiveTime = 36000000
// 请求拦截器
request.interceptors.request.use((config)=>{
  // 如果存在token
  if(store.getters.token) {
    // 判断当前时间戳是否过期
    if(isOverTime()) {
      // 进行登出操作
      store.dispatch("user/logout")
      router.push("/login")
      return Promise.reject(new Error("token失败了"))
    }
    // 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 注意：只有返回config,请求才能够正常的发送
  return config
},err=>{
  Promise.reject(err)
})
// 响应拦截器
request.interceptors.response.use(response=>{
// 对响应成功的结果进行解构
const {data ,message, success} = response.data
// 判断返回的结果是否成功
if(success) {
  return data
} else {
  Message.error(message)
  return Promise.reject(new Error(message))
}
},err=>{
  // token失效后端返回错误信息
  if(err.resposne && err.resposne.data.code === 10002){
    // 进行登出操作
    store.dispatch("user/logout")
    // 跳转到登陆页
    router.push("/login")
  }else {
      Message.error(err.message)//响应失败的消息提示
  }
  // 将响应失败的结果返回
  return Promise.reject(err)
})
// 判断存入的时间戳是否过期
function isOverTime() {
  // 获取当前时间戳
  let nowTime = Date.now()
  // 获取存入的时间戳
  let oldTime = getTimeStamp()
  return ((nowTime - oldTime) / 1000) > effectiveTime
}
export default request