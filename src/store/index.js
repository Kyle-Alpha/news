import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getToken()
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = obj
    },
    setNewToken(state, token) {
      state.userInfo.token = token
    }
  },
  actions: {},
  modules: {}
})
