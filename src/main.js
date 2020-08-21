import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './assets/css/base.scss'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/loading/index'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
Vue.use(VueLazyload, {
  // 懒加载占位图片
  loading: require('./assets/images/loading.png')
})
Vue.use(Loading, {
  title: '正在加载...'
})

fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 预渲染插件自动生成代码
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
