import request from '@/utils/request'

export function getIntegralApi(params) {
  return request({
    url: '/api/audit/statistical/get_my_score_by_year',
    method: 'get',
    params
  })
}

export function getBehaviorApi(params) {
  return request({
    url: '/api/audit/statistical/get_my_behavior_by_year',
    method: 'get',
    params
  })
}

export function getConfirmationApi(params) {
  return request({
    url: '/api/audit/statistical/get_my_confirmation_by_year',
    method: 'get',
    params
  })
}

export function getNoticeApi(params) {
  return request({
    url: '/api/audit/statistical/get_my_punish_notice_by_year',
    method: 'post',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
