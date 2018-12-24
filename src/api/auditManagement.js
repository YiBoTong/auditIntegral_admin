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

// 获取列表
export function getDraftList(data) {
  return request({
    url: '/api/audit/draft/list',
    method: 'post',
    data
  })
}
// 获取方案
export function getDraft(params) {
  return request({
    url: '/api/audit/draft/get',
    method: 'get',
    params
  })
}
// 删除方案
export function deleteDraft(params) {
  return request({
    url: '/api/audit/draft/delete',
    method: 'delete',
    params
  })
}
// 添加方案
export function addDraft(data) {
  return request({
    url: '/api/audit/draft/add',
    method: 'post',
    data
  })
}
// 修改方案
export function editDraft(data) {
  return request({
    url: '/api/audit/draft/edit',
    method: 'put',
    data
  })
}

