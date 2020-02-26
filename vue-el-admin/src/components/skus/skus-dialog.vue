<template>
      <el-dialog title="规格管理" width="80%" :visible.sync="skusModel">
        <!-- 容器 -->
        <el-container>
          <!-- 侧边栏 -->
          <el-aside width="200px">
            <ul>
              <li @click="infom = index" :class="{'active':infom == index}" v-for="(item,index) in skusValu" :key="index">{{item.name}}</li>
            </ul>
          </el-aside>
          <!-- 主体区域 -->
          <el-container>
            <!-- 头部 -->
            <el-header class="header flex-x a-i-c">
              <el-button type="success" @click="Allelection" size="mini">{{titl}}</el-button>
            </el-header>
            <!-- 身子 -->
            <el-main>
              <ul class="flex-x option">
                <li :class="{'active':item.ischek}" @click="item.ischek = !item.ischek" v-for="(item,index) in skusValu[infom].skus" :key="index">{{item.name}}</li>
              </ul>
            </el-main>
          </el-container>
        </el-container>
        <!-- 底部 -->
        <div slot="footer" class=" dialog-footer">
          
          <el-button @click="hide">取 消 </el-button>
          <el-button type="primary" @click="confirms">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  inject :['app'],
  data () {
    return {
      skusModel: false,
      infom: 0,
      skusValu: [
        {
          name:'颜色',
          skus:[
            {
              name:'蓝色',
              ischek:false,
            },
            {
              name:'黄色',
              ischek:false,
            },
            {
              name:'绿色',
              ischek:false,
            },
          ]
        },
        {
          name:'大小',
          skus:[
            {
              name:'大',
              ischek:false,
            },
            {
              name:'中',
              ischek:false,
            },
            {
              name:'小',
              ischek:false,
            },
          ]
        },
        {
          name:'尺寸',
          skus:[
            {
              name:'XL',
              ischek:false,
            },
            {
              name:'XXL',
              ischek:false,
            },
            {
              name:'XS',
              ischek:false,
            },
          ]
        }
      ],
      chooseList: {}
    }
  },
  computed:{
    titl() {
      let a = 0
      let title = '全选'
      this.skusValu[this.infom].skus.forEach (val => {
        if (val.ischek == true) {
          a ++
        } 
      })
      if (a !== this.skusValu[this.infom].skus.length) {
        title = '全选'
      } else {
        title = '取消全选'
      }
      return title
    }
  },
  watch: {
    infom (a,b) {
      this.skusValu[b].skus.forEach (val => {
        val.ischek = false
      })
    }
  },
  methods:{
    // 侧边栏选中
    specification (index) {
      this.infom = index
    },
    // 取消
    hide () {
      this.skusModel = false
      this.Allelection('fa')
    },
    // 确定
    confirms () {
      let list = this.skusValu[this.infom].skus.filter(val => {
        return (val.ischek !== false)
      })
      let lists = JSON.parse(JSON.stringify(this.skusValu[this.infom])) 
      lists.skus = list
      this.chooseList = lists
      this.hide ()
      this.app.confirms()
    },
    // 是否全选
    Allelection (fa) {
      let all = ''
      if (this.titl == '取消全选' || fa == 'fa') {
        all = false
      }else {
        all= true
      }
      this.skusValu[this.infom].skus.forEach (val => {
        val.ischek = all
      })
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog {
  height: auto !important;
}
/deep/.el-dialog__body {
  padding: 0 !important;
  height: 500px;
}
.el-aside {
  height: 500px;
  border-right: 1px solid #ddd;
}
.el-aside li {
  height: 50px;
  border-bottom: 1px solid #ddd;
  line-height: 50px;
  padding-left: 20px;
}
.header {
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.option li {
  width: 45px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #000;
  margin: 10px;
  border-radius: 3px;
}
.active {
  background: #85ce61;
  color: #fff;
}
</style>