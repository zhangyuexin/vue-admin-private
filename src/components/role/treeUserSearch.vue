<template>
  <div class="treeSearch clearBox">
    <el-dialog
      :visible.sync="treeSearchShow"
      width="80%"
      :lock-scroll="false"
      :show-close="false"
    >
      <div class="addMain">
        <div class="adduserBoxTitle clearBox">
          <childtitle :titleTxt="titleTxt"></childtitle>
        </div>


      </div>
      <div class="adduserBoxBtn">
        <div class="clearBox">
          <el-button type="primary"  class="operation_gray" @click="cancel">取消</el-button>
          <el-button type="primary" class="operation_green" @click="quit">添加</el-button>
        </div>
      </div>


    </el-dialog>
  </div>
</template>

<script>
  import childtitle from '@/components/role/childtitle'
  import {mapGetters, mapActions} from 'vuex'


  export default {

    data() {
      return {
        titleTxt:"选择人员"

      };
    },
    methods:{
      quit(){

      },
      cancel(){

      }
    },
    props:["treeSearchShow"]
  }

</script>

<style scoped lang="scss">
  @mixin flexCol {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }

</style>
<style scoped="scoped">
  .treeSearch .el-dialog .el-dialog__header,.treeSearch .el-dialog .el-dialog__footer{
    display: none ;
  }
</style>

