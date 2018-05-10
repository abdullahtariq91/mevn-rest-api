import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import './stylus/main.styl'
import VueLocalStorage from 'vue-localstorage'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'http://localhost:8080')
Vue.use(VueLocalStorage);
Vue.use(Vuetify);

//Create the App with the router
new Vue({
  sockets: {
    connect: function () {
      console.log('Socket connected.')
    },
    randomMessage: function (val) {
      console.log('Data from server received: ' + val)
    },
    disconnect: function () {
      console.log('Socket Disconnected');
    }
  },
  el: '#app',
  router,
  render: h => h(App)
})
