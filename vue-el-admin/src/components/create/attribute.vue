<template>
  <div class="attribute">
    <el-form label-width="80px">
      <el-form-item label="活动名称">
        <el-select placeholder="请输入商品类型" :value="goods_type_id" @change="setGoods_type($event)">
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-card>
      <div slot="header" class="clearfix">
        <span>商品属性</span>
      </div>
      <el-form label-width="80px">
        <el-form-item label="输入框">
          <el-input placeholder="输入框" v-model="goods_attrs.phone_model" style="width:450px"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  computed: {
    ...mapState({
      goods_type_id: state => state.goods_create.goods_type_id,
      goods_attrs: state => state.goods_create.goods_attrs
    }),
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations([
      'setGoods_type'
    ]),
  }
  
};
</script>

<style lang="scss" scoped>

</style>