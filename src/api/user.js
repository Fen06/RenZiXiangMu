import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
