// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import highcharts from 'highcharts'
/**
 * @引入全局变量  vuex
 */
import Guser from '@/vuex/Guser'

/** */
Vue.prototype.$axios = axios
Vue.prototype.$highcharts = highcharts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:Guser,
  components: { App },
  template: '<App/>'
})
