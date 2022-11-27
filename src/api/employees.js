import request from "@/utils/request";
import { pullAt } from "lodash";
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
// 修改员工基本信息并保存
export function saveUserInfoById(data) {
  return request({
    url:`/sys/user/${data.id}`,
    method:"put",
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}


/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
/**
 * 给用户分配角色
*/
export function assiginRole(data) {
  return request({
    url:"/sys/user/assignRoles",
    method:"put" ,
    data
  })
}