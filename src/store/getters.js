const getters = {
  sidebar:state =>state.app.sidebar,
  token: state => state.user.token,
  // 建立用户名的快捷访问
  username:state =>state.user.userInfo.username,
  // 建立用户Id的快捷访问
  userId:state => state.user.userInfo.userId ,
//  建立用户头像的快捷访问
  staffPhoto :state => state.user.userInfo.staffPhoto,
  // 建立公司id的快捷访问
  companyId:state => state.user.userInfo.companyId
}
export default getters
