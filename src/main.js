import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
axios.defaults.baseURL = 'http://127.0.0.1:3007/api'
Vue.prototype.$http = axios



axios.interceptors.request.use(config => {
  config.headers.authorization = window.sessionStorage.getItem('token')
  switch (config.method) {
    case "get":
      if (!config.params) {
        config.params = {}
      }
      break
    case "post":
      if (!config.data) {
        config.data = {}
      }
      if (config.type === "keyValue") {
        config.data = Qs.stringify(config.data) //配套application/x-www-form-urlencoded使用
      } else {
        config.headers["Content-Type"] = "application/json" //配套application/json使用
      }
      break
  }
  // config.data = JSON.stringify(config.data)
  return config
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this

  }
}).$mount('#app')
