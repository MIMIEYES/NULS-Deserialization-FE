import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import {post} from './api/https'
import JSONView from 'vue-json-viewer'
Vue.use(JSONView);

Vue.config.productionTip = false;
//定义全局变量
Vue.prototype.$post = post;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
