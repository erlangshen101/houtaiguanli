<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="会员价" >
        <el-input style="width:500px" v-model="goods_create.discount">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed :{
    ...mapState({
      goods_create: state => state.goods_create
    })
  },
}
</script>

<style>

</style>