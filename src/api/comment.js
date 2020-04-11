import request from '@/utils/request'

// 获取评论的接口
export function commentList(params) {
  return request({
    url: 'comments',
    method: 'get',
    params
  })
}

// 添加评论的接口
export function commentAdd(data) {
  return request({
    url: 'comments',
    method: 'post',
    data
  })
}

// 评论点赞
export function commentLike(data) {
  return request({
    url: 'comment/likings',
    method: 'post',
    data
  })
}

// 评论取消点赞
export function commentUnLike(data) {
  return request({
    url: `comment/likings/${data.target}`,
    method: 'delete'
  })
}
