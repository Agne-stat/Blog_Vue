import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('snippetTitle', function(value){
  return value.slice(0,15)
})

Vue.filter('snippet', function(value){
  return value.slice(0,20) + ' ...'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
