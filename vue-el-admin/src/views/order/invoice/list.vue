<template>
  <div class="goodsList">
    <!-- 添加规格 / 批量删除 -->
    <div class="search-kong">
        <buttomSerch placeholder="要搜索的商品名称" @btnSearch="btnSearch" ref="kong">
        <!-- 批量删除 / 搜索 -->
        <template #right>
          <el-row class="m-l-a">
            <el-date-picker
              size="mini"
              v-model="search.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-row>
          <el-input style="width:260px" class="m-l10 m-r10" v-model="search.keyword" placeholder="请输入订单号" size="mini"></el-input>
          <el-button type="info" size="mini">搜索</el-button>
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
        <el-table-column label="订单编号" width="80" prop="id"></el-table-column>
        <el-table-column label="用户名">
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
        <el-table-column label="开票金额">
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
        <el-table-column align="center" label="抬头">
          <template slot-scope="scope">
            <div>{{scope.row.create_time}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发票内容">
          <template slot-scope="scope">
            <div>{{scope.row.create_time}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" width="180" label="纳税人识别号">
          <template>
            <el-switch v-model="tableData.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" width="180" label="创建时间">
          <template>
            <el-switch v-model="tableData.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" width="180" label="操作">
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

      ],
      // 添加表格
      search: {
        time: "",
        keyword: ""
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