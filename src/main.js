import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
//安装 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//基于断点的隐藏类
import 'element-ui/lib/theme-chalk/display.css';
import "./assets/css/global.css"

// 使用animate.css动画库
import animated from "animate.css"
Vue.use(animated)

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})