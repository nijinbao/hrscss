const getters = {
  token: state => state.user.token,
  // 建立用户名的映射
  username:state =>state.user.userInfo.username
 
}
export default getters
