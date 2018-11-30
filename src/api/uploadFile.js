import request from '@/utils/request'

export function fileUpload(data) {
  return request({
    url: '/api/worker/file/upload',
    method: 'post',
    data
  })
}

