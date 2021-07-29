import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routers} from './routers';
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueVirtualScroller)

const router = new VueRouter({
  routers,
  mode: 'history'
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
