import axios from "axios";
import store from "@/store";
import { Message } from 'element-ui';
const request = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // npm  run dev  => /api npm run build =>  /prod-api
  timeout: 5000 // 设置超时时间
})
// 请求拦截器
request.interceptors.request.use((config)=>{
  // 如果存在token
  if(store.getters.token) {
    // 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 注意：只有返回config,请求才能够正常的发送
  return config
},err=>Promise.reject(err))
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
  Message.error(err.message)//响应失败的消息提示
  // 将响应失败的结果返回
  return Promise.reject(err)
})
export default request