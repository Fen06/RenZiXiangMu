import request from '@/utils/request'

export function getPeopleApi() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getEmployeesApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
