<template>
  <div>
    <el-tabs v-model="activeName" style="background:#fff;margin:-10px -20px;padding: 10px">
      <el-tab-pane label="管理员列表" name="first">
        <div class="flex-x a-i-c">
          <el-button size="small" type="primary">添加用户</el-button>
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            style="width:230px;"
            class="m-l-a m-r15"
            size="small"
            type="text"
          ></el-input>
          <el-button size="small" type="info">搜索</el-button>
        </div>
        <el-table :data="tableData" border class="m-t20">
          <el-table-column label="用户头象" align="center" width="120px">
            <template slot-scope="scope">
              <img :src="scope.row.portrait" alt class="portrait" />
            </template>
          </el-table-column>
          <el-table-column label="登陆账号" prop="name" align="center"></el-table-column>
          <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
          <el-table-column label="邮箱" prop="mailbox" align="center"></el-table-column>
          <el-table-column label="所属用户组" prop="identity.name" align="center"></el-table-column>
          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="modifYtableData(scope.row,scope.$index)">修改</el-button>
              <el-button type="text" size="mini">重置密码</el-button>
              <el-button type="text" size="mini" @click="deLtableData(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="角色列表" name="second">
        <el-button size="small" type="primary" v-auth="'添加角色'">添加角色</el-button>
        <el-table :data="groupList" border class="m-t20">
          <el-table-column label="角色名称" prop="name" align="center"></el-table-column>
          <el-table-column label="添加时间" prop="time" align="center"></el-table-column>
          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="modifYtableData(scope.row,scope.$index)">修改</el-button>
              <el-button type="text" size="mini">重置密码</el-button>
              <el-button type="text" size="mini" @click="deLtableData(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="权限列表" name="jurisdiction">
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{node.label}}</span>
            <span>
              <el-button type="primary" size="mini">显示</el-button>
              <el-button type="success" size="mini">增加</el-button>
              <el-button type="info" size="mini">修改</el-button>
              <el-button type="warning" size="mini">删除</el-button>
            </span>
          </span>
        </el-tree>
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
      // 搜索
      username: "",
      tableData: [
        {
          portrait: require(`@/assets/image/5.jpg`),
          name: "用户名",
          phone: 13073710147,
          mailbox: "2471999097@qq.com",
          identity: {
            id: 1,
            name: "管理员"
          },
          status: 0
        }
      ],
      groupList: [
        {
          name: "超级管理员",
          time: "2019-10-23",
          status: 0
        }
      ],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 修改
    modifYtableData(row, index) {},
    // 删除
    deLtableData(index) {
      this.tableData.splice(index, 1);
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item {
  margin-bottom: 10px;
}
.portrait {
  width: 45px;
  height: 45px;
  border-radius: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/deep/ .el-tree-node__content {
  height: 35px;
}
</style>