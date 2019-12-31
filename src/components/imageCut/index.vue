<template>
  <div class="imgageCut">
    <div class="clearBox">
      <div style="width:170px;margin: 0 auto 14px;" class="clearBox">
        <el-upload
          style="float: left;"
          class="upload-demo"
          action="123"
          ref="upload"
          :on-change="change"
          :file-list="fileList"
          :headers="tyrzUploadPortraitHeaders"
          list-type="picture"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :limit="1"
        >
          <el-button slot="trigger" class="operation_gray" @click="clear">选择图片</el-button>
        </el-upload>
        <!--<el-button slot="trigger" class="operation_gray" @click="finish('blob')">生成图片(blob)</el-button>-->
        <el-button slot="trigger" style="float: left;margin-left: 10px;" class="operation_green" type="primary" @click="finish('base64')">保存图片</el-button>
      </div>
    </div>
    <div class="cropper-content clearBox">
      <div class="cropper" style="text-align:center;position: relative;" :style="{width: width, height: height}">
        <vueCropper
          ref="cropper"
          v-show="option.img"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :fixed="option.fixed"
          :fixedBox="option.fixedBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :centerBox="option.centerBox"
          :high="option.high"
          @realTime="realTime"
          :enlarge="option.enlarge"
          :mode="option.mode"
        ></vueCropper>
        <img  :src="imageUrl" v-if="option.img == '' && imageUrl != '' " style="width: 100%;height: 100%; " class="avatar">
      </div>

      <div class="copperTip">
        <p>截取图片后，生成的图片尺寸为{{imgSizePx}}px。<br/>(滑动鼠标滚轮可调整图片大小)</p>
      </div>
      <!--<div class="pre">-->
      <!--<section class="pre-item">-->
      <!--<p>生成图片</p>-->
      <!--<img :src.sync="modelSrc" alt="">-->
      <!--</section>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import { VueCropper }  from 'vue-cropper'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      VueCropper
    },
    computed: {
      ...mapGetters([
        'tyrzUploadPortraitHeaders',
      ])
    },
    props: {
      option: {
        type: Object,
        default () {
          return {
            img: "", //图片地址
            size: 1, //图片缩放
            full: true, //是否输出原图比例的截图
            outputType: "jpg", //输出格式
            canMove: true, //图片是否可以拖动
            fixedBox: true, // 截图框固定大小
            original: false, // 上传图片是否显示原始宽高
            canMoveBox: true, // 能否拖动截图框
            fixedNumber: [1, 1], // 截图框X Y轴比例 需设置fixed=true
            fixed: true, // 截图框是否固定比例
            autoCrop: true, // 只有自动截图开启 宽度高度才生效
            autoCropWidth: '', // 截图框宽度
            autoCropHeight: '', // 截图框高度
            centerBox: false, // 截图框是否限制在图片里(只有在自动生成截图框时才能生效)
            high: false, // 是否根据dpr生成适合屏幕的高清图片
            cropData: {},
            enlarge: 1, // 是否按照截图框比例输出 默认为1
            mode: 'cover', //图片显示格式 一般为contain 和 cover
            maxImgSize: 2000
          }
        }
      },
      width: {
        default () {
          return '300px'
        }
      },
      height: {
        default () {
          return '300px'
        }
      },
      imageUrl:"",
      imgSizePx:"",
      titleCode:""
      // modelSrc: {
      //   type: String,
      //   default () {
      //     return ''
      //   }
      // }
    },
    data () {
      return {
        dialogVisible: false,
        loading: false,
        previews: {},
        modelSrc: "",
        model: false,
        fileList: []
      }
    },
    methods: {
      change (file, fileList) {
        console.log(file,'sssssssssssssss')
        let isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/bmp'
        let isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传图片只能是 jpg jpeg png bmp 格式')
          return
        }
        if(!isLt2M){
          this.$message.error('上传图片大小不能超过2MB')
          return
        }
        this.option.img = file.url

      },
      realTime (data) {
        var previews = data;
        this.previews = data;
      },
      clear () {
        this.$refs.upload.clearFiles()
        if(this.option.img != ""){
          this.$refs.cropper.clearCrop()
          this.$refs.cropper.refresh()
        }
        this.option.img = ''
      },


      beforeAvatarUpload(file) {

      },
      finish(type) {
        // this.$refs.cropper.refresh()
        if (type === "blob") {
          // this.$refs.cropper.getCropBlob(data => {
          //   var img = window.URL.createObjectURL(data);
          //   this.model = true;
          //   // this.modelSrc = img;
          //   this.$emit('finish', img)
          // });
        } else {
          console.log(this.option.img,'this.option.img')
          if(this.option.img == ''&& this.titleCode == '0' ){
            if(this.imageUrl == ""){
              this.$message.warning("请选择图片");
            }else{
              this.$emit('finish','-1')
            }

          }else if(this.option.img == ''&& this.titleCode == '1' ){
            this.$emit('finish','-1')
          }else{
            this.$refs.cropper.getCropData(data => {
              this.model = true;
              // this.modelSrc = data;
              this.$emit('finish', data)
            });
          }
        }
        // this.$refs.upload.clearFiles()
        // this.$refs.cropper.clearCrop()
        // this.$refs.cropper.refresh()
      },
    },
  }
</script>

<style lang="scss">
  .cropper{
    margin: 0 auto;
    border: 1px solid #DCDFE6;
  }
  .copperTip{
    text-align: center;
    margin-right: 20px;
    height: auto;
    color: #ce0b24;
    margin-top: 10px;
  }
</style>
<style scoped>
  /deep/ .el-upload__input{
    display: none !important;
  }
</style>
