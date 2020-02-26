<template>
  <div class="custom-tree-container">
    <el-header class="headerNav">
      <el-button type="primary" size="mini" @click="Establish">创建顶级分类</el-button>
    </el-header>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :expand-on-click-node="false" @node-drop="Drag" draggable>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="!data.editStatis">{{ node.label }}</span>
        <el-input v-else size="mini" v-model="data.label" style="width:300px"></el-input>
        <span>
          <el-button type="success" size="mini" @click.stop="showOrHide(data)">{{data.status ? '显示' : '隐藏'}}</el-button>
          <el-button type="warning" size="mini" @click.stop="append(data)">增加</el-button>
          <el-button type="primary" size="mini" @click.stop="edit(data)">{{!data.editStatis ? '修改' : '完成'}}</el-button>
          <el-button type="danger" size="mini" @click.stop="remove(node,data)">删除</el-button>
        </span>
      </span>
    </el-tree>

  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          status: 1,
          editStatis:false,
          id:1,
          children: [
            {
              label: "二级 1-1",
              status: 1,
              editStatis:false,
              id:2,
              children: [
                {
                  label: "三级 1-1-1",
                  status: 1,
                  editStatis:false,
                  id:3,
                  children: []
                }
              ]
            }
          ]
        },
      ],
      defaultProps: {
        label: "label",
        children: "children"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
    },
    // 显示/隐藏
    showOrHide (data) {
      data.status = data.status ? 0 : 1
    },
    // 编辑
    edit (data) {
      data.editStatis = !data.editStatis
    },
    // 删除
    remove (node,data) {
      let parent = node.parent
      let children = parent.data.children || parent.data
      let index = children.findIndex(v => {
        return v.id === data.id
      })
      children.splice(index,1)
    },
    // 新增
    append (data) {
      data.children.push({
        label: "请输入",
          status: 1,
          editStatis:true,
          id:1,
          children: []
      })
    },
    // 拖拽
    Drag (...options) {
      window.console.log(123);
    },
    // 创建
    Establish () {
       this.$prompt('请输入顶级分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function (val) {
            if (!val) {
              return '输入不能为空'
            }
            return true
          }
        }).then(({ value }) => {
        })
    } 
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-tree-node__content {
  height: 40px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-container {
  background: #fff;
  margin-top: -10px;
  margin-left: -20px;
  margin-right: -20px;
}
.headerNav {
  border-bottom: 1px solid #ddd;
  height: 50px !important;
  display: flex;
  align-items: center;
}
</style>