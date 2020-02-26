<template>
    <div class="login w100">
        <!-- 登录 容器 -->
        <el-container class="login_box br-5 m-auto">
            <!-- 标题 title -->
            <el-header class="login_header t-a-c c6">
                <h3 class="">{{$conf.logo}}</h3>
            </el-header>
            <!-- from 表单 -->
            <el-main>
                <el-form ref="ruleForm" :model="form" :rules="rules" >
                  <!-- 用户名 -->
                    <el-form-item prop="username">
                      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                      <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 登录按钮 -->
                    <el-form-item>
                      <el-button type="primary" @click="submit" class="w100" :loading="loading">{{loading ? "登陆中" : "点击登录"}}</el-button>
                    </el-form-item>
                </el-form>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      // 禁止重复点击
      loading: false,         
      form:{
        //用户名
        username:"",
        //密码              
        password:"",   
      },
      // 验证规则
      rules: {
        // 用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        //密码              
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'adminIndex'
    ])
  },
  methods:{
    // 提交效验
    submit () {
      this.$refs.ruleForm.validate((e) => {
        if (!e) return 
        // 提交表单
        this.loading = true
        this.axios.post('admin/login',this.form).then(res => {
          let data = res.data.data
          // 存储状态管理器
          this.$store.commit('login',data)
          // 生成后台菜单
          this.$store.commit('createNavBar',data.tree)
          // 存储权限规则
          if (data.role && data.role.rules) {
            let rules = window.sessionStorage.setItem('rules', JSON.stringify(data.role.rules))
            rules = rules ? rules : []
          }
          // 提示成功
          this.$message({
            message: '登陆成功',
            type: 'success'
          });
          this.loading = false
          // 跳转后台首页
          this.$router.push({name:this.adminIndex})
        }).catch(err => {
          this.loading = false
        })
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.login_box {
  width: 500px;
  border: 1px solid #999;
  margin-top: 250px;
  .login_header {
    line-height: 60px;
    font-size: 30px;
    border-bottom: 1px solid #999;
  }
}
</style>