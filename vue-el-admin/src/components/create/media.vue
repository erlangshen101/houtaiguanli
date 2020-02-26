<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="商品大图">
        <div class="flex-x">
          <div v-for="(item,index) in PictureLibrary" :key="index" class="Addpicture relative m-r15 flex-x j-c-c a-i-c">
            <i class="el-icon-delete absolute" @click.stop="deleImg(index)"></i>
            <img :src="item.img" @click="addpicture(1,index)" alt="">
          </div>
          <div class="Addpicture flex-x j-c-c a-i-c" v-if="PictureLeng !== 0">
            <i class="el-icon-plus c6" @click="addpicture(0)"></i>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inject :['app'],
  data () {
    return {
      isShow: true,
      PictureLibrary: []
    }
  },
  computed :{
    PictureLeng () {
      let index = 9
      return index - this.PictureLibrary.length
    }
  },
  methods: {
    addpicture (i,index) {
      this.app.chooseImage((res) => {
        if (i) {
          this.PictureLibrary.splice(index,1,res[0])
          return
        }
        res.forEach((val) => {
          this.PictureLibrary.push(val) 
        })
      },i ? i : this.PictureLeng)
    },
    deleImg (index) {
      let box = this.PictureLibrary.splice(index,1)
    }
  }
}
</script>

<style lang="scss" scoped>
.Addpicture {
  width: 130px;
  height: 130px;
  border: 1px solid #ddd;
  border-radius: 3px;
  .el-icon-delete {
    right: 0;
    top: 0;
    font-size: 16px;
    padding: 5px;
    background: rgba(0,0,0,.5);
    color: #f1f1f1;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .el-icon-plus {
    font-size: 30px;
  }
}
</style>