import Cookies from 'js-cookie'//js插件，帮助我们进行数据存取的

const TokenKey = 'hrsaas-ihrm-token'
const TimeSatmp = 'hrsaas-timeStamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
  // 获取时间戳
export function getTimeStamp() {
    return Cookies.get(TimeSatmp)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(TimeSatmp, Date.now())
}
