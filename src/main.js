import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'amfe-flexible'
// 加载vant 全局样式表
import 'vant/lib/index.css'

// 引入全局样式表
import './styles/index.less'

import '@/utils/dayjs'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
