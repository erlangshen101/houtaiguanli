<template>
  <div id="app">
    <router-view></router-view>

    <!-- 选择图片弹出层 -->
    <el-dialog title="图片管理" class="dialog-box feixd" width="80%" :visible.sync="imageModel">
      <imageDialog ref="box" :maxl="max"/>
      <div slot="footer" class="absolute dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <skusDialog ref="skus"/>

  </div>
</template>

<script>
import imageDialog from '@/components/image/image_dialog'
import skusDialog from '@/components/skus/skus-dialog'
export default {
    name: 'app',
    // 依赖注入
    provide () {
      return {
        app:this
      }
    },
    data () {
      return {
        imageModel: false,
        callback: false,
        // 多少张
        max: Number,
        callbacks: false
      }
    },
    created () {
      // 初始化用户信息
      this.$store.commit("initUser")
      // 初始化后台菜单
      this.$store.commit('initNavbar')
    },
    methods: {
      // 打开弹出层
      chooseImage (callback, max = 9) {
        this.max = max
        this.callback = callback
        this.$nextTick( () => {
          this.$refs.box.chooseList = []
          this.$refs.box.cancelImglist()
        })
        this.imageModel = true
      },
      // 点击确定
      confirm () {
        // 选中的图片url
        // 隐藏弹出层
        if (typeof this.callback == 'function') {
          this.callback(this.$refs.box.chooseList)
        }
        this.hide ()
      },
      //点击隐藏
      hide () {
        this.imageModel = false
        this.callback = false
      },
      // 打开规格弹出层
      chooseSkus (callbacks) {
        this.callbacks = callbacks
        this.$refs.skus.skusModel = true
      },
      // 点击确定
      confirms () {
        if (typeof this.callbacks == 'function') {
          this.callbacks(this.$refs.skus.chooseList)
        }
      },
    },
    components: {
      imageDialog,
      skusDialog
    }

}
</script>

<style lang="scss" scoped>
@import '../public/css/reset.css';
@import '../public/css/public.css';
/deep/.el-dialog {
  margin-top: 4vh !important;
  margin-bottom: 0 !important;
  height: 91vh;
}
/deep/.el-dialog__body {
  padding: 15px 20px;
}
.dialog-footer {
  right: 20px;
  bottom: 15px;
}
</style>