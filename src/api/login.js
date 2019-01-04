import request from '@/utils/request'

// 人员登录
// 员工登录
export function userLogin(data) {
  return request({
    url: '/api/worker/user/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/api/worker/user/logout',
    method: 'put'
  })
}

// 获取当前登录员工信息
export function getUserInfo() {
  return request({
    url: '/api/worker/user/get',
    method: 'put'
  })
}

// 修改登录人员信息
export function editUser(data) {
  return request({
    url: '/api/worker/user/edit',
    method: 'put',
    data
  })
}

// 修改密码
export function changePassword(data) {
  return request({
    url: '/api/worker/user/password',
    method: 'put',
    data
  })
}

// 获取自己的菜单
export function getMenu(params) {
  return request({
    url: '/api/worker/menu/get',
    method: 'get',
    params
  })
}

