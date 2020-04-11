import request from '@/utils/request'

export function userChannel(params) {
  return request({
    url: 'user/channels',
    method: 'get',
    params
  })
}
export function setChannel(data) {
  return request({
    url: 'user/channels',
    method: 'put',
    data
  })
}
export function channels(params) {
  return request({
    url: 'channels',
    method: 'get',
    params
  })
}
export function articleList(params) {
  return request({
    // 因为这里的接口版本不一样，所以前面的基地址不能再省略
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    method: 'get',
    params
  })
}
export function apiDisLIke(data) {
  request({
    url: 'article/dislikes',
    method: 'post',
    data
  })
}
export function apiReports(data) {
  request({
    url: 'article/reports',
    method: 'post',
    data
  })
}
