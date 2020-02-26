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
        <el-table-column label="规格名称" width="200" prop="name"></el-table-column>
        <el-table-column prop="value" align="center" label="规格值"></el-table-column>
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
              <el-button type="success" size="mini" @click="fromEdit(scope.row,scope.$index)" plain>编辑</el-button>
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
    <el-dialog
        title="添加规格"
        :visible.sync="iSshowCard"
        width="40%">
        <!-- 表单 -->
        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
            <el-form-item label="规格名称" prop="name">
                <el-input size="mini" style="width:150px" v-model="form.name" placeholder="规格名称"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number size="mini" v-model="form.order"></el-input-number>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="form.radio1" size="mini">
                    <el-radio label="1" border>启用</el-radio>
                    <el-radio label="0" border>禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio-group v-model="form.radio2" size="mini">
                    <el-radio label="0" border>文字</el-radio>
                    <el-radio label="1" border>颜色</el-radio>
                    <el-radio label="2" border>图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="规格值" prop="value">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="一行一个规格项,多个规格项用换行输入"
                    v-model="form.value">
                </el-input>
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
    return {
        iSshowCard: false,
        // 表格
        tableData: [
            {
                id: 1,
                name: "颜色",
                value: "棕色,蓝色",
                order: 50,
                status: 1,
                radio2: '0',
            },
            {
                id: 2,
                name: "颜色",
                value: "棕色,蓝色",
                order: 50,
                status: 1,
                radio2: '0',
            },
            {
                id: 3,
                name: "颜色",
                value: "棕色,蓝色",
                order: 50,
                status: 1,
                radio2: '0',
            },
            {
                id: 4,
                name: "颜色",
                value: "棕色,蓝色",
                order: 50,
                status: 1,
                radio2: '0',
            }
        ],
        // 添加表格
        form: {
            name:'',
            order: 0,
            radio1: '1',
            radio2: '0',
            value:''
        },
        isIndex: 'no',
        // 验证表格
        rules: {
            name: [{ 
                required: true,
                message: '规格名称不能为空',
                trigger: 'blur' 
            },],
            value: [{ 
                required: true,
                message: '规格值不能为空',
                trigger: 'blur' 
            },],
        },
        handleSelection:[]
    };
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
        this.isIndex = 'no'
        this.iSshowCard = true
        this.form = {
            name:'',
            order: 0,
            radio1: '1',
            radio2: '0',
            value:''
        }
    },
    handleSelectionChange (val) {
        this.handleSelection = val
    },
    // 确认添加
    handleClose () {
        if (this.isIndex == 'no') {
            this.$refs.form.validate(res => {
                if (res) {
                    this.form.value = this.form.value.replace('\n',',')
                    this.iSshowCard = false
                    this.tableData.unshift(this.form)
                }
            })
        }else {
            let tableData = this.tableData[this.isIndex]
            tableData.name = this.form.name,
            tableData.value = this.form.value,
            tableData.order = this.form.order,
            tableData.status = this.form.radio1,
            tableData.radio2 = this.form.radio2,
            tableData.radio1 = this.form.radio1,
            this.iSshowCard = false
        }
    },
    // 删除
    fromCliDelet (index) {
        this.tableData.splice(index,1)
    },
    // 编辑
    fromEdit (item,index) {
        this.isIndex = index
        this.form = {
            name: item.name,
            order: item.order,
            value: item.value,
            radio1: '1',
            radio2: '0',
        }
        this.iSshowCard = true
    },
    // 批量删除
    delAll () {
        this.handleSelection.forEach (val => {
           let index = this.tableData.findIndex(v=> v.id === val.id)
           if (index !== -1) {
               this.tableData.splice(index,1)
           }
        })
        this.handleSelection = []
    }
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
}
/deep/.el-dialog {
  margin-top: 20vh !important;
  margin-bottom: 0 !important;
  height: auto;
}
</style>