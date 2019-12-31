//引入公共css样式
import '../static/css/public.css'
import '../static/css/iconfont.css'
import Vue from 'vue'
import Inlay from './Inlay.vue'
import router from './router/inlay'
import store from './store'
import './guard/inlay'; // 导航守卫
import './utils/directive'; // 指定暴露
import ElementUI from 'element-ui';
import Avue from '@smallwei/avue';
import echarts from 'echarts'
import Api from '@/api' // 全局请求

Vue.prototype.Api = Api
// 阻止 vue 在启动时生成生产提示
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
// 开启debug模式
Vue.config.debug = true
import VCalendar from 'v-calendar';
Vue.use(VCalendar,{
  locale: 'zh-CN',
  masks: {
    title: 'YYYY MMMM',
    // data: 'YYYY-MM-DD',
    // input: 'YYYY-MM-DD',
    L: 'YYYY-MM-DD',
  }
});

// 全局初始化 Element-ui
Vue.use(ElementUI);
// 全局初始化 Avue
Vue.use(Avue);


/* eslint-disable no-new */
new Vue({
  el: '#inlay',
  router,
  store,
  components: {
    Inlay
  },
  template: '<Inlay/>'
})
