import store from '@/store/index'
import Vue from 'vue'
var loginObj = {}
loginObj.install = function() {
  Vue.prototype.$login = function() {
    if (!store.state.userInfo) {
      return false
    }
    return true
  }
}
Vue.use(loginObj)
