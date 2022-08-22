import request from '@/utils/request'

export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function getAddRolesApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
