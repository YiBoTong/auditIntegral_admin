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

export function logout() {
  return request({
    url: '/api/worker/user/logout',
    method: 'put'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/worker/user/get',
    method: 'put'
  })
}

