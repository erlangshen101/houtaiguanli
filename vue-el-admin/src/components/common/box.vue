<template>
  <div>
    <!-- 批量删除 / 搜索 -->
    <div class="searchDelet">
      <el-card class="box-card b-none flex-x p-b10" shadow="never">
        <!-- 左 -->
        <slot name="left"></slot>
        <!-- 右 -->
        <slot name="right">
            <el-row class="flex-x" v-if="!searcopen">
                <el-input v-model="searchVal" :placeholder="placeholder" class="m-r15" size="mini"></el-input>
                <el-button type="info" size="mini" @click="$emit('btnSearch',searchVal)">搜索</el-button>
                <el-button size="mini" @click="searcopen = true">高级搜索</el-button>
            </el-row>
        </slot>
        
      </el-card>
    </div>
    <!-- 高级搜索 -->
    <el-collapse-transition>
      <el-card class="box-card" v-show="searcopen">
        <div slot="header" class="clearfix">
          <span>高级搜索</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="searcopen = false">收起</el-button>
        </div>
        <!-- 表单 -->
        <slot name="from">
        </slot>
      </el-card>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            // 简单搜索值
            searchVal: "",
            // 高级搜索开关
            searcopen: false,
        }
    }
}
</script>

<style lang="scss" scoped>
  .searchDelet {
    /deep/.el-card__body {
      padding: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>