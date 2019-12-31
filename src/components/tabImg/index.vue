<template>
  <div class="tabImg">
    <!--图片预览开始-->
    <el-dialog :title="tilteCode" :visible.sync="imgDialog" width="30%" style="min-width: 560px;" @closed="toFormClick()" :show-close="false">
      <el-carousel trigger="click"  @change="imgChange" :autoplay="autoplay">
        <el-carousel-item v-for="(item,index) in imgData" :key="index">
              <img :src="item.filePath" style="width: 520px;height: 300px;" />
        </el-carousel-item>
      </el-carousel>
      <div class="addBoxBtn">
        <div class="clearBox">
          <el-button :disabled="loading" class="operation_green" type="primary" @click="downLoadClick()">下载</el-button>
          <el-button :disabled="loading" class="operation_gray" @click="toFormClick()">取消</el-button>
        </div>
      </div>

    </el-dialog>
    <!--图片预览结束-->

  </div>
</template>

<script>
  import Api from '@/api'
  import { exportExcel } from '@/utils/util';

  export default {
    components: {},
    props: {
      tilteCode: {
        type: String
      },
      imgDialog:{
        type:Boolean,
        default:false
      },
      autoplay:{
        type:Boolean,
        default:false
      },
      imgData:{
        type:Array
      },


    },

    data() {
      return {
        loading:false,
        imgIndex:""
      }
    },
    methods:{
      toFormClick(){
        // this.imgDialog = false
        this.$emit("imgClose")
      },
      downLoadClick(){
        this.$emit("downLoadClick")
        this.downloadFile(this.imgData[this.imgIndex].fileBm,this.imgData[this.imgIndex].fileName)
      },
      imgChange(index){
        this.imgIndex = index
        console.log(this.imgIndex,'湿哒哒')


      },
      async downloadFile(fileBm,name) {
        try {
          let result = await this.Api.downloadFile(fileBm)
          // if (result.status == 200) {
           console.log(result,'突突突')
           exportExcel(result,name)
          // }
        } catch (e) {
          console.log(e)
        }
      },
      //  async downloadFile() {
      //   try {
      //     let result = await this.Api.excelExportAllZip()
      //     // if (result.status == 200) {
      //      console.log(result,'突突突')
      //      exportExcel(result,name)
      //     // }
      //   } catch (e) {
      //     console.log(e)
      //   }
      // },
    },
    created() {

    }
  }
</script>

<style scoped lang="scss" >
  @mixin centerBox {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  @mixin flexRow2 {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .addBoxBtn {
    width: 100%;
    padding-top: 30px;
    @include flexRow2;
  }

</style>
