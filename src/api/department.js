/**
 * 获取组织架构
 */
import request from "@/utils/request"
export  function getDepartInfo() {
    return request({
      url:"/company/department"
    })
}
/**
 * 删除部门
 */

export function deletePartment(id) {
  return request({
    method:"delete",
    url:`/company/department/${id}`
  })
}
/**
 * 新增部门
 */
export function addDepartments(data) {
  return request({
    method:"post",
    url:"/company/department",
    data
  })
}
/**
 * 根据id获取部门详细信息
*/
export function getDetailInfo(id) {
  return request({
    url:`/company/department/${id}`
  })
}
/**
 * 根据id修改部门详情
*/
export function editDepts(data) {
  return request({
    method :"put",
    url:`/company/department/${data.id}`,
    data
  })
}