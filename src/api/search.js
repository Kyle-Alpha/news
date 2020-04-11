import request from '@/utils/request'

export function apiThink(params) {
  return request({
    url: 'suggestion',
    method: 'get',
    params
  })
}
export function apiHistory(params) {
  return request({
    url: 'search/histories',
    method: 'get',
    params
  })
}
export function apiDelHistory(params) {
  return request({
    url: 'search/histories',
    method: 'delete',
    params
  })
}
export function apiSearch(params) {
  return request({
    url: 'search',
    method: 'get',
    params
  })
}
