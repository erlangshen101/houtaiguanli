<template>
  <div class="goodsList">
    <!-- 标签导航 -->
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane :label="tab.name" v-for="(tab,tabI) in tabbars" :key="tabI">
        <!-- 批量删除 / 搜索 / 高级搜索 -->
        <div class="search-kong">
          <buttomSerch placeholder="要搜索的订单编号" @btnSearch="btnSearch" ref="kong">
            <!-- 批量删除 / 搜索 -->
            <template #left>
              <el-row class="m-r-a">
                <el-button type="danger" size="mini">导出数据</el-button>
                <el-button type="warning" size="mini">批量删除</el-button>
              </el-row>
            </template>
            <!-- 高级搜索 -->
            <template #from>
              <el-form :model="from" inline label-width="80px" class="from">
                <el-form-item label="订单编号">
                  <el-input v-model="from.code" placeholder="请输入订单编号" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-select v-model="from.type" placeholder="请选择订单状态" size="mini">
                    <el-option value="shanghai"></el-option>
                    <el-option value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                  <el-date-picker
                    v-model="from.time"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="收货人">
                  <el-input v-model="from.username" placeholder="请输入收货人" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="from.phone" placeholder="请输入手机号" size="mini"></el-input>
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
            :data="tableData[tabI].list"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            border
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品信息" width="300">
              <template slot-scope="scope">
                <div class="flex-y">
                  <div class="flex-x">
                    <div>
                      <p>订单编号 :</p>
                      <p>2286413564315</p>
                    </div>
                    <div class="m-l25">
                      <p>下单时间 :</p>
                      <p>2020-1-20 <span>18:34:26</span></p>
                    </div>
                  </div>
                  <div class="flex-x tabar-title">
                    <div class="title-img m-r15">
                      <img :src="scope.row.cover" />
                    </div>
                    <div class="title-h3 f14 flex-y j-c-s">
                      <h3 class="fw">{{scope.row.title}}</h3>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="实付款">
              <template slot-scope="scope">
                <p>￥ 20</p>
                <p>(含运费: ￥0.00)</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="买家">
              <template slot-scope="scope">
                <p>用户名</p>
                <p>(用户id: 11)</p>
              </template>
            </el-table-column>
            <el-table-column prop="order" align="center" label="支付方式">
              <template>
                <span class="payment">微信支付</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配送方式">
              <template slot-scope="scope">
                <!-- 审核通过 未通过 -->
                <span>申通快递</span>
              </template>
            </el-table-column>
            <el-table-column prop="stock" align="center" label="交易状态" width="200px">
              <template>
                <div class="f12 state">
                  <p>付款状态: <span>已付款</span></p>
                  <p>付款状态: <span>已付款</span></p>
                  <p>付款状态: <span>已付款</span></p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" align="center" width="180" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" plain>订单详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 占位符 -->
        <div style="height:48px"></div>
        <!-- 分页 -->
        <el-footer class="footerPage fixed flex-x a-i-c">
          <el-pagination
            :current-page="tableData[tabI].currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </el-footer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttomSerch from "@/components/common/box.vue";
export default {
  data() {
    return {
      // 标签导航默认点
      tabIndex: 0,
      // 标签导航数据
      tabbars: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "已发货" },
        { name: "已收货" },
        { name: "已完成" },
        { name: "已关闭" },
        { name: "退款中" }
      ],
      // 搜索
      searchVal: "",
      // 搜索表单
      from: {
        code: "",
        type: "",
        time: "",
        username: "",
        phone: ""
      },
      // 高级搜索开关
      searcopen: false,
      // 表格
      tableData: [],
      // 选中的表格
      multipleSelection: []
    };
  },
  created() {
    this._getData();
  },
  methods: {
    // 生成表格数据
    _getData() {
      for (var i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: []
        });
        for (var j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: `荣耀 v10全网通 标配版 4GB+64GB 魅力红  ${i} -  ${j}`,
            cover: require(`@/assets/image/5.jpg`),
            create_time: "2019-07-17 18:34:14",
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            price: 1000,
            ischeck: 1
          });
        }
      }
    },
    // 导航切换
    handleClick(tab, event) {},
    // 简单搜索
    btnSearch(e) {
      if (typeof e == "string") {
        return window.console.log("简单搜索" + e);
      }
      window.console.log("复杂搜索");
    },
    // 清空筛选
    emptYform() {
      this.from = {
        code: "",
        type: "",
        time: "",
        username: "",
        phone: ""
      };
      this.$refs.kong[this.tabIndex].$data.searcopen = false;
    },
    // 监听表格触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除表格信息
    fromCliDelet(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.tableData[this.tabIndex].list.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
        height: 85px;
        img {
          width: 60px;
          height: 75px;
        }
      }
      .title-h3 {
        h3 {
          color: #0043ff94;
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
  .payment {
    background: rgb(0, 255, 85);
    color: #fff;
    padding: 5px;
    border-radius: 10px;
  }
  .state p {
    padding: 3px;
  }
  .state span {
    background: red;
    padding: 2px;
    border-radius: 5px;
    box-sizing: border-box;
    color: #fff;
  }
}
</style>