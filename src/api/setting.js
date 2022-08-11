import request from '@/utils/request'

export function getCompanyInfoApi(id) {
  return request({
    url: `/company/${id}`
  })
}
