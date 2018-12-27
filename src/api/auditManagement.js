import request from '@/utils/request'
// 稽核管理

// 审计方案
// 方案list
export function programmeList(data) {
  return request({
    url: '/api/audit/programme/list',
    method: 'post',
    data
  })
}
// 添加方案
export function programmeAdd(data) {
  return request({
    url: '/api/audit/programme/add',
    method: 'post',
    data
  })
}
// 修改方案
export function programmeEdit(data) {
  return request({
    url: '/api/audit/programme/edit',
    method: 'put',
    data
  })
}
// 删除方案
export function programmeDelete(params) {
  return request({
    url: '/api/audit/programme/delete',
    method: 'delete',
    params
  })
}
// 获取方案
export function programmeGet(params) {
  return request({
    url: '/api/audit/programme/get',
    method: 'get',
    params
  })
}
// 上报方案
export function programmeState(data) {
  return request({
    url: '/api/audit/programme/state',
    method: 'put',
    data
  })
}
// 部门负责人审核
export function programmeDepExamine(data) {
  return request({
    url: '/api/audit/programme/dep_examine',
    method: 'put',
    data
  })
}
// 分管领导审核
export function programmeAdminExamine(data) {
  return request({
    url: '/api/audit/programme/admin_examine',
    method: 'put',
    data
  })
}
// 获取方案选择列表
export function programmeSelectList(data) {
  return request({
    url: '/api/audit/programme/select',
    method: 'post',
    data
  })
}

// 工作底稿
// 获取工作底稿列表
export function getDraftList(data) {
  return request({
    url: '/api/audit/draft/list',
    method: 'post',
    data
  })
}
// 获取工作底稿
export function getDraft(params) {
  return request({
    url: '/api/audit/draft/get',
    method: 'get',
    params
  })
}
// 删除工作底稿
export function deleteDraft(params) {
  return request({
    url: '/api/audit/draft/delete',
    method: 'delete',
    params
  })
}
// 添加工作底稿
export function addDraft(data) {
  return request({
    url: '/api/audit/draft/add',
    method: 'post',
    data
  })
}
// 修改工作底稿
export function editDraft(data) {
  return request({
    url: '/api/audit/draft/edit',
    method: 'put',
    data
  })
}
// 发布工作底稿
export function changeStateDraft(data) {
  return request({
    url: '/api/audit/draft/state',
    method: 'put',
    data
  })
}

// 事实确认书
// 获取事实确认书列表
export function confirmationList(data) {
  return request({
    url: '/api/audit/confirmation/list',
    method: 'post',
    data
  })
}
// 获取事实确认书
export function getConfirmation(params) {
  return request({
    url: '/api/audit/confirmation/get',
    method: 'get',
    params
  })
}
// 确实书状态变更
export function changeStateConfirmation(data) {
  return request({
    url: '/api/audit/confirmation/state',
    method: 'put',
    data
  })
}
// 已读
export function changeReadConfirmation(data) {
  return request({
    url: '/api/audit/confirmation/read',
    method: 'put',
    data
  })
}
// 设置依据
export function editConfirmation(data) {
  return request({
    url: '/api/audit/confirmation/edit',
    method: 'put',
    data
  })
}
