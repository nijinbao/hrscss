import axios from "axios";
import store from "@/store";
const request = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // npm  run dev  => /api npm run build =>  /prod-api
  timeout: 5000 // 设置超时时间
})
// 请求拦截器
request.interceptors.request.use((config)=>{
  // 如果存在token
  if(store.getters.token) {
    config.headers["Authorization"] = `Bearer ${store.getters.token}`
  }
  // 注意：只有返回config,请求才能够正常的发送
  return config
},err=>Promise.reject(err))
// 响应拦截器
request.interceptors.response.use()
export default request