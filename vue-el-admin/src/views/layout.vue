<template>
  <el-container class="layout absolute hidden">
    <!-- 头部 -->
    <el-header class="flex-x a-i-c">
      <a class="f18 cf fw m-r-a">{{$conf.logo}}</a>
      <el-menu
        :default-active="navBar.active"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item v-for="(item,index) in navBar.list" :key="index" :index="index|numToString">{{item.name}}</el-menu-item>
        <el-submenu index="100">
          <template slot="title">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar> {{user.username}}
          </template>
          <el-menu-item index="100-1">修改</el-menu-item>
          <el-menu-item index="100-2">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container class="h100 layout_content">
      <!-- 监听侧边栏 -->
      <el-aside width="200px">
        <el-menu
          :default-active="slideMenuActive"
          class="el-menu-vertical-demo h100"
          @select="slideSelect"
        >
          <el-menu-item :index="index|numToString" v-for="(item,index) in slideMens" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主布局 -->
      <el-main class="relative" v-loading="loading">
        <!-- 面包屑导航 -->
        <div class="crumbs" v-if="Crumbs.length > 0">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in Crumbs" :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 组件 视图 -->
        <router-view></router-view>
        <!-- 回到顶部 -->
        <el-backtop target=".el-main" :bottom="100">
          <div
          >
            UP
          </div>
        </el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import common from '@/common/mixins/common.js'
import { mapState } from 'vuex'
export default {
  mixins:[common],
  provide () {
    return {
      layout: this
    }
  },
  data() {
    return {
      // 面包屑 导航数据
      Crumbs:[],
      loading:false
    };
  },
  watch: {
    '$route'(to,from) {
      // 当前操作存储起来
      sessionStorage.setItem("navActive",JSON.stringify({
        top:this.navBar.active,
        left:this.slideMenuActive
      }))
      this.getRouterBran()
    }
  },
  created () {
    // 获取面包屑导航
    this.getRouterBran ()
    // 初始化菜单
    this.__initNavbar ()
  },
  computed:{
    // 获取 用户 头像/名
    ...mapState({
      user : state => state.user.user,
      navBar : state => state.menu.navBar
    }),
    // 侧边栏位置
    slideMenuActive:{
      // 获取侧边栏
      get () {
        let item = this.navBar.list[this.navBar.active]
        return item ? item.subActive : '0'
      },
      // 设置侧边栏
      set (val) {
        let item = this.navBar.list[this.navBar.active]
        if (item) {
          item.subActive = val
        }
        this.navBar.list[this.navBar.active].subActive = val
      }
    },
    // 切换头部导航 获取侧边栏数据
    slideMens () {
      let item = this.navBar.list[this.navBar.active]
      return item ? item.submenu : []
    }
  },
  methods: {
    // 获取本地存储
    __initNavbar () {
      // 获取 头部点击导航 记录
      let r = sessionStorage.getItem("navActive")
      if (r) {
        r = JSON.parse(r)
        this.navBar.active = r.top,
        this.slideMenuActive = r.left
      }
    },
    // 头部导航 监听
    handleSelect(key, keyPath) {
      // 修改信息
      if (key === '100-1') {
      }
      // 退出登录
      if (key === '100-2') {
        return this.logout()
      }
      this.navBar.active = key
      // 头部导航跳转到 对应组件
      this.slideMenuActive = '0'
      if (this.slideMens) {
        this.$router.push({
          name:this.slideMens[this.slideMenuActive].pathname
        })
      }
    },
    // 侧边栏导航 监听
    slideSelect(key, keyPath) {
      this.slideMenuActive = key
      // 侧边栏 跳转对应 组件
      this.$router.push({
        name:this.slideMens[key].pathname
      })
    },
    // 获取面包屑导航
    getRouterBran () {
      let box = []
      this.$route.matched.filter(v =>{
        if (v.name === 'index' || v.name === 'layout') return
        box.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        })
        if (box.length > 0) {
          box.unshift({
            name:'layout',
            path:'layout',
            title:'后台首页'
          })
        }
      })
      this.Crumbs = box
    },
    // 退出登录
    logout() {
      this.axios.post('/admin/logout',{},{
        token: true
      }).then(res => {
        this.$message({
          message: '退出登录成功',
          type: 'success'
        });
        this.$store.commit('logout')
        this.$router.push('/login')
      }).catch(res => {
        this.$store.commit('logout')
        this.$router.push('/login')
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.layout {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  // 头部
  .el-header {
    background: #545c64;
  }
  .layout_content {
    // 侧边布局
    .el-aside {
      
    }
    // 主布局
    .el-main {
      background: #dddddd26;
      .crumbs {
        border-bottom: 1px solid #ddd;
        margin: -20px;
        padding: 20px;
        margin-bottom: 10px;
        background: #fff;
      }
    }
  }
}
</style>