// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//element-ui
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/global.css'
import Moment from 'moment'

import SecKillTimes from "./components/HomeChild/SecKillTimes"
import topDIV from "./components/topDIV";
Vue.component('timeCD',SecKillTimes)
Vue.component('topDiv',topDIV)

Vue.use(ElementUi)
Vue.use(VueAxios,axios)
Vue.prototype.moment = Moment

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

let whitelist = ['http://47.99.149.141:8000/login/dologin','http://47.99.149.141:8000/login/addUser']
axios.interceptors.request.use(config=>{
  console.log(config)
  if (whitelist.includes(config.url)) {
    return config
  }
  else {
    config.headers.Authorization = "Bearer " + JSON.parse(decodeURIComponent(window.atob(window.sessionStorage.getItem('token'))))
    return config
  }
})
