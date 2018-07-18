import Vue from 'vue'
import App from './App.vue'

import calendarSlider from './component/'
Vue.use(calendarSlider)

new Vue({
  el: '#app',
  render: h => h(App)
})
