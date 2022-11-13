import request from '@/utils/request'

export async function login(data) {
  return {
    data : {
      token : 12345
    }
  }
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
