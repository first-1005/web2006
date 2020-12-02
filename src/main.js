import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/css/common.css'
import './plugins/element.js'
import './router/permission';
import jwt from 'jwt-decode';
import './utils/eventBus';
import ElementTable from './components/element-table/index';
// if(localStorage.getItem('ego-path')){

// }

if(localStorage.getItem('ego')){
  store.commit('loginModule/setUserInfo',{
    username:jwt(localStorage.getItem('ego')).username,
    token:localStorage.getItem('ego')
  })
}

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.config.productionTip = false
Vue.use(ElementTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
