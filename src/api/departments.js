import request from '@/utils/request'

export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}

export function delDeptsApi(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

export function getDeptById(id) {
  return request({
    url: `/company/department/${id}`
  })
}

export function editDeptById(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
