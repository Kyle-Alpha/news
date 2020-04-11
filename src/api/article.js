import request from '@/utils/request'

export function apiZan(data) {
  return request({
    url: 'article/likings',
    method: 'POST',
    data
  })
}
export function apiDelZan(params) {
  return request({
    url: `article/likings/${params}`,
    method: 'delete'
  })
}
export function apiArticle(params) {
  return request({
    url: `articles/${params}`,
    method: 'get'
  })
}

// 对文章点赞
export function articleLike(data) {
  return request({
    url: 'article/likings',
    method: 'post',
    data
  })
}

// 对文章取消点赞
export function articleCancelLike(data) {
  return request({
    url: `article/likings/${data.art_id}`,
    method: 'delete'
  })
}

// 对文章不喜欢
export function articleBuXiHuan(data) {
  return request({
    url: 'article/dislikes',
    method: 'post',
    data
  })
}

// 对文章取消不喜欢
export function articleQxbxh(data) {
  return request({
    url: `article/dislikes/${data.art_id}`,
    method: 'delete'
  })
}

// 对文章收藏
export function articleShouCang(data) {
  return request({
    url: 'article/collections',
    method: 'post',
    data
  })
}

// 取消收藏
export function articleQxShouCang(data) {
  return request({
    url: `article/collections/${data.target}`,
    method: 'delete'
  })
}
