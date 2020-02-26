<template>
  <div class="goodsList">
    <!-- 标签导航 -->
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane :label="tab.name" v-for="(tab,tabI) in tabbars" :key="tabI">
        <!-- 批量删除 / 搜索 / 高级搜索 -->
        <div class="search-kong">
          <buttomSerch placeholder="你猜" @btnSearch="btnSearch" ref="kong">
            <!-- 批量删除 / 搜索 -->
            <template #left>
              <el-row class="m-r-a">
                <el-button type="success" size="mini" @click="$router.push({name:'shop_goods_create'})">发布商品</el-button>
                <el-button type="danger" size="mini">恢复商品</el-button>
                <el-button type="warning" size="mini">批量删除</el-button>
                <el-button size="mini">上架</el-button>
                <el-button size="mini">下架</el-button>
                <el-button size="mini">推荐</el-button>
              </el-row>
            </template>
            <!-- 高级搜索 -->
            <template #from>
              <el-form :model="searcFrom" inline label-width="80px" class="searcFrom">
                <el-form-item label="商品名称">
                  <el-input v-model="searcFrom.name" placeholder="商品名称" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="商品编码">
                  <el-input v-model="searcFrom.code" size="mini" placeholder="商品编码"></el-input>
                </el-form-item>
                <el-form-item label="商品类型">
                  <el-select v-model="searcFrom.val" placeholder="请选择商品类型" size="mini">
                    <el-option
                      v-for="(item,index) in searcFrom.selectVal"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品分类">
                  <el-input v-model="searcFrom.sort" placeholder="商品分类" size="mini"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="info" size="mini" @click="btnSearch">搜索</el-button>
              <el-button size="mini" @click="emptYform">清空筛选</el-button>
            </template>
          </buttomSerch>
        </div>
        <!-- 表格 -->
        <div class="m-t15 search-tabar">
          <el-table :data="tableData[tabI].list" 
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="商品" width="450">
              <template slot-scope="scope">
                <div class="flex-x tabar-title">
                  <div class="title-img m-r15">
                    <img :src="scope.row.cover">
                  </div>
                  <div class="title-h3 f16 flex-y j-c-s">
                    <h3 class="fw">{{scope.row.title}}</h3>
                    <p class="c6 f14">分类: {{scope.row.category}}</p>
                    <p class="c6 f14">事件: {{scope.row.create_time}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" align="center" label="商品类型"></el-table-column>
            <el-table-column prop="sale_count" align="center" label="实际销量"></el-table-column>
            <el-table-column prop="order" align="center" label="商品排序"></el-table-column>
            <el-table-column align="center" label="商品状态">
              <template slot-scope="scope">
                <!-- 审核通过 未通过 -->
                  <el-row class="m-b10">
                    <el-button type="success" plain size="mini" @click="scope.row.ischeck = 1">审核通过</el-button>
                  </el-row>
                  <el-row>
                    <el-button type="warning" plain size="mini" @click="scope.row.ischeck = 2">审核拒绝</el-button>
                  </el-row>
                <!-- 上架下架 -->
                <!-- <el-button 
                  plain 
                  :type="scope.row.status == 1 ? 'success' : 'warning'" 
                  size="mini" 
                  @click="upAndDown(scope.row)"
                  >
                    {{scope.row.status == 1 ? "上架" : "下架"}}
                </el-button> -->
              </template>
            </el-table-column>
            <el-table-column prop="stock" align="center" label="总库存"></el-table-column>
            <el-table-column prop="price" align="center" label="价格"></el-table-column>
            <el-table-column prop="id" align="center" width="180" label="操作">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="success" size="mini" plain>编辑</el-button>
                  <el-button type="warning" size="mini" @click="fromCliDelet(scope.$index)" plain>删除</el-button>
                </el-button-group>
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
            :total="400">
          </el-pagination>
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
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" }
      ],
      // 搜索
      searchVal: "",
      // 搜索表单
      searcFrom: {
        name: "",
        code: "",
        selectVal: [
          { name: "选项一", value: "选了一" },
          { name: "选项二", value: "选了二" }
        ],
        val: "",
        sort: ""
      },
      // 高级搜索开关
      searcopen: false,
      // 表格
      tableData: [],
      // 选中的表格
      multipleSelection: []
    };
  },
  created () {
    this._getData ()
  },
  methods: {
    // 生成表格数据
    _getData () {
      for(var i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: []
        })
        for (var j = 0; j <20 ; j++) {
          this.tableData[i].list.push({
            id:j,
            title:`荣耀 v10全网通 标配版 4GB+64GB 魅力红  ${i} -  ${j}`,
            cover: require(`@/assets/image/5.jpg`),
            create_time: "2019-07-17 18:34:14",
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            price: 1000,
            ischeck: 1,
          })
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
      
      this.searcFrom = {
        name: "",
        code: "",
        selectVal: [
          { name: "选项一", value: "选了一" },
          { name: "选项二", value: "选了二" }
        ],
        val: "",
        sort: ""
      };
      this.$refs.kong[this.tabIndex].$data.searcopen = false;
    },
    // 监听表格触发
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除表格信息
    fromCliDelet (index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData[this.tabIndex].list.splice(index,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    // 上下架
    upAndDown (item) {
      item.status = item.status === 1 ? 0 : 1
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
        h3{
          color: #0043ff94
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
}
</style>