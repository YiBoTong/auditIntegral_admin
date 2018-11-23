import request from '@/utils/request'
// 系统管理

// 系统日志
// 日志列表
export function logList(data) {
  return request({
    url: '/api/systemSetup/log/list',
    method: 'post',
    data
  })
}
// 删除操作日志
export function logDelete(data) {
  return request({
    url: '/api/systemSetup/log/delete',
    method: 'post',
    data
  })
}

// 登录管理
// 登录账户列表
export function loginList(data) {
  return request({
    url: '/api/systemSetup/login/list',
    method: 'post',
    data
  })
}
// 添加登录人员
export function loginAdd(data) {
  return request({
    url: '/api/systemSetup/login/add',
    method: 'post',
    data
  })
}
// 修改登录人员
export function loginEdit(data) {
  return request({
    url: '/api/systemSetup/login/edit',
    method: 'post',
    data
  })
}
// 删除登录人员
export function loginDelete(data) {
  return request({
    url: '/api/systemSetup/login/delete',
    method: 'post',
    data
  })
}

// 字典管理
// 字典列表
export function dictList(data) {
  return request({
    url: '/api/systemSetup/dictionaries/list',
    method: 'post',
    data
  })
}
// 添加字典
export function dictAdd(data) {
  return request({
    url: '/api/systemSetup/dictionaries/add',
    method: 'post',
    data
  })
}
// 字典修改
export function dictEdit(data) {
  return request({
    url: '/api/systemSetup/dictionaries/edit',
    method: 'post',
    data
  })
}
// 获取字典
export function dictGet(params) {
  return request({
    url: '/api/systemSetup/dictionaries/get',
    method: 'get',
    params
  })
}
// 删除字典
export function dictDelete(data) {
  return request({
    url: '/api/systemSetup/dictionaries/delete',
    method: 'post',
    data
  })
}

