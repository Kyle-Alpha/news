import request from '@/utils/request'

// 关注用户的接口
export function followUser(data) {
  return request({
    url: 'user/followings',
    method: 'post',
    data
  })
}

// 取关用户的接口
export function quguanUser(data) {
  return request({
    url: `user/followings/${data.aut_id}`,
    method: 'delete'
  })
}

// 获取自己的信息
// 获取用户名、头像、简介、发布文章数量、关注数量
// 被关注的数量、被点赞数量
export function getInfo() {
  return request({
    url: 'user',
    method: 'get'
  })
}

// 获取自己的其他资料
// 头像、用户名、手机号、性别、生日
export function getProfile() {
  return request({
    url: 'user/profile',
    method: 'get'
  })
}

// 上传头像的接口
export function uploadPhoto(photo) {
  let fm = new FormData()
  // key叫photo,值就用我们刚刚传过来的图片
  fm.append('photo', photo)

  return request({
    url: 'user/photo',
    method: 'patch',
    data: fm
  })
}

// 修改用户资料的接口
export function editProfile(data) {
  return request({
    url: 'user/profile',
    method: 'patch',
    data
  })
}
