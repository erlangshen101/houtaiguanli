<template>
    <li class="flex-x a-i-c j-c-s cursor p-l10 p-r25">
        <span class="c6">{{item.name}}</span>
        <span v-if="showOptions">
            {{item.num}}
        </span>
        <el-dropdown v-else>
            <span>
            {{item.num}}
            <i class="m-l-a el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.stop.native="$emit('modifyAlbum',({item,index}))">修改</el-dropdown-item>
            <el-dropdown-item @click.stop.native="$emit('spliceAlbum',(index))">删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </li>
</template>

<script>
export default {
    props:{
        item: Object,
        index: Number,
        showOptions :{
            default: false,
            type: Boolean
        }
    },
}
</script>

<style>

</style>