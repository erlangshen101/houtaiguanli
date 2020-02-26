<template>
  <div>
    <el-tabs v-model="activeName" style="background:#fff;margin:-10px -20px;padding: 10px">
      <el-tab-pane label="注册于访问" name="first">
        <el-form :model="form" label-width="140px">
          <el-form-item label="是否允许注册会员">
            <el-radio-group v-model="form.Member" size="mini">
              <el-radio-button :label="0">是</el-radio-button>
              <el-radio-button :label="1">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="注册类型">
            <el-radio-group v-model="form.type" size="mini">
              <el-radio-button :label="0">普通注册</el-radio-button>
              <el-radio-button :label="1">手机注册</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密码最小长度">
            <el-input type="number" v-model="form.pasword" style="width:230px" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="强制密码复杂度">
            <el-checkbox-group v-model="form.pasword_strength" size="mini">
              <el-checkbox-button :label="0">数字</el-checkbox-button>
              <el-checkbox-button :label="1">小写字母</el-checkbox-button>
              <el-checkbox-button :label="2">大写字母</el-checkbox-button>
              <el-checkbox-button :label="3">符号</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传设置" name="second">
        <el-form ref="form" :model="form" label-width="140px">
          <el-form-item label="默认上传方式">
            <el-radio-group v-model="form.storage" size="mini">
              <el-radio-button :label="0">本地存储</el-radio-button>
              <el-radio-button :label="1">七牛云存储</el-radio-button>
              <el-radio-button :label="3">阿里云存储</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="bucked">
            <el-input v-model="form.bucked" style="width:230px" size="small"></el-input>
          </el-form-item>
          <el-form-item label="ACCESS_KEY">
            <el-input v-model="form.access" style="width:300px" size="small"></el-input>
          </el-form-item>
          <el-form-item label="SECRET_KEY">
            <el-input v-model="form.secret" style="width:300px" size="small"></el-input>
          </el-form-item>
          <el-form-item label="空间域名">
            <el-input v-model="form.space" style="width:300px" size="small"></el-input>
            <p class="f12">请补全http:// 或 https://</p>
            <el-button type="primary" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Api安全" name="third">
        <el-form :model="form" label-width="140px">
          <el-form-item label="是否开启API安全">
            <el-radio-group v-model="form.security" size="mini">
              <el-radio-button :label="0">是</el-radio-button>
              <el-radio-button :label="1">否</el-radio-button>
            </el-radio-group>
            <p class="c6 f12">api安全功能开启之后调用前端api需要传输签名串</p>
          </el-form-item>
          <el-form-item label="密钥">
            <el-input type="text" size="small" style="width:60%" v-model="form.secret_key"></el-input>
            <p class="c6 f12">密钥设置关系系统中api调用传输签名串的编码规则,以及token解析,请慎重设置,注意设置之后对应会员要求重新获取token</p>
            <el-button type="primary" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tab 切换
      activeName: "first",
      form: {
        // 注册于访问
        Member: 0,
        type: 0,
        pasword: 0,
        pasword_strength: [],
        // 上传设置 
        storage: 0,
        bucked: '',
        access: "",
        secret: "",
        space: "",
        // api 安全
        security: 0,
        secret_key: "",
      },
    };
  }
};
</script>

<style lang="scss" scoped>
 /deep/.el-form-item {
   margin-bottom: 10px;
 }
</style>