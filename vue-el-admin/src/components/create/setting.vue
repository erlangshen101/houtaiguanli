<template>
    <table width="100%">
        <thead align="center" >
            <tr>
                <th v-for="(item,index) in tableThs" 
                    :key="index"
                    :rowspan="item.rowspan" 
                    :colspan="item.colspan">
                    {{item.name}}
                </th>
            </tr>
            <tr>
                <th v-for="(item,index) in skuLabels"
                    width="130px" 
                    :key="index"
                    rowspan="1" 
                    colspan="1">
                    {{item.name}}
                </th>
            </tr>
        </thead>
        
        <tbody>
            <tr v-for="(item,index) in list" :key="index">
                <th v-for="(val,i) in item.skus" :key="i">
                    {{val.name}}
                </th>
                <td>
                    <span class="SplSkuPlus" v-if="!item.image">
                        <i class="el-icon-plus" @click="chooseImage(item)"></i>
                    </span>
                    <img @click="chooseImage(item)" v-else :src="item.image" alt="" style="width:45px;height:45px" class="m-l5 m-t5">
                </td>
                <td>
                    <el-input type="Number" v-model="item.pprice" size="mini" style="width:80px"></el-input>
                </td>
                <td>
                    <el-input type="Number" v-model="item.oprice" size="mini" style="width:80px"></el-input>
                </td>
                <td>
                    <el-input type="Number" v-model="item.cprice" size="mini" style="width:80px"></el-input>
                </td>
                <td>
                    <el-input type="Number" v-model="item.stock" size="mini" style="width:80px"></el-input>
                </td>
                <td>
                    <el-input type="Number" v-model="item.volume" size="mini" style="width:80px"></el-input>
                </td>
                <td>
                    <el-input type="Number" v-model="item.weight" size="mini" style="width:80px"></el-input>
                </td>
                <td>
                    <el-input type="Number" v-model="item.code" size="mini" style="width:80px"></el-input>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
export default {
    inject :['app'],
    data () {
        return {
            list: []
        }
    },
    computed: {
        ...mapGetters([
            'tableThs',
            'tableData',
            'skuLabels',
        ]),
    },
    watch: {
        tableData (val,name) {
            this.list = val
        }
    },
    methods: {
        chooseImage (item) {
            this.app.chooseImage((res) => {
                item.image = res[0].img
            },1)
        },
    }
}
</script>

<style lang="scss" scoped>
    table,th,td{
        border: 1.5px solid #ddd;
        vertical-align: middle;
        text-align: center;
    }
    .SplSkuPlus {
        background: #ddd;
        width: 40px;
        display: inline-block;
        line-height: 30px;
        border-radius: 5px;
        height: 30px;
    }
</style>