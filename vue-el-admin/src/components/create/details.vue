<template>
  <div>
    <tinymc 
      ref="editor"
      v-model="msg"
      @onClick="onClick"/>
  </div>
</template>

<script>
import tinymc from '@/components/common/tinymce'
export default {
  components : {
    tinymc
  },
  data () {
    return {
      msg: "你好小哥哥"
    }
  },
  methods:{
    onClick (e,editor) {
      window.console.log(e);
    }
  },
}
</script>

<style>

</style>