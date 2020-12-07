import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_NAME = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_NAME)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(TOKEN_NAME, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
