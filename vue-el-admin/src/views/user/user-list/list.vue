<template>
  <div class="goodsList">
    <!-- 添加规格 / 批量删除 -->
    <div class="search-kong">
      <buttomSerch placeholder="手机号/邮箱/会员名称" @btnSearch="btnSearch" ref="kong">
        <!-- 批量删除 / 搜索 -->
        <template #left>
          <el-row class="m-r-a">
            <el-button type="warning" size="mini" @click="iSshowCards">添加会员</el-button>
          </el-row>
        </template>
        <!-- 高级搜索 -->
        <template #from>
          <el-form :model="search" inline label-width="80px" class="searcFrom">
            <el-form-item label="搜素内容">
              <el-input v-model="search.keyword" placeholder="手机号/邮箱/会员名称" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="会员等级">
              <el-select v-model="search.group_id" placeholder="全部" size="mini">
                <el-option label="普通会员" value="shanghai"></el-option>
                <el-option label="黄金会员" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker
                size="mini"
                v-model="search.time"
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
      <el-table style="width: 100%" :data="tableData" border>
        <el-table-column label="会员" width="400px">
          <template slot-scope="scope">
            <div class="flex-x tabar-title">
              <div class="title-img m-r15 flex-x a-i-c">
                <img :src="scope.row.avatar" />
              </div>
              <div class="title-h3 f12 flex-y j-c-s">
                <h3 class="fw">{{scope.row.username}}</h3>
                <h3 class="fw">用户id :{{scope.row.id}}</h3>
              </div>
              <p class="m-l-a f12" style="color:red">详情</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" width="120px" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.level.name}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册/登录">
          <template slot-scope="scope">
            <div class="m-t10 m-b10">
              <div>注册时间: {{scope.row.create_time}}</div>
              <div>最后登录: {{scope.row.update_time}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="180" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="true" :inactive-value="false"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="iSshowCards(scope.row,scope.$index)">修改</el-button>
            <el-button type="text">重置密码</el-button>
            <el-button type="text" @click="deLtableData(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog title="添加会员" :visible.sync="iSshowCard" width="40%">
      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input size="mini" style="width:80%" v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input size="mini" style="width:80%" v-model="form.pasword" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input size="mini" style="width:80%" v-model="form.username" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <div class="avatar-uploader flex-x a-i-c j-c-c" @click="uploader">
            <img v-if="form.portrait" :src="form.portrait" alt />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-form-item>
        <el-form-item label="等级">
          <el-select placeholder="请选择会员等级" v-model="form.grade" size="mini">
            <el-option label="普通会员" value="普通会员"></el-option>
            <el-option label="黄金会员" value="黄金会员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input size="mini" style="width:80%" v-model="form.phone" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input size="mini" style="width:80%" v-model="form.mailbox" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="mini">
            <el-radio-button label="保密"></el-radio-button>
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.state" active-color="0" inactive-color="1"></el-switch>
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
  inject: ["app"],
  data() {
    return {
      // 弹窗
      iSshowCard: false,
      // 修改/创建
      iStableData: "",
      // 表格
      tableData: [
        {
          id: 7,
          username: "用户名",
          avatar: require(`@/assets/image/5.jpg`),
          level_di: 1,
          level: {
            id: 1,
            name: "普通会员"
          },
          create_time: "2019-12-12 14:15:17",
          update_time: "2019-12-12 14:15:17",
          status: true
        },
        {
          id: 3,
          username: "侯迁鹤",
          avatar: require(`@/assets/image/5.jpg`),
          level_di: 0,
          level: {
            id: 2,
            name: "普通会员"
          },
          create_time: "2020-12-12 14:15:17",
          update_time: "2020-12-12 14:15:17",
          status: false
        }
      ],
      // 弹窗表单
      form: {
        name: "",
        pasword: "",
        username: "",
        portrait: "",
        grade: "",
        phone: "",
        mailbox: "",
        sex: "",
        state: false
      },
      // 高级搜索
      search: {
        keyword: "",
        group_id: 0,
        time: ""
      },
      // 删除
      deLtableData(index) {
        this.tableData.splice(index, 1);
      },
      // 验证规则
      rules: {
        name: {
          required: true,
          message: "规格名称不能为空",
          trigger: "change"
        },
        phone: [
          { required: true, message: '手机号码不能为空' ,trigger: "change"},
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' ,trigger: "change"}
        ],
      },

    };
  },
  methods: {
    // 打开弹窗
    iSshowCards(type, index = "new") {
      this.iSshowCard = true;
      this.iStableData = index;
      if (this.iStableData !== "new") {
        let { username, pasword, avatar, phone, mailbox, sex, status } = type;
        // 修改
        this.form = {
          name: username,
          pasword,
          username,
          portrait: avatar,
          grade: type.level.name,
          phone,
          mailbox,
          sex,
          state: status
        };
      } else {
        // 新增
        this.form = {
          name: "",
          pasword: "",
          username: "",
          portrait: "",
          grade: "",
          phone: "",
          mailbox: "",
          sex: "",
          state: false
        };
      }
    },
    // 关闭弹窗
    cancel () {
      this.iSshowCard = false
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.iSshowCard = false;
          let {
            name,
            pasword,
            username,
            portrait,
            grade,
            phone,
            mailbox,
            sex,
            state
          } = this.form;
          if (this.iStableData != "new") {
            // 修改确认
            let tableData = this.tableData[this.iStableData];
            tableData.name = name;
            tableData.pasword = pasword;
            tableData.username = username;
            tableData.avatar = portrait;
            tableData.level.name = grade;
            tableData.create_time = "2019-12-12 14:15:17";
            tableData.update_time = "2019-12-12 14:15:17";
            tableData.phone = phone;
            tableData.mailbox = mailbox;
            tableData.sex = sex;
            tableData.state = state;
          } else {
            // 新增确认
            this.tableData.unshift({
              id: 1,
              name: username,
              pasword,
              username: name,
              avatar: portrait,
              level_di: 1,
              level: {
                id: 1,
                name: grade
              },
              create_time: "2019-12-12 14:15:17",
              update_time: "2019-12-12 14:15:17",
              phone,
              mailbox,
              sex,
              status: state
            });
          }
        } else {
          return false;
        }
      });
    },
    // 上传图片
    uploader() {
      this.app.chooseImage(res => {
        this.form.portrait = res[0].img;
      }, 1);
    },
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
  margin-top: 4vh !important;
  margin-bottom: 0 !important;
  height: auto;
}
.avatar-uploader {
  border: 1px dashed #ddd;
  width: 125px;
  height: 125px;
}
.avatar-uploader img {
  width: 125px;
  height: 125px;
}
.avatar-uploader i {
  font-size: 38px;
}
</style>