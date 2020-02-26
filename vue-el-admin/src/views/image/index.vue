<template>
  <div class="image-box absolute">
    <el-container>
      <!-- 头部 -->
      <el-header class="flex-x a-i-c">
        <div class="flex-x m-r-a">
          <el-select v-model="searchFrom.order" placeholder="请选择图片排序方式">
            <el-option label="升序" value="asc"></el-option>
            <el-option label="降序" value="desc"></el-option>
          </el-select>
          <el-input v-model="searchFrom.keyword" class="m-l10 m-r10"></el-input>
          <el-button type="success" style="height:40px" @click="getAlbumList">搜索</el-button>
        </div>
        <div>
          <el-button type="danger"  @click="cancelImglist">取消选中</el-button>
          <el-button type="danger"  @click="delImglist">批量删除</el-button>
          <el-button type="success" @click="modifyAlbum(false)">创建相册</el-button>
          <el-button type="warning" @click="upload = true">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="absolute">
          <div class="w100">
            <ul class="aside-list" v-if="AlbumData">
              <AlbumItme
                v-for="(item,index) in AlbumData"
                :key="index"
                @click.native="activeCli(index)"
                :class="{'active' : activeIndex == index}"
                @modifyAlbum="modifyAlbum"
                @spliceAlbum="spliceAlbum"
                :item="item"
                :index="index"
              />
            </ul>
          </div>
        </el-aside>
        <el-container>
          <!-- 身体 -->
          <el-main class="absolute">
            <el-row :gutter="10" v-if="AlbumList">
              <el-col :span="24" :lg="4" :md="6" :sm="8"
                v-for="(item,index) in AlbumList"
                :key="index"
                class="m-b25">
                <el-card class="box-card" shadow="hover"
                 @click.stop.native="item.activeMask = !item.activeMask , activeMask(item)" :class="{'activeShow':item.activeMask}">
                  <div class="relative mask-img">
                    <img class="w100" :src="item.img" alt="">
                    <div class="absolute mask">{{item.name}}</div>
                    <div class="t-a-c mask-btn">
                      <el-button-group>
                        <el-button @click="MagnifierCli(item.img)" icon="el-icon-view" size="mini"></el-button>
                        <el-button @click="modifyCli(item.name,index)" icon="el-icon-edit" size="mini"></el-button>
                        <el-button @click="deLimg(index)" icon="el-icon-delete" size="mini"></el-button>
                      </el-button-group>
                    </div>
                    <div class="absolute tou t-a-c f12 cf" v-if="item.activeMask">{{item.chekeOrder}}</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <!-- 底部 -->
      <el-footer class="absolute p0 t-a-c flex-x">
        <!-- 侧边栏分页 -->
        <div class="sidebarPaging h100">
          <el-button-group>
            <el-button size="mini" @click="previousPage" :disabled="this.albumPage == 1">上一页</el-button>
            <el-button size="mini" @click="nextPage"
            :disabled="Math.ceil(this.slbtotalCount / this.sidebarPageSize) == this.albumPage">下一页</el-button>
          </el-button-group>
        </div>
        <!-- 内容分页 -->
        <div class="contentPaging flex-x a-i-c m-l25">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 修改或者创建相册 -->
    <el-dialog
      :title="commoni >= 0 && '修改相册' || commoni == -1 && '创建相册'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="modifyData" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="modifyData.name" size="medium" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input-number v-model="modifyData.num" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Determine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="upload" width="40%">
      <div class="t-a-c">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- 放大镜 -->
    <el-dialog :visible.sync="Magnifier" width="40%" class="relative Magnifier">
      <img :src="MagnifierImg" alt="" class="w100 absolute">
    </el-dialog>
  </div>
</template>

