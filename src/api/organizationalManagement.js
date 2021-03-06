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
export function departmentDelete(params) {
  return request({
    url: '/api/org/department/delete',
    method: 'delete',
    params
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
    method: 'put',
    data
  })
}
// 获取人员
export function userGet(params) {
  return request({
    url: '/api/org/user/get',
    method: 'get',
    params
  })
}
// 删除人员
export function userDelete(params) {
  return request({
    url: '/api/org/user/delete',
    method: 'delete',
    params
  })
}
// 导入人员
export function userImport(params) {
  return request({
    url: '/api/org/user/import',
    method: 'get',
    params
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
export function noticeDelete(params) {
  return request({
    url: '/api/org/notice/delete',
    method: 'delete',
    params
  })
}
// 获取通知公告
export function noticeGet(params) {
  return request({
    url: '/api/org/notice/get',
    method: 'get',
    params
  })
}
// 编辑通知公告状态管理
export function noticeState(data) {
  return request({
    url: '/api/org/notice/state',
    method: 'put',
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
    method: 'put',
    data
  })
}
// 删除管理办法
export function clauseDelete(params) {
  return request({
    url: '/api/org/clause/delete',
    method: 'delete',
    params
  })
}
// 获取管理办法
export function clauseGet(params) {
  return request({
    url: '/api/org/clause/get',
    method: 'get',
    params
  })
}
// 删除管理办法内容
export function clauseDeleteContent(params) {
  return request({
    url: '/api/org/clause/deleteContent',
    method: 'delete',
    params
  })
}
// 管理办法状态
export function clausesState(data) {
  return request({
    url: '/api/org/clause/state',
    method: 'put',
    data
  })
}
// 搜索管理办法内容
export function clausesSearch(params) {
  return request({
    url: '/api/org/clause/search',
    method: 'get',
    params
  })
}
// 搜索管理办法内容
export function clausesTitleSearch(params) {
  return request({
    url: '/api/org/clause/title',
    method: 'get',
    params
  })
}
// 导入管理办法内容
export function clausesImport(params) {
  return request({
    url: '/api/org/clause/import',
    method: 'get',
    params
  })
}
