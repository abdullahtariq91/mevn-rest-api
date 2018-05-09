import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import './stylus/main.styl'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage);
Vue.use(Vuetify);

//Create the App with the router
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