<script>
import AlbumItme from "@/components/image/Album_itme";
import common from "@/common/mixins/common.js";
export default {
  inject:['layout'],
  mixins: [common],
  data() {
    return {
      // 上传图片 开关
      upload: false,
      // 头部绑定数据
      searchFrom: {
        order: "asc",
        keyword: ""
      },
      dialogVisible: false,
      activeIndex: 0,
      // 侧边栏数据
      AlbumData: [],
      // 修改
      commoni: 0,
      modifyData: {
        name: "",
        num: 0
      },
      // 图片放大
      Magnifier: false,
      MagnifierImg: '',
      // 相册数据
      AlbumList: [],
      // 侧边栏id 分页
      sidebarPageSize: 5,
      albumPage: 1,
      slbtotalCount: null,
      // 图片分页
      currentPage: 1,
      pageSize: 5,
      totalCount: null,
      pageSizes: [5 , 10 , 20 , 30]
    };
  },
  created() {
    // 调用侧边栏数据
    this.getAlbum();
  },
  computed: {
    // 当前选中图片列表url
    getImageListUrl () {
      let id = this.AlbumData[this.activeIndex].id
      let keyword = ''
      if (this.searchFrom.keyword) {
        keyword = this.searchFrom.keyword
      }
      return `/admin/imageclass/${id}/image/${this.currentPage}?limit=${this.pageSize}&order=${this.searchFrom.order}&keyword=${keyword}`
    }
  },
  methods: {
    // 获取侧边栏数据
    async getAlbum() {
      this.layout.loading = true
      await this.axios.get(`/admin/imageclass/${this.albumPage}?limit=${this.sidebarPageSize}`,{
        token: true
      }).then(res => {
        this.slbtotalCount = res.data.data.totalCount
        this.AlbumData = res.data.data.list.map(v => {
          return {
            id : v.id,
            name: v.name,
            order: v.order,
            num: v.images_count
          }
        })
      })
      // 调用相册数据
      await this.getAlbumList();
    },
    // 获取相册数据
    getAlbumList () {
      this.axios.get(this.getImageListUrl,{
        token: true,
      }).then(res => {
        // 获取总共多少页
        this.totalCount = res.data.data.totalCount
        this.AlbumList = res.data.data.list.map(v => {
          return {
            id: v.id,
            img: v.url,
            name: v.name,
            activeMask:false,
            chekeOrder: 0
          }
        });
        this.layout.loading = false
      })
    },
    // 删除侧边栏 相册
    spliceAlbum(index) {
      // 弹窗 提示 删除
      this.$confirm("您是否要删除此相册?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "删除相册",
            message: "删除成功!"
          });
          this.AlbumData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "取消删除",
            message: "已取消删除"
          });
        });
    },
    // 修改 侧边栏/创建  相册
    modifyAlbum(obj) {
      this.dialogVisible = true;
      if (obj) {
        let { item, index } = obj;
        this.modifyData.name = item.name;
        this.modifyData.num = item.num;
        this.commoni = index;
        return false;
      }
      this.modifyData = {
        name: "",
        num: 0
      };
      this.commoni = -1;
    },
    // 确定修改
    Determine() {
      this.dialogVisible = false;
      if (this.commoni >= 0) {
        let item = this.AlbumData[this.commoni]
        this.axios.post(`/admin/imageclass/${item.id}`,{
          order: this.modifyData.num,
          name: this.modifyData.name
        },{
          token: true
        }).then(res => {
          window.console.log(res);
        })
        return false;
      }
      this.AlbumData.unshift({
        name: this.modifyData.name,
        num: this.modifyData.num
      });
    },
    // 侧边栏 动态 样式
    activeCli(index) {
      this.activeIndex = index;
      this.getAlbum()
    },
    // 点击图片放大 
    MagnifierCli (src) {
      this.MagnifierImg = src
      this.Magnifier = true;
    },
    // 修改图片内容
    modifyCli(name,index) {
       this.$prompt('请输入新名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage:"内容不能为空",
          inputValue:name,
          inputValidator (value) {
            if (value == null) {
              return false
            }
          }
        }).then(({ value }) => {
          this.AlbumList[index].name = value
        })
    },
    // 删除图片
    deLimg (index) {
       this.$confirm('是否删除此图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.AlbumList.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
    },
    // 选中图片
    activeMask (val) {
      let a = 0
      for (let i = 0; i < this.AlbumList.length; i++) { 
        if (this.AlbumList[i].activeMask) {
          a ++
          this.AlbumList[i].chekeOrder = a
        }
      }
      // 选中的图片 添加到数组里
    },
    // 批量删除
    delImglist () {
      for (var i = this.AlbumList.length-1;i>=0;i--) { 
        if (this.AlbumList[i].activeMask) {
          this.AlbumList.splice(i,1)
        }
      }
    },
    // 取消选中 
    cancelImglist () {
      for (var i = 0; i < this.AlbumList.length; i++ ) { 
        this.AlbumList[i].activeMask = false
        this.AlbumList[i].chekeOrder = 0
      }
    },
    // 100 / 200 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getAlbumList ()
    },
    // 1 / 2 / 3 分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAlbumList ()
    },
    // 上一页
    previousPage () {
      this.albumPage --
      this.getAlbum()
    },
    // 下一页
    nextPage () {
      this.albumPage ++
      this.getAlbum()
    },
  },
  components: {
    AlbumItme
  }
};
</script>

<style lang="scss" scoped>
// 最大容器
.image-box {
  top: 55px;
  left: 0;
  bottom: 0;
  right: 0;
  // 头部
  .el-header {
    .el-input {
      width: 180px;
    }
    .el-select {
      width: 180px;
    }
  }
  // 侧边栏
  .el-aside {
    left: 0;
    top: 60px;
    bottom: 60px;
    background: #fff;
    .aside-list li:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .aside-list .active {
      color: #67c23a !important;
      background-color: #f0f9eb !important;
      border-color: #c2e7b0 !important;
    }
    .aside-list li {
      height: 60px;
      .el-dropdown {
        width: 60px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #ddd;
        span {
          padding: 7px;
        }
      }
    }
  }
  // 身体
  .el-main {
    left: 200px;
    top: 60px;
    bottom: 60px;
    right: 0;
    border-top: 1px solid #ddd;
    .el-col {
      .box-card {
        border-radius: 0;
        .tou {
          top: 0;
          right: 0;
          background: red;
          width: 20px;
          height: 20px;
          line-height: 20px;
        }
        /deep/.el-card__body {
          padding: 0;
          .mask-img {
            img {
              height: 150px;
            }
            .mask {
              top: 120px;
              color: #fff;
              left: 0;
              right: 0;
              height: 30px;
              line-height: 30px;
              padding-left: 3%;
              background: rgba(0, 0, 0, 0.5);
            }
            .mask-btn {
              .el-button {
                padding: 10px;
                margin: 8px 0;
              }
            }
          }
        }
      }
      .activeShow {
        border: 1px solid red;
      }
    }
  }
  // 底部
  .el-footer {
    bottom: 0;
    right: 0;
    left: 0;
    border-top: 1px solid #ddd;
    .sidebarPaging {
      width: 199px;
      border-right: 1px solid #ddd;
      line-height: 58px;
    }
    .contentPaging {
      flex: 1;
    }
  }
  // 放大镜
  .Magnifier {
    /deep/.el-dialog__headerbtn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 666;
      font-size: 30px;
    }
    img {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>