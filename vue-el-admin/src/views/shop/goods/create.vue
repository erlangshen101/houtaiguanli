<template>
  <div class="create-box">
    <!-- 返回商品列表 -->
    <el-button class="returnMerchandise absolute" 
        @click="$router.push({name:'shop_goods_list'})" 
        size="mini">回到商品列表
    </el-button>
    <!-- 列表 -->
    <el-tabs v-model="activeName">
        <!-- 基础设置 -->
        <el-tab-pane label="基础设置" >
            <basics />
        </el-tab-pane>
        <!-- 商品规格 -->
        <el-tab-pane label="商品规格" >
            <specifications />
        </el-tab-pane>
        <!-- 商品属性 -->
        <el-tab-pane label="商品属性" >
            <attribute />
        </el-tab-pane>
        <!-- 媒体设置 -->
        <el-tab-pane label="媒体设置" >
            <media />
        </el-tab-pane>
        <!-- 商品详情 -->
        <el-tab-pane label="商品详情" >
            <detailS />
        </el-tab-pane>
        <!-- 折扣设置 -->
        <el-tab-pane label="折扣设置" >
            <discount />
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 基础设置
import basics from '@/components/create/basics'
// 商品规格
import specifications from '@/components/create/specifications'
// 商品属性
import attribute from '@/components/create/attribute'
// 媒体设置
import media from '@/components/create/media'
// 商品详情
import detailS from '@/components/create/details'
// 折扣设置
import discount from '@/components/create/discount'
// vuex
import { mapState, mapMutations } from "vuex";
export default {
    data () {
        return {
            activeName: 0
        }
    },
    computed: {
        ...mapState({
            
        })
    },
    components: {
        basics,
        specifications,
        attribute,
        media,
        detailS,
        discount
    },
}
</script>

<style lang="scss" scoped>
.create-box {
    background: #fff;
    margin: -10px -20px;
    padding: 20px;
    .returnMerchandise {
        top: 13px;
        left: 180px;
    }
}
</style>