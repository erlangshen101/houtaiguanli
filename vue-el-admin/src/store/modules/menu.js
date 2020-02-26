export default {
  state: {
    // 数据列表
    navBar: {
      active: "0",
      list: []
    }
  },
  getters: {
    // 首页
    adminIndex (state) {
      if (state.navBar.list.length == 0) {
        return 'error_404'
      }
      let item = state.navBar.list[0].submenu[0]
      if (item) {
        return item.pathname
      }
      
    } 
  },
  mutations: {
    // 创建菜单
    createNavBar(state, menus) {
      // menus 代表 data.tree 菜单数据
      let list = menus.map(item => {
        // 遍历子菜单
        let submenu = item.child.map(value => {
          return {
            icon: value.icon,
            name: value.name,
            pathname: value.desc
          }
        })
        // 父菜单
        return {
          name: item.name,
          subActive: '0',
          submenu: submenu
        }
      })
      state.navBar.list = list
      window.sessionStorage.setItem('navBar',JSON.stringify(state.navBar))
    },
    // 初始化菜单
    initNavbar (state) {
      let navBar = window.sessionStorage.getItem ('navBar')
      navBar = navBar ? JSON.parse(navBar) : {
        active: "0",
        list: []
      }
      state.navBar = navBar
    }
  },
  actions: {

  }
}