// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入公共css样式
import '../static/js/jquery-1.9.0.min.js'
import '../static/css/public.css'
import '../static/css/iconfont.css'
import '../static/css/iconfont1.css'
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import './guard/index' // 导航守卫
import './utils/directive' // 指定暴露
import ElementUI from 'element-ui'
import Avue from '@smallwei/avue'
// import 'element-ui/lib/theme-chalk/index.css';
// import '@smallwei/avue/lib/theme-chalk/index.css'

// import vCalendar from 'v-calendar'
import echarts from 'echarts'
import Api from '@/api' // 全局请求
// 防止刷新空白页丅
import { getStore } from '@/utils/store'
import { getMenuRouter, getRouterList } from '@/utils/router'
import Vuebar from 'vuebar'
Vue.use(Vuebar)
import VModal from 'vue-js-modal'
Vue.use(VModal, { dialog: true })

// 防止刷新空白页方法
let menu = getStore({ name: 'menu', type: 'session' })
// console.log(menu,'main')
// console.log(window.location.href,'window.location.href')
if (menu != undefined && router.options.routes.length <= 3) {
  let routerData = getMenuRouter(menu)
  // addRoutes动态添加路由
  router.options.routes = []
  router.addRoutes(routerData)
  router.options.routes.push(routerData)
  store.commit('SET_ROUTER_LIST', [])
  store.commit('SET_ROUTER_LIST', getRouterList(routerData))
}
// 防止刷新空白页丄

Vue.prototype.Api = Api
Vue.prototype.$echarts = echarts
// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true

//  自定义表单
import FormMaking from 'form-customs'
import 'form-customs/dist/FormCustoms.css'
Vue.use(FormMaking)
import VCalendar from 'v-calendar'
Vue.use(VCalendar)
// 全局初始化 Element-ui
Vue.use(ElementUI)
// Vue.use(vCalendar)
// 全局初始化 Avue
Vue.use(Avue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
