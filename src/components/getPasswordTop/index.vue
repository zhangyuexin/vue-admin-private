<template>
  <el-row class="top">
    <!-- 左侧logo 及 文字 -->
    <el-col :span="12">
      <div class="left_logo">
        <img src="@/assets/images/logos.png">
        <b>找回密码</b>
      </div>
    </el-col>
    <el-col :span="12"></el-col>
  </el-row>
</template>
<script>
  export default {
    data () {
      return {}
    }
  };
</script>

<style lang="scss" scoped>
  .top {
    height: 80px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.09);
    .left_logo {
      height: 100%;
      padding-left: 26px;
      line-height: 80px;
      img {
        width: 130px;
        height: 51px;
        display: inline-block;
        vertical-align: middle;
        margin-top: -4px;
      }
      b {
        padding-left: 18px;
        color: #4a4a4a;
        font-size: 18px;
      }
    }
  }
</style>

