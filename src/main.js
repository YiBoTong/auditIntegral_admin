import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import VCharts from 'v-charts'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data

import download from './mixin/download'
import util from './mixin/util'

import * as filters from './filters' // global filters

import './styles/sass/index.scss' // 样式

// 封装的input和button
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
Vue.component('BaseInput', BaseInput)
Vue.component('BaseButton', BaseButton)

require('es6-shim')

Vue.use(VCharts)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.mixin(download)
Vue.mixin(util)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
