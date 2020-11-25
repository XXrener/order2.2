import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import MuseUI from 'muse-ui'  //UI框架引入 配套图标库引入失败 弃用
// import 'muse-ui/dist/muse-ui.css'

// import 'typeface-roboto'  //字体引入
// Vue.use(MuseUI)

// axios 引入
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import smoothscroll from 'smoothscroll-polyfill';  //滚动条插件兼容
smoothscroll.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

import Mess from "./components/message/mess.vue"
Vue.component("Mess",Mess)
import viewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(viewUI)

//Jquery 引入
import $ from 'jquery'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  $,
  render: h => h(App)
}).$mount('#app')
