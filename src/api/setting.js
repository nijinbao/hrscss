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
/**
 * 根据id删除角色
*/
export function deleteRole(id) {
  return request({
    url:`/sys/role/${id}`,
    method:"delete"
  })
}
/**
 * 根据id获取角色信息
*/
export function getRoleInfo(id) {
  return request({
      url:`/sys/role/${id}`
  })
}
// 根据id更新角色信息
export function updateRole(data) {
  return request({
    url:`/sys/role/${data.id}`,
    method:"put",
    data  
  })
}
/**
 * 新增角色
*/
export function addRole(data) {
  return request({
    url:"/sys/role",
    method:"post",
    data
  })
}
/**
 * 为角色分配权限
*/
export function getRolePermission(data) {
  return request({
    url:`/sys/role/assignPrem`,
    method:"put",
    data
  })
}