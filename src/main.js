// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './components/common/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'ko'}) 

Vue.config.productionTip = false
import { store } from './store/store.js' // store 사용
import router from './route/index.js' // route 사용

/* eslint-disable no-new */
new Vue({
   el: '#app',
   store, // store 사용
   router, // route 사용
   template: '<App/>',
   components: { App }
})
