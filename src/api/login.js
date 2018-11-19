import request from '@/utils/request'

// 人员登录
// 员工登录
export function userLogin() {
  return request({
    url: '/api/systemSetup/userLogin',
    method: 'post'
  })
}

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

