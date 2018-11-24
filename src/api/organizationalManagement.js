import request from '@/utils/request'
// 机构管理

// 部门管理
// 获取部门树
export function departmentTree(params) {
  return request({
    url: '/api/org/department/tree',
    method: 'get',
    params
  })
}
// 修改机构
export function departmentEdit(data) {
  return request({
    url: '/api/org/department/edit',
    method: 'put',
    data
  })
}
// 删除机构
export function departmentDelete(data) {
  return request({
    url: '/api/org/department/delete',
    method: 'post',
    data
  })
}
// 添加部门
export function departmentAdd(data) {
  return request({
    url: '/api/org/department/add',
    method: 'post',
    data
  })
}
// 获取部门列表
export function departmentList(data) {
  return request({
    url: '/api/org/department/list',
    method: 'post',
    data
  })
}
// 获取部门信息
export function departmentGet(params) {
  return request({
    url: '/api/org/department/get',
    method: 'get',
    params
  })
}

// 人员管理
// 人员列表
export function userList(data) {
  return request({
    url: '/api/org/user/list',
    method: 'post',
    data
  })
}
// 添加人员
export function userAdd(data) {
  return request({
    url: '/api/org/user/add',
    method: 'post',
    data
  })
}
// 修改人员
export function userEdit(data) {
  return request({
    url: '/api/org/user/edit',
    method: 'post',
    data
  })
}
// 获取人员
export function userGet(data) {
  return request({
    url: '/api/org/user/get',
    method: 'get',
    data
  })
}
// 删除人员
export function userDelete(data) {
  return request({
    url: '/api/org/user/delete',
    method: 'post',
    data
  })
}

// 通知公告
// 通知公告列表
export function noticeList(data) {
  return request({
    url: '/api/org/notice/list',
    method: 'post',
    data
  })
}
// 添加通知公告
export function noticeAdd(data) {
  return request({
    url: '/api/org/notice/add',
    method: 'post',
    data
  })
}
// 修改通知公告
export function noticeEdit(data) {
  return request({
    url: '/api/org/notice/edit',
    method: 'post',
    data
  })
}
// 删除通知公告
export function noticeDelete(data) {
  return request({
    url: '/api/org/notice/delete',
    method: 'post',
    data
  })
}
// 获取通知公告
export function noticeGet(data) {
  return request({
    url: '/api/org/notice/get',
    method: 'get',
    data
  })
}

// 管理办法
// 管理办法列表
export function clauseList(data) {
  return request({
    url: '/api/org/clause/list',
    method: 'post',
    data
  })
}
// 添加管理列表
export function clauseAdd(data) {
  return request({
    url: '/api/org/clause/add',
    method: 'post',
    data
  })
}
// 编辑管理办法
export function clauseEdit(data) {
  return request({
    url: '/api/org/clause/edit',
    method: 'post',
    data
  })
}
// 删除管理办法
export function clauseDelete(data) {
  return request({
    url: '/api/org/clause/delete',
    method: 'post',
    data
  })
}
// 获取管理办法
export function clauseGet(data) {
  return request({
    url: '/api/org/clause/get',
    method: 'get',
    data
  })
}
// 删除管理办法内容
export function clauseDeleteContent(data) {
  return request({
    url: '/api/org/clause/deleteContent',
    method: 'post',
    data
  })
}
// 管理办法状态
export function clausesState(data) {
  return request({
    url: '/api/org/clause/state',
    method: 'post',
    data
  })
}
