<template>
  <div class="image-box relative">
    <el-container style="margin: -30px -20px -10px -20px">
      <!-- 头部 -->
      <el-header class="flex-x a-i-c">
        <div class="flex-x m-r-a">
          <el-select v-model="searchFrom.order" placeholder="请选择图片排序方式">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input v-model="searchFrom.keyword" class="m-l10 m-r10"></el-input>
          <el-button type="success" style="height:40px">搜索</el-button>
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
                :class="{'active' : activeIndex == index}"
                :item="item"
                :index="index"
                :showOptions="true"
              />
            </ul>
          </div>
        </el-aside>
        <el-container>
          <!-- 身体 -->
          <el-main class="absolute">
            <el-row :gutter="10" v-if="AlbumList">
              <el-col
                :span="24"
                :lg="4"
                :md="6"
                :sm="8"
                v-for="(item,index) in AlbumList"
                :key="index"
                class="m-b25"
              >
                <el-card
                  class="box-card"
                  shadow="hover"
                  @click.stop.native="activeMask(item)"
                  :class="{'activeShow':item.activeMask}"
                >
                  <div class="relative mask-img">
                    <img class="w100" :src="item.img" alt />
                    <div class="absolute mask">{{item.name}}</div>
                    <div class="t-a-c mask-btn">
                      <el-button-group>
                        <el-button @click="MagnifierCli(item.img)" icon="el-icon-view" size="mini"></el-button>
                        <el-button
                          @click="modifyCli(item.name,index)"
                          icon="el-icon-edit"
                          size="mini"
                        ></el-button>
                        <el-button @click="deLimg(index)" icon="el-icon-delete" size="mini"></el-button>
                      </el-button-group>
                    </div>
                    <div
                      class="absolute tou t-a-c f12 cf"
                      v-if="item.activeMask"
                    >{{item.chekeOrder}}</div>
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
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <!-- 内容分页 -->
        <div class="contentPaging flex-x a-i-c m-l25">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import AlbumItme from "@/components/image/Album_itme";
export default {
  data() {
    return {
      // 头部绑定数据
      searchFrom: {
        order: "",
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
      // 相册数据
      AlbumList: [],
      // 选中的图片
      chooseList: [],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  props: {
    // 张数限制
    maxl: Number
  },
  created() {
    // 调用侧边栏数据
    this.getAlbum();
    // 调用相册数据
    this.getAlbumList();
  },
  methods: {
    // 获取侧边栏数据
    getAlbum() {
      let f = 100;
      let getData = [];
      for (let i = 0; i < 30; i++) {
        getData.push({
          name: `相册${i}`,
          num: Math.round(Math.random() * 100)
        });
      }
      this.AlbumData = getData;
    },
    // 获取相册数据
    getAlbumList() {
      for (let i = 1; i < 11; i++) {
        this.AlbumList.push({
          id: `${i}`,
          img: require(`@/assets/image/${i}.jpg`),
          name: `图片${i}`,
          activeMask: false,
          chekeOrder: 0
        });
      }
    },
    // 确定修改
    Determine() {
      this.dialogVisible = false;
      if (this.commoni >= 0) {
        this.AlbumData[this.commoni] = {
          name: this.modifyData.name,
          num: this.modifyData.num
        };
        return false;
      }
      this.AlbumData.unshift({
        name: this.modifyData.name,
        num: this.modifyData.num
      });
    },
    // 修改图片内容
    modifyCli(name, index) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "内容不能为空",
        inputValue: name,
        inputValidator(value) {
          if (value == null) {
            return false;
          }
        }
      }).then(({ value }) => {
        this.AlbumList[index].name = value;
      });
    },
    // 删除图片
    deLimg(index) {
      this.$confirm("是否删除此图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.AlbumList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    // 选中图片
    activeMask(val) {
      if (!val.activeMask) {
        window.console.log();
        if (this.chooseList.length >= this.maxl) {
          return this.$message({
            message: `您最多只能添加${this.maxl}张图片`,
            type: "warning"
          });
        }
        this.chooseList = [];
        val.activeMask = !val.activeMask;
        let a = 0;
        for (let i = 0; i < this.AlbumList.length; i++) {
          if (this.AlbumList[i].activeMask) {
            // 选中的图片 添加到数组里
            this.chooseList.push(this.AlbumList[i]);
            a++;
            this.AlbumList[i].chekeOrder = a;
          }
        }
      } else {
        this.chooseList = [];
        val.activeMask = !val.activeMask;
        let a = 0;
        for (let i = 0; i < this.AlbumList.length; i++) {
          if (this.AlbumList[i].activeMask) {
            this.chooseList.push(this.AlbumList[i]);
            a++;
            this.AlbumList[i].chekeOrder = a;
          }
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
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    AlbumItme
  }
};
</script>

<style lang="scss" scoped>
// 最大容器
.dialog-footer {
  bottom: 10px;
  right: 10px;
}
/deep/.el-dialog__body {
  margin-bottom: 0 !important;
}
.image-box {
  height: 700px;
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
}
</style>