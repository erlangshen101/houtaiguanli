import { log } from "util"

export default {
  state: {
    user: {},
    token: false,
  },
  getters: {

  },
  mutations: {
    // 初始化信息
    initUser(state) {
      let user = JSON.parse(window.sessionStorage.getItem("user"))
      if (user) {
        state.user = user
        state.token = user.token
      }
    }, 
    // 登录
    login(state,user){
      // 保存登录状态
      state.user = user
      state.token = user.token
      // 存储到本地存储
      window.sessionStorage.setItem('user',JSON.stringify(state.user))
      window.sessionStorage.setItem('token',JSON.stringify(state.token))
    },
    // 退出登录
    logout (state) {
      state.user = {}
      state.token = false
      window.sessionStorage.removeItem('user')
      window.sessionStorage.removeItem('token')
    }
  },
  actions: {

  }
}