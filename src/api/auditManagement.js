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
