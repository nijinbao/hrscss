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