<template>
  <div>
    <el-steps direction="vertical" class="step-box"
              :style="{color: theme + '!important',borderColor: theme + '!important'}">
      <el-step title=""></el-step>
      <el-step title="" v-if="templateShow"></el-step>
      <el-step title=""></el-step>
    </el-steps>
    <div class="upload-template-box">
      <el-upload class="upload-demo" ref="upload" accept=".xlsx" :action="submitAction"
                 :headers="tyrzUploadPortraitHeaders"
                 :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove"
                 :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeAvatarUpload"
                 :limit='1' :file-list="fileList" :auto-upload="false" :data="parameter">
        <!--提示语开始-->
        <div class="choose—prompt" :style="{color:theme,left:' 56px',top: templateShow?'96px':'6px'}">
          选择填写好的模板文件，上传导入
        </div>
        <div class="upload—prompt" :style="{color:theme}">（为避免重复导入，请勿在导入过程中重复导入）</div>
        <!--提示语结束-->
        <!--按钮开始-->
        <a href="javascript:;" class="download" v-if="templateShow" @click="downloadTemplate">
          <el-button slot="trigger" class="operation_green" type="primary":loading="btnLoading">下载模板</el-button>
        </a>
        <el-button  slot="trigger" :style="{left:' 300px',top: templateShow?'82px':'0px'}"
                   class="upload-select-file operation_green" type="primary">
          选取文件
        </el-button>
        <el-button class="upload-submit operation_green"  type="primary" @click="submitUpload" :loading="btnLoading">上传</el-button>
        <!--按钮结束-->
      </el-upload>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Api from '@/api/index'
  import {exportExcel} from '@/utils/util'
  /*
   * submitAction  导入数据Api
   * templateHref 模板下载Api
   * templateShow 是否需要下载模板
   * fileName 下载的文件名
   * errorDocHref 错误后下载错误文档Api
   * parameter 传递的参数对象
   */
  export default {
    name: 'importTemplate',
    props: {
      submitAction: {
        type: String
      },
      templateShow: {
        type: Boolean
      },
      templateHref: {
        type: String
      },
      fileName: {
        type: String
      },
      errorDocHref: {
        type: String
      },
      parameter: {
        type: Object,
        default: () => {
          return {}
        }
      },
      fileList: {
        type: Array,
        default: () => {
          return []
        }
      },
      // btnLoading: false
    },
    created() {
      if (localStorage.getItem('accessToken')) {
        this.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'tyrzUploadPortraitHeaders',
        'theme'
      ])
    },
    data() {
      return {
        //
        downloadHref: 'exportTemplate',
        active: null,
        errorAddr: '',
        errorId: '',
        // fileList2: [],
        isHasFile: false,
        btnLoading: false
      }
    },
    methods: {
      ...mapActions([]),
      handleRemove(file, fileList) {
        this.isHasFile = false;
      },
      handlePreview(file) {
        this.isHasFile = (file) ? true : false;
      },
      handleChange(file) {
        this.isHasFile = (file) ? true : false;
      },
      handleError(err, file, fileList) {
        this.isHasFile = false;
        this.$refs.upload.clearFiles()
        this.$message({
          showClose: true,
          message: `${err}`,
          dangerouslyUseHTMLString: true,
          duration: 0,
          type: 'error'
        })
      },
      clearFiles() {
        this.isHasFile = false;
        this.$refs.upload.clearFiles()
      },
      //  处理错误模板下载
      handleErrorTemplate() {
        this.$confirm('模板文件上传出错，可点击"确认"按钮，查看具体出错信息?', '错误提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 获取错误文档模板
          Api[this.errorDocHref](this.errorId).then(res => {
            let blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'})
            let fileName = '导入错误模板.xlsx'
            exportExcel(blob, fileName)
          })
        }).catch(() => {
          this.$message({showClose: true, message: '已取消下载错误文档!', type: 'info'})
        })
      },
      // 上传文件限制
      beforeAvatarUpload(file) {
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const isLt20M = file.size / 1024 / 1024 < 20
        if (!extension && !extension2) {
          this.$message({showClose: true, message: '上传模板文件只能是 xlsx或xls 格式!', type: 'error'})
        }
        if (!isLt20M) {
          this.$message({showClose: true, message: '上传模板文件大小不能超过 20MB!', type: 'error'})
        }
        return extension || extension2 && isLt20M
      },
      handleSuccess(res, file, fileList) {
        console.log('res', res)
        if (res.statusCode === 200 && res.success === true) {
          this.$message({showClose: true, message: res.message, type: 'success'})
        } else if (res.statusCode === 300) {
          //  导入文档名不匹配 提示：导入模板不正确
          this.$message({showClose: true, message: res.message, type: 'error'})
          this.isHasFile = false;
          this.$refs.upload.clearFiles()
          if (res.data.errorId) {
            this.errorId = res.data.errorId
            this.handleErrorTemplate()
          }
          return false;
        }else if(res.statusCode === 500){
          this.handleErrorTemplate()
        }
        this.$emit('importSuccessEvent', res);
        //  清空上传文件列表
        this.clearFiles()
      },
      // 下载模板
      downloadTemplate() {
        this.btnLoading = true;
        Api[this.templateHref]().then(res => {
          let blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'})
          exportExcel(blob, this.fileName)
        })
        this.btnLoading = false;
      },
      //  上传模板文件
      submitUpload() {
        this.btnLoading = true;
        if (!this.isHasFile) {
          this.$message({showClose: true, message: '请选取模板文件后，再点击“上传”按钮', type: 'error'});
          this.btnLoading = false;
          return
        }
        this.$refs.upload.submit()
        this.btnLoading = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
  .step-box {
    height: 200px !important;
    margin: 20px;
  }

  .upload-template-box {
    position: relative;
    top: -225px;
    .choose—prompt, .download, .upload-select-file, .upload-submit, .upload—prompt, .el-upload-list {
      position: absolute;
    }
    .download {
      top: 0px;
      left: 56px;
    }
    .upload-submit {
      left: 56px;
      top: 175px;
    }
    .upload—prompt {
      top: 185px;
      left: 160px;
    }
    .el-upload-list {
      top: 110px;
      left: 50px;
    }
  }

  /deep/ .el-step__head, .is-wait {
    color: rgb(55, 197, 191) !important;
    border-color: rgb(55, 197, 191) !important;
  }
</style>
