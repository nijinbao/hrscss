import request from '@/utils/request'

export async function login(data) {
  return request({
    method:"post",
    url:"/sys/login",
    data
  })
  }


export function getInfo(token) {

}

export function logout() {
 
}
export function getUserInfo() {
    return request({
      url:"/sys/profile",
      method:"post"
    })
}
export function getUserDetailInfoById(id) {
  return request({
    url:`/sys/user/${id}`
  })
}
