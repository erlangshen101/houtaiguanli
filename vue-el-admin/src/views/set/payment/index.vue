<template>
  <div>
    <el-tabs v-model="activeName" style="background:#fff;margin:-10px -20px;padding: 10px">
      <el-tab-pane label="支付设置" name="first">
        <el-table :data="tableData" border>
          <el-table-column label="支付设置">
            <template slot-scope="scope">
              <div class="flex-x">
                <img :src="scope.row.src" alt="" style="width: 45px; height: 45px;padding:7px" >
                <div class="flex-y j-c-s">
                  <span class="f14">{{scope.row.name}}</span>
                  <span class="f12">{{scope.row.desc}}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300px">
            <template slot-scope="scope">
              <el-button type="text" size="mini">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="购物设置" name="second">
        <el-form :model="form" label-width="140px">
          <el-form-item label="未支付订单">
            <el-input size="small" type="number" style="width:20%" v-model="form.Customer">
              <template slot="append">天后自动关闭</template>
            </el-input>
            <p class="f12 c6" style="height:30px">订单下单未付款, n天后自动关闭 ,设置0天不自动关闭</p>
          </el-form-item>
          <el-form-item label="已发货订单">
            <el-input size="small" type="number" style="width:20%;" v-model="form.Key">
              <template slot="append">天后自动确认收货</template>
            </el-input>
            <p class="f12 c6" style="height:30px">订单下单未付款, n天后自动关闭 ,设置0天不自动关闭</p>
          </el-form-item>
          <el-form-item label="已完成订单">
            <el-input size="small" type="number" style="width:20%" v-model="form.Key">
              <template slot="append">天后允许申请收获</template>
            </el-input>
            <p class="f12 c6" style="height:30px">订单下单未付款, n天后自动关闭 ,设置0天不自动关闭</p>
          </el-form-item>
          <el-form-item label="运费组合策略">
            <el-select v-model="value" placeholder="请选择运费组合策略" style="display:block; width:15%" size="small">
              <el-option label="北京"></el-option>
              <el-option label="上海"></el-option>
            </el-select>
            <el-button size="small" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tab 切换
      activeName: "first",
      tableData: [
        {
          name: "银联卡支付",
          desc: "该系统支持即时到账接口",
          src: require(`@/assets/image/1.jpg`),
        },
        {
          name: "支付宝支付",
          desc: "该系统支持即时到账接口",
          src: require(`@/assets/image/2.jpg`),
        },
        {
          name: "微信支付",
          desc: "该系统支持即时到账接口",
          src: require(`@/assets/image/3.jpg`),
        }
      ],
      form: {
        Customer: "",
        Key: ""
      }
    };
  },
  methods: {
    // 修改
    modifYtableData(row, index) {},
    // 删除
    deLtableData(index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item {
  margin-bottom: 10px;
}
</style>