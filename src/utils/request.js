import axios from 'axios'
import store from '@/store/index'
import JSONBIgInt from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [
    function(data) {
      try {
        return JSONBIgInt.parse(data)
      } catch {
        return data
      }
    }
  ]
})
// 请求拦截器
request.interceptors.request.use(
  config => {
    if (store.state.userInfo) {
      config.headers.Authorization = 'Bearer ' + store.state.userInfo.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data
  },
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: 'Bearer ' + store.state.userInfo.refresh_token
          }
        })
        store.commit('setNewToken', res.data.data.token)
        return request(error.config)
      } catch (error) {
        console.log(error)
      }
    }
  }
)
export default request
