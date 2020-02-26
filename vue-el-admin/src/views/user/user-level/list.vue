<template>
  <div class="goodsList">
    <!-- 添加规格 / 批量删除 -->
    <div class="search-kong">
      <buttomSerch @btnSearch="btnSearch" ref="kong">
        <!-- 批量删除 / 搜索 -->
        <template #left>
          <el-row class="m-r-a">
            <el-button type="warning" size="mini" @click="iSshowCards">添加等级</el-button>
          </el-row>
        </template>
        <template #right>
          <el-row>
            <span class="f12 c6 m-r10">选择升级标准:</span>
            <el-radio-group size="mini" v-model="radio">
              <el-radio-button label="累计消费"></el-radio-button>
              <el-radio-button label="累计次数"></el-radio-button>
            </el-radio-group>
          </el-row>
        </template>
      </buttomSerch>
    </div>
    <!-- 表格 -->
    <div class="m-t15 search-tabar">
      <el-table style="width: 100%" :data="tableData" border>
        <el-table-column label="等级名称" align="center" prop="name"></el-table-column>
        <el-table-column label="升级条件" align="center">
          <template slot-scope="scope">
            <p>{{radio}}{{radio == '累计消费' ? scope.row.consume : scope.row.times}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="折扣率 (%)" prop="discont"></el-table-column>
        <el-table-column align="center" label="等级序号" prop="level"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="warning" plain size="mini" @click="iSshowCards(scope.row,scope.$index)">修改</el-button>
              <el-button type="danger" plain size="mini" @click="deLtableData(scope.$index)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog title="添加等级" :visible.sync="iSshowCard" width="60%">
      <!-- 表单 -->
      <el-form :model="form" ref="ruleForm" label-width="80px">
        <el-form-item label="等级名称" prop="name">
          <el-input size="mini" style="width:25%" v-model="form.name" placeholder="等级名称"></el-input>
        </el-form-item>
        <el-form-item label="等级权重">
          <el-input
            size="mini"
            style="width:25%"
            type="number"
            v-model="form.level"
            placeholder="等级权重"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="升级条件">
          <div>
            <small>累计消费满</small>
            <el-input
              placeholder="请输入内容"
              type="number"
              size="small"
              class="m-t5 m-r10 m-l10"
              style="width:35%"
              v-model="form.consume"
            >
              <template slot="append">元</template>
            </el-input>
            <span class="f12">设置会员等级所需要的累计消费必须大于等于0单位 : 元</span>
          </div>
          <div>
            <small>累计次数满</small>
            <el-input
              placeholder="请输入内容"
              type="number"
              size="small"
              class="m-t5 m-r10 m-l10"
              style="width:35%"
              v-model="form.times"
            >
              <template slot="append">笔</template>
            </el-input>
            <span class="f12">设置会员等级所需要的购买量必须大于等于0单位 : 笔</span>
          </div>
        </el-form-item>
        <el-form-item label="折扣率">
          <el-input
            style="width:25%"
            size="mini"
            type="number"
            v-model="form.discont"
            placeholder="折扣率"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
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
      // 弹窗
      iSshowCard: false,
      // 修改/创建
      iStableData: "",
      // 表格
      tableData: [
        {
          name: "普通会员",
          consume: 100,
          times: 20,
          discont: 10,
          level: 2,
          status: 0,
          create_time: ""
        }
      ],
      // 弹窗表单
      form: {
        name: "",
        consume: 0,
        times: 0,
        discont: 0,
        level: 0,
        status: 0,
        create_time: ""
      },
      // 升级标准
      radio: "累计消费",
      // 删除
      deLtableData(index) {
        this.tableData.splice(index, 1);
      }
    };
  },
  methods: {
    // 打开弹窗
    iSshowCards(type, index = "new") {
      this.iSshowCard = true;
      this.iStableData = index;
      if (this.iStableData !== "new") {
        let {
          name,
          consume,
          times,
          discont,
          level,
          status,
          create_time
        } = type;
        // 修改
        this.form = {
          name,
          consume,
          times,
          discont,
          level,
          status,
          create_time
        };
      } else {
        // 新增
        this.form = {
          name: "",
          consume: 0,
          times: 0,
          discont: 0,
          level: 0,
          status: 0,
          create_time: ""
        };
      }
    },
    // 关闭弹窗
    cancel() {
      this.iSshowCard = false;
    },
    // 搜索的事件
    btnSearch() {},
    // 清空筛选
    emptYform() {
      this.search = {
        keyword: "",
        group_id: 0,
        time: ""
      };
    },
    // 弹窗确认
    handleClose() {
      this.iSshowCard = false;
      let {
        name,
        consume,
        times,
        discont,
        level,
        status,
        create_time
      } = this.form;
      if (this.iStableData != "new") {
        // 修改确认
        let tableData = this.tableData[this.iStableData];

          tableData.name = name,
          tableData.consume = consume,
          tableData.times = times,
          tableData.discont = discont,
          tableData.level = level,
          tableData.status = status,
          tableData.create_time = create_time;
      } else {
        // 新增确认
        this.tableData.unshift({
          name,
          consume,
          times,
          discont,
          level,
          status,
          create_time
        });
      }
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
        img {
          width: 35px;
          height: 35px;
          border-radius: 100%;
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
  height: auto;
}
</style>