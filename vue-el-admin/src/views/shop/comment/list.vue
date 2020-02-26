<template>
  <div class="goodsList">
    <!-- 添加规格 / 批量删除 -->

    <div class="search-kong">
      <buttomSerch placeholder="要搜索的商品名称" @btnSearch="btnSearch" ref="kong">
        <!-- 批量删除 / 搜索 -->
        <template #left>
          <el-row class="m-r-a">
            <el-button type="warning" size="mini">批量删除</el-button>
          </el-row>
        </template>

        <!-- 高级搜索 -->
        <template #from>
          <el-form :model="form" inline label-width="80px" class="searcFrom">
            <el-form-item label="评价用户">
              <el-input v-model="form.username" placeholder="要搜索的评价用户" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="评价类型">
              <el-select v-model="form.type" placeholder="全部" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker
                size="mini"
                v-model="form.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="info" size="mini" @click="btnSearch">搜索</el-button>
          <el-button size="mini" @click="emptYform">清空筛选</el-button>
        </template>
      </buttomSerch>
    </div>

    <!-- 表格 -->
    <div class="m-t15 search-tabar">
      <el-table
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 评论 -->
        <el-table-column type="expand" width="55">
          <template>
            <div>
              <ul>
                <li>
                  <!-- 客服 -->
                  <div class="flex-x comment_service a-i-c relative">
                    <img src="@/assets/image/5.jpg" alt class="m-r15" />
                    <div class="flex-y">
                      <strong class="fw absolute" style="top:0">
                        用户名2
                        <small class="fs m-l5">2019-07-23 14:15:17</small>
                      </strong>
                      <span class="flex-x">评论内容</span>
                    </div>
                    <el-button
                      style="margin-left:auto;height:30px"
                      class="flex-x a-i-c"
                      size="mini"
                      type="warning"
                    >删除</el-button>
                  </div>
                  <!-- 用户 -->
                  <div class="user p-t10 p-r10 p-l10 m-l25">
                    <div class="flex-x comment_service">
                      <img src="@/assets/image/5.jpg" alt class="m-r15" />
                      <div class="flex-y j-c-c relative" style="width:300px">
                        <strong class="fw absolute" style="top:0">
                          客服1
                          <small class="fs m-l5">2019-07-23 14:15:17</small>
                        </strong>
                        <div class="flex-x">回复内容</div>
                      </div>
                      <el-button-group style="margin-left:auto;height:30px">
                        <el-button type="success" size="mini">修改</el-button>
                        <el-button type="warning" size="mini">删除</el-button>
                      </el-button-group>
                    </div>
                  </div>

                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="ID" width="80" prop="id"></el-table-column>
        <el-table-column label="商品">
          <template slot-scope="scope">
            <div class="flex-x tabar-title">
              <div class="title-img m-r15">
                <img :src="scope.row.goods.cover" />
              </div>
              <div class="title-h3 f16 flex-y j-c-s">
                <h3 class="fw">{{scope.row.goods.title}}</h3>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评价信息">
          <template slot-scope="scope">
            <div>
              用户 :
              <span>{{scope.row.username}}</span>
            </div>
            <div class="flex-x">
              评分 :
              <el-rate
                class="m-t5"
                v-model="scope.row.star"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="评价时间">
          <template slot-scope="scope">
            <div>{{scope.row.create_time}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" width="180" label="是否显示">
          <template>
            <el-switch v-model="tableData.status"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 占位符 -->
    <div style="height:48px"></div>
    <!-- 分页 -->
    <el-footer class="footerPage fixed flex-x a-i-c">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-footer>
  </div>
</template>

<script>
import buttomSerch from "@/components/common/box.vue";
export default {
  data() {
    return {
      // 表格
      tableData: [
        {
          id: 1,
          goods: {
            title: "商品标题",
            cover: require(`@/assets/image/5.jpg`)
          },
          username: "用户名",
          star: 3,
          create_time: "2019-12-12 14:15:17",
          status: 1
        }
      ],
      // 添加表格
      form: {
        username: "",
        type: "",
        time: ""
      }
    };
  },
  methods: {
    // 搜索的事件
    btnSearch() {},
    // 清空筛选
    emptYform() {},
    // 启用禁用
    changeStatus(val) {
      val.status = !val.status;
      this.$message({
        message: val.status ? "启用" : "禁用",
        type: "success"
      });
    },
    // 选中
    handleSelectionChange(val) {
      this.handleSelection = val;
    },
    // 批量删除
    delAll() {
      this.handleSelection.forEach(val => {
        let index = this.tableData.findIndex(v => v.id === val.id);
        if (index !== -1) {
          this.tableData.splice(index, 1);
        }
      });
      this.handleSelection = [];
    }
  },
  components: {
    buttomSerch
  }
};
</script>

<style lang="scss" scoped>
.goodsList {
  background: #fff;
  margin-top: -10px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 30px;
  padding: 20px;
  .search-tabar {
    border: 1px solid #f1f1f1;
    .tabar-title {
      .title-img {
        height: 55px;
        img {
          width: 45px;
          height: 55px;
        }
      }
      .title-h3 {
        h3 {
          color: #666;
        }
      }
    }
  }
  .footerPage {
    border-top: 1px solid #ddd;
    bottom: 0;
    left: 200px;
    background: #fff;
    right: 0;
    z-index: 888;
  }
  .comment_service img {
    width: 90px;
    height: 90px;
    border-radius: 100px;
  }
  .user {
    background: rgba(6, 6, 9, 0.1);
  }
}
/deep/.el-dialog {
  margin-top: 20vh !important;
  margin-bottom: 0 !important;
  height: auto;
}
</style>