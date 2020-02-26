<template>
  <div class="home">
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in card" :key="index">
        <!-- 卡片 -->
        <el-card class="box-card" shadow="hover">
          <div class="flex-x box-card-list">
            <i class="m-r20" :class="item.icon"></i>
            <div class="flex-y j-c-s">
              <h4 class="fw">{{item.Visit}}</h4>
              <small class="f12 c6">{{item.title}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 店铺 订单提示 | 统计图 -->
    <el-row :gutter="20" class="shop-list m-t20">
      <el-col :span="12" class="flex-y j-c-s shop-order">
        <!-- 店铺 -->
        <el-card class="box-card card-shop">
          <div slot="header" class="clearfix">
            <span>{{shop_order.shop_title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{shop_order.shop_btn}}</el-button>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="num_shop" v-for="(item,index) in shop_order.shop" :key="index">
                <div class="grid-content flex-y a-i-c j-c-s">
                  <h4 class="fw">{{item.number}}</h4>
                  <span class="f14 c6">{{item.name}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- 订单提示 -->
        <el-card class="box-card card-order">
          <div slot="header" class="clearfix">
            <span>{{shop_order.order_title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{shop_order.order_btn}}</el-button>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="num_order" v-for="(item,index) in shop_order.order" :key="index">
                <div class="grid-content flex-y a-i-c j-c-s">
                  <h4 class="fw">{{item.number}}</h4>
                  <span class="f14 c6">{{item.name}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <!-- 统计图 -->
        <el-card class="box-card card-chart">
          <div slot="header" class="clearfix">
            <span>订单数据统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <!-- ECharts 容器 -->
          <div class="chart w100" ref="myChart"></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 销售统计 | 单品排名 -->
    <el-row :gutter="20" class="m-t25">
      <el-col :span="12">
        <!-- 销售统计 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <Sale :list = "SaleData.yesterday"/>
          <Sale :list = "SaleData.month"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <!-- 单品排名 -->
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
           <el-table
              :data="tableData"
              height="245"
              border
              style="width: 100%">
              <el-table-column
                prop="id"
                label="#"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品信息"
                width="680">
              </el-table-column>
              <el-table-column
                width="50"
                prop="address"
                label="销量">
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sale from '../../components/index/Sale'
import echarts from "echarts";
export default {
  data() {
    return {
      // 数据统计
      card: [
        { icon: "el-icon-user-solid blue", Visit: 30, title: "关注人数(个)" },
        { icon: "el-icon-s-release green", Visit: 120, title: "订单总数(笔)" },
        {
          icon: "el-icon-s-opportunity Red",
          Visit: 4183.8,
          title: "今日订单总金额(元)"
        },
        { icon: "el-icon-date orange", Visit: 100, title: "本月销量(比)" }
      ],
      // 店铺及订单
      shop_order: {
        shop_title: "商铺及商品提示",
        shop_btn: "需要关注的店铺信息及待处理事项",
        order_btn: "需要关注的店铺信息及待处理事项",
        order_title: "交易提示",
        shop: [
          { number: 64, name: "出售中" },
          { number: 54, name: "出售中" },
          { number: 24, name: "出售中" },
          { number: 914, name: "出售中" }
        ],
        order: [
          { number: 64, name: "出售中" },
          { number: 64, name: "出售中" },
          { number: 64, name: "出售中" },
          { number: 64, name: "出售中" },
          { number: 64, name: "出售中" },
          { number: 64, name: "出售中" }
        ]
      },
      // 销售统计
      SaleData: {
        // 昨日
        yesterday:{
          title:'昨日销量',
          name:'订单量(件)',
          val:12,
          money:'订单金额(元)',
          value:12
        },
        // 本月
        month: {
          title:'本月销量',
          name:'订单量(件)',
          val:25,
          money:'订单金额(元)',
          value:42
        }
      },
      //表格信息
      tableData: [{
          id: 1,
          name: '小天鹅滚筒洗衣机会飞的真的很好用飞鹤牌',
          address: 8
        }, {
          id: 2,
          name: '梅春波衣机会飞的真的很好用飞鹤牌',
          address: 21
        },{
          id: 3,
          name: '小天鹅滚筒======飞的真的很好用飞鹤牌',
          address: 18
        },{
          id: 4,
          name: '小天鹅哑语啊呀呀的真的很好用飞鹤牌',
          address: 6
        },{
          id: 5,
          name: '小天里欧咯衣机会飞的真的很好用飞鹤牌',
          address: 3
        },]

    };
  },
  computed: {
    // 计算 动态数量
    num_shop() {
      return 24 / this.shop_order.shop.length;
    },
    num_order() {
      return 24 / this.shop_order.order.length;
    }
  },
  // dom 渲染完毕
  mounted() {
    // 画统计图
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);
      // 配置参数
      var option = {
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  components:{
    // 销售统计 子组件
    Sale
  }
};
</script>

<style lang="scss" scoped>
.home {
  // 数据统计
  .box-card-list {
    i {
      font-size: 24px;
      color: #fff;
      padding: 8px;
    }
    div {
      h4 {
        font-size: 20px;
        margin-top: -3px;
      }
    }
  }
  // 店铺 订单提示 | 统计图
  .shop-list {
    .shop-order {
      height: 370px;
      .grid-content {
        padding: 10px 0;
        background: #f1f1f173;
        h4 {
          margin-bottom: 10px;
          font-size: 20px;
        }
      }
    }
    // 统计图
    .card-chart {
      height: 370px;
      .chart {
        height: 270px;
      }
    }
  }
}
</style>