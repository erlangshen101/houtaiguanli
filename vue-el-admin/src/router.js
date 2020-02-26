import Vue from 'vue'
import Router from 'vue-router'
import routes from './common/config/router.js'
Vue.use(Router)

let router = new Router({ routes, mode:'history' })

// 全局前置守卫
router.beforeEach((to,from,next) => {
    let token = window.sessionStorage.getItem('token')
    if (token) {
        // 验证 防止重复登陆
        if (to.path == '/login') {
            Vue.prototype.$message.error("不能重复登陆")
            return next('/index')
        }
        if (to.name !== 'error_404') {
            // 其他验证
            let rules = window.sessionStorage.getItem('rules')
            rules = rules ? JSON.parse(rules) : []
            let index = rules.findIndex(item => {
                return item.rule_id > 0 && item.desc === to.name
            })
            if (index === -1) {
                Vue.prototype.$message.error('你没有权限')
                return next({name:from.name ? from.name : 'error_404'})
            }
        }
        return next()
    }else {
        if ( to.path == '/login' ) {
            return next ()
        }else {
            Vue.prototype.$message.error("请先登录")
            return next('/login')
        }
    }
})


export default router



