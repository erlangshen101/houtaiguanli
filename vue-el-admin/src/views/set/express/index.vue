<template>
  <div>
    <el-tabs v-model="activeName" style="background:#fff;margin:-10px -20px;padding: 10px">
      <el-tab-pane label="运费模板" name="first">
        <el-button size="small" type="primary">添加模板</el-button>
        <el-table :data="tableData" border class="m-t20">
          <el-table-column label="模板名称" prop="Template" align="center"></el-table-column>
          <el-table-column label="计费方式" prop="charging" align="center"></el-table-column>
          <el-table-column label="排序" prop="order" align="center"></el-table-column>
          <el-table-column label="添加时间" prop="time" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="modifYtableData(scope.row,scope.$index)">修改</el-button>
              <el-button type="text" size="mini" @click="deLtableData(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物流跟踪" name="second">
        <el-form :model="form" label-width="180px">
          <el-form-item label="快递100 Customer">
            <el-input size="small" style="width:40%" v-model="form.Customer"></el-input>
            <p class="f12 c6" style="height:30px">用于查询物流信息,快递100申请</p>
          </el-form-item>
          <el-form-item label="快递100 Key">
            <el-input size="small" style="width:40%;display:block" v-model="form.Key"></el-input>
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
          Template: "全国统一邮费",
          charging: "按件数",
          order: 100,
          time: "2019-07-17 16:29:32",
          status: 1,
        }
      ],
      form: {
        Customer: "",
        Key:"",
      }
    };
  },
  methods: {
    // 修改
    modifYtableData (row,index) {
      
    },
    // 删除
    deLtableData (index) {
      this.tableData.splice(index,1)
    }
  }
};
</script>

<style lang="scss" scoped>
 /deep/.el-form-item {
   margin-bottom: 10px;
 }
</style>