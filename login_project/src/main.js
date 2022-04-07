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

