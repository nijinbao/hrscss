import store from "@/store/index"
export default {
  methods : {checkPermission(key) {
    let {userInfo }= store.state.user
    // 首先判断该用户是否存在按钮的权限,而且不为空
    if(userInfo.roles && userInfo.roles.points) {
      return userInfo.roles.points.some(item => item===key)
    }
    return false
  }
}
}