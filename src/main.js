import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routers} from './routers';

Vue.config.productionTip = false

const router = new VueRouter({
  routers,
  mode: 'history'
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
