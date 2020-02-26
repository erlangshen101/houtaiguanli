import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'default-passive-events'
//引入全局配置文件
import $conf from './common/config/config.js'
import store from './store/index'
import VueDND from 'awe-dnd'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Message } from 'element-ui';
import { Loading } from 'element-ui';

Vue.use(VueAxios, axios)
Vue.prototype.$conf = $conf
Vue.use(ElementUI);
Vue.use(VueDND)

// 自定义指令
Vue.directive('auth',{
  inserted (el,binding) {
    let user = JSON.parse(window.sessionStorage.getItem('user')) 
    let rules = user.ruleNames ? user.ruleNames : []
    if (!user.super) {
      let v = rules.find((v) => {
        return v == binding.value
      })
      if (!v) {
        el.remove()
      }
    }
  }
})

let loading   //定义loading变量

//显示loading
function showLoading () {
  loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 隐藏loading
function hiedLoading () {
  loading.close()
}

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// 请求拦截器
axios.interceptors.request.use((config) => {
  // showLoading()
  // 发起请求 如果 token 为true 就加上 token值
  let token = JSON.parse(window.sessionStorage.getItem('token')) 
  if (config.token === true) {
    config.headers['token'] = token
  }   
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  // hiedLoading ()
  return response
}, (err) => {
  // 对响应错误做点什么  
  if (err.response && err.response.data && err.response.data.errorCode) {
    Message.error(err.response.data.msg)
  }
  hiedLoading ()
  return Promise.reject(err)
})
