import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载这个插件
dayjs.extend(relativeTime)
// 导入中文语言包
// 把语言设置为中文包
dayjs.locale('zh-cn')

// 设置一个全局的过滤器
Vue.filter('formatTime', (value) => {
  // 过滤时间，返回相对时间
  return dayjs().from(value)
})
Vue.filter('formatDate', (value) => {
  // 过滤时间，返回相对时间
  return dayjs(value).format('YYYY-MM-DD')
})
