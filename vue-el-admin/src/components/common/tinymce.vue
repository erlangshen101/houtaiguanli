<template>
  <div class="tinymce-box">
      <editor v-model="myValue"
        :init="init"
        @onClick="onClick">
      </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' //tinymce默认hidden,不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// 编辑器插件
import 'tinymce/plugins/image'      //插入上传图片插件
import 'tinymce/plugins/media'      //插入视频插件
import 'tinymce/plugins/table'      //插入表格插件
import 'tinymce/plugins/lists'      //列表插件
import 'tinymce/plugins/wordcount'  //字数统计插件
export default {
    components: {
        Editor
    },
    name:'tinymce',
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        plugins: {
            type: [String, Array],
            default: 'lists image media table wordcount'
        },
        toolbar: {
            type: [String, Array],
            default: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
        }
    },
    data () {
        return {
            init: {
                language_url: '/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/tinymce/skins/ui/oxide',
                height: 300,
                plugins: this.plugins,
                toolbar: this.toolbar,
                branding: false,
                menubar: false,
                //此处为图片上传处理函数 这个直接用了base64的图片形式上传图片
                images_upload_handler: (blobInfo,success,failure) => {
                    const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                    success(img)
                }
            },
            myValue: '你猜猜看'
        }
    },
    methods: {
        // 添加相关事件
        onClick (e) {
            this.$emit('onClick',e, tinymce)
        },
        // 清空内容
        clear () {
            this.myValue = ''
        }
    },
    watch: {
        value (newValue) {
            this.myValue = newValue
        },
        myValue (newValue) {
            this.$emit('input', newValue)
        }
    }
}
</script>

<style>

</style>