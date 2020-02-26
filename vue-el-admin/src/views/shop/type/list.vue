<template>
  <div class="goodsList">
    <!-- 添加规格 / 批量删除 -->
    <div class="search-kong">
      <el-button size="mini" type="success" @click="addSpecifications">添加规格</el-button>
      <el-button size="mini" type="warning" @click="delAll">批量删除</el-button>
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
        <el-table-column label="类型名称" width="200" prop="name"></el-table-column>
        <el-table-column align="center" label="属性标签">
          <template slot-scope="scoped">{{scoped.row.value_list | formatValue}}</template>
        </el-table-column>
        <el-table-column prop="order" align="center" label="排序"></el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="changeStatus(scope.row)"
            >{{scope.row.status ? '启用' : '禁用'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="success"
                size="mini"
                @click="fromEdit(scope.row,scope.$index)"
                plain
              >编辑</el-button>
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-footer>
    <!-- 弹框 -->
    <el-dialog title="添加类型" :visible.sync="iSshowCard" width="60%">
      <!-- 表单 -->
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="规格名称" prop="name">
          <el-input size="mini" style="width:150px" v-model="form.name" placeholder="规格名称"></el-input>
        </el-form-item>
        <el-form-item label="属性排序" prop="order">
          <el-input-number size="mini" v-model="form.order"></el-input-number>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio label='1' border>启用</el-radio>
            <el-radio label='0' border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联规格" prop="sku_list">
            <div class="sku-list-item d-i-b t-a-c cursor m-r10" v-for="(item,index) in form.sku_list" :key="index">
              <span>{{item.name}}</span>
              <i @click="SplSkuList(index)" class="el-icon-delete"></i>
            </div>
            <el-button type="type" size="mini" class="sku-list-btn" @click="addSkuList">+</el-button>
        </el-form-item>

        <el-form-item label="属性列表" prop="value">
          <el-table :data="value_list" style="width: 100%">
            <el-table-column prop="order" label="排序" width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.order" size="mini" placeholder="排序"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="属性名称" width="130px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="mini" placeholder="属性名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="所属类型" width="130px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择所属类型" size="mini">
                  <el-option label="输入框" value="input"></el-option>
                  <el-option label="单选框" value="radio"></el-option>
                  <el-option label="多选框" value="checkbox"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="是否显示" width="100px">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status"
                :active-value="1" :inactive-value="0"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="属性值" width="280px">
              <template slot-scope="scope" v-if="scope.row.type !== 'input'">
                <el-input type="textarea" v-model="scope.row.value" placeholder="一行一个属性值 多个属性用换行输入" size="mini" v-if="scope.row.isedit"></el-input>
                <span v-else>{{scope.row.value}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" v-if="scope.row.type !== 'input'" size="mini" @click="editRow(scope)">{{scope.row.isedit ? '完成' : '编辑属性值'}}</el-button>
                <el-button type="text" size="mini" @click="delRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="text" icon="el-icon-plus" @click="addValue">添加一个属性</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iSshowCard = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var a = 1
    return {
      iSshowCard: false,
      // 表格
      tableData: [
        {
          id: 1,
          name: "鞋子",
          order: 50,
          status: '1',
          sku_list: [
            { id: 1, name: "颜色" },
            { id: 2, name: "尺寸" }
          ],
          value_list: [
            {
              order: 50,
              name: "特性",
              type: "input",
              value: ""
            },
            {
              order: 50,
              name: "前置摄像头",
              type: "input",
              value: ""
            }
          ]
        }
      ],
      // 添加表格
      form: {
        name: "",
        order: 50,
        status: '1',
        sku_list: [],
      },
      // 属性列表
      value_list: [
          {
            order:50,
            name:"属性名称",
            type:"input",
            value:"属性值",
            isedit:false
          }
        ],
      isIndex: "no",
      // 验证表格
      rules: {
        name: [
          {
            required: true,
            message: "规格名称不能为空",
            trigger: "blur"
          }
        ],
      },
      handleSelection: []
    };
  },
  filters: {
    formatValue: function(value) {
      if (value) {
        let arr = value.map(v => v.name);
        return arr.join(",");
      }else {
        return ''
      }
    }
  },
  methods: {
    // 启用禁用
    changeStatus(val) {
      val.status = !val.status;
      this.$message({
        message: val.status ? "启用" : "禁用",
        type: "success"
      });
    },
    // 添加规格
    addSpecifications() {
      this.isIndex = "no";
      this.iSshowCard = true;
      this.form = {
        name: "",
        order: 0,
        status:'1',
        sku_list:[],
      };
      this.value_list = []
    },
    // 多选
    handleSelectionChange(val) {
      this.handleSelection = val;
    },
    // 添加类型
    handleClose() {
      var result = true
      // 验证警告
      this.$refs.form.validate(res => {
        window.console.log(res);
        var message = []
        if (!res) {
          result = false
          message.push(`类型名称不能为空`)
        }
        this.value_list.forEach((item,index) => {
          if (item.order == '') {
            result = false
            message.push(`第${index + 1}行排序不能为空`)
          }
          if (item.name == '') {
            result = false
            message.push(`第${index + 1}行属性名称不能为空`)
          }
          if (item.type !== 'input' && item.value == '') {
            result = false
            message.push(`第${index + 1}行属性值不能为空`)
          }
        })
        if (!result) {
          return this.$notify({
            title: '属性列表提示',
            dangerouslyUseHTMLString: true,
            type:'warning',
            duration:3000,
            message: `<strong>${message.join(',')}</strong>`
          });
        }
      })
      // 判断 添加 / 修改
      if (this.isIndex == "no" && result) {
        this.form.value_list = this.value_list
        this.tableData.push(this.form)
      } else if(result) {
        let tableData = this.tableData[this.isIndex];
          (tableData.name = this.form.name),
          (tableData.order = this.form.order),
          (tableData.status = this.form.status),
          (tableData.sku_list = this.form.sku_list)
      }
      // 验证是否全部通过
      if (result) {
        this.iSshowCard = false
      }
    },
    // 删除
    fromCliDelet(index) {
      this.tableData.splice(index, 1);
    },
    // 编辑
    fromEdit(item, index) {
      window.console.log(item);
      
      this.isIndex = index;
      this.form = {
        name: item.name,
        order: item.order,
        status: item.status,
        sku_list: item.sku_list
      };
      this.value_list = item.value_list
      this.iSshowCard = true;
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
    },
    // 添加属性
    addValue() {
      this.value_list.push({
          order:0,
          name:"",
          type:"input",
          value:"",
          isedit:false
      })
    },
    // 编辑属性
    editRow (scope) {
      scope.row.isedit = !scope.row.isedit
    },
    // 删除属性
    delRow (index) {
      this.value_list.splice(index,1)
    },
    // 删除关联规格
    SplSkuList(index) {
      this.form.sku_list.splice(index,1)
    },
    // 添加关联规格
    addSkuList(index) {
      this.form.sku_list.push({name:"爱你"})
    }
  }
};
</script>

<style lang="scss" scoped>
.sku-list-item > i {
  display: none;
  font-size: 18px;
}
.sku-list-item:hover > span {
  display: none;
}
.sku-list-item:hover > i {
  display: block;
}
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
}
.sku-list-btn {
  height: 29px;
  line-height: 6px;
  font-size: 18px;
}
/deep/.el-dialog {
  margin-top: 20vh !important;
  margin-bottom: 0 !important;
  height: auto;
}
.sku-list-item {
  border: 1px solid #ddd;
  height: 20px;
  line-height: 20px;
  padding: 3px 10px;
  border-radius: 3px;
  width: 45px;
}
</style>