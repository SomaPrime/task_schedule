import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  ready: function(){
    var self = this;
    document.onscroll = function(){
      self.position = document.documentElement.scrollTop || document.body.scrollTop;
    }
  }
}).$mount('#app')
