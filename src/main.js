import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入字体库
import '@/style/font.css'
import '@/style/base.css'
// 导入全局过滤
import '@/filters/filter'
// 导入组件包
import '@/plugins/vant'
import '@/plugins/login'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
