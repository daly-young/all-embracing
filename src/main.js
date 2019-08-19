import Vue from 'vue'
import App from './App.vue'
// // 组件库
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
// 请求封装
import './plugins/axios.js'

// Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
