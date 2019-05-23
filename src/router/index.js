import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/index.vue')
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes // (缩写) 相当于 routes: routes
})
