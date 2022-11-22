import request from "@/utils/request";
// 获取员工的简单列表
export function getEmployeeSimple( ) {
  return request({
    url:"/sys/user/simple"
  })
}
/**
 * 获取员工列表
*/
export function getEmployerList(params) {
  return request({
    url:"/sys/user",
    params
  })
}
/**
 * 删除员工接口
*/
export function delEmploy(id) {
  return request({
    url:`/sys/user/${id}`,
    method:"delete"
  })
}
/**
 * 新增员工
*/
export function addEmployee(data) {
  return request({
    url:"/sys/user",
    method:"post",
    data
  })
}
/**
 * 导入员工数据
*/
export function importEmploy(data) {
  return request({
    url:"/sys/user/batch",
    method:"post",
    data
  })
}