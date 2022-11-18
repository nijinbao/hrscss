  /**
   * 获取角色列表
  */
 import request from "@/utils/request";
export function getRoleList(params) {
  return request({
    url:"/sys/role",
    params
  })
}
/**
 * 根据id查询企业
*/
export function getCompanyById(id) {
  return request({
    url:`/company/${id}`
  })
}