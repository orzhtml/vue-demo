import Vue from 'vue'
import {
  Button,
  Select,
  Option,
  Loading,
  Container,
  Header,
  Main,
  Input
} from 'element-ui'
import 'vue-i18n'
import * as api from './api'
import * as util from './util'
import * as filters from './util/filters'
import router from '@/router'
import App from './App.vue'
import '@/styles/main.scss'

// 添加常用自定义组件
// 动态引入./components 下的文件
const requireComponent = require.context(
  './components',
  false,
  /\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的命名
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
// 配置全局过滤器
for (let key in filters) {
  if (Object.hasOwnProperty.call(filters, key)) {
    Vue.filter(key, filters[key])
  }
}
// 添加公用函数引用
Vue.prototype.$util = util

// 配置全局api调用方式
for (let key in api) {
  if (Object.hasOwnProperty.call(api, key)) {
    Vue.prototype['$' + key] = api[key]
  }
}

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Input)

// element-ui api引用
Vue.prototype.$loading = function (options = {}) {
  return Loading.service({ text: 'loading', background: 'rgba(0,0,0,0)', ...options })
}
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App)
// }).$mount('#app')
export default new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
