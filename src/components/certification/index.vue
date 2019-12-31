<template>
  <el-dialog class="certification" title="账号认证" :visible.sync="dialogVisible" :show-close="false" width="316px" top="20vh" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="inputGroup">
      <div class="inputs">
        <i class="iconfont icon-Artboard8"></i>
        <input type="text" v-model="form.email" placeholder="请输入您的邮箱">
      </div>
      <div class="inputs">
        <i class="iconfont icon-phone"></i>
        <input type="text" v-model="form.phone" @keyup.enter="login()" placeholder="请输入您的手机号码" style="width: 136px;">
        <el-button type="primary" class="confirm" @click="send_verificationcode" :disabled="auth_time!='发送验证码'">
          {{auth_time}}
        </el-button>
      </div>
      <div class="inputs">
        <i class="iconfont icon-ArtboardCopy44"></i>
        <input type="text" v-model="form.check" placeholder="请输入验证码">
      </div>
      <div class="inputs">
        <i class="iconfont icon-ArtboardCopy43"></i>
        <input type="password" v-model="form.password" placeholder="请输入密码">
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="confirm" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: true,
      auth_time: '发送验证码',
      form: {
        email: '',
        phone: '',
        password: '',
        check: '',
      }
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'sendActivateSms',
      'saveYhActivate',
    ]),
    handleClose () {

    },
    //点击获取验证码
    send_verificationcode () {
      console.log('发送验证码')
      // 验证是否符合规则
      let phone = this.form.phone
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        this.$message.warning('请正确输入手机号码')
        return false;
      } else {
        //规则符合，发送验证码接口
        this.sendActivateSms(this.form.phone).then(res => {
          console.log('返回的数据', res)
          if (res == true) {
            this.$message.success('验证码已发送')
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.auth_time = '发送验证码'
                clearInterval(auth_timetimer);
              }
            }, 1000);

          } else {
            this.$message.warning('发送失败')
          }
        })

      }
    },
    //提交
    submit () {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.form.email)) {
        this.$message.warning('请正确输入邮箱')
        return
      }
      if (!this.form.phone) {
        this.$message.warning('请输入验证码')
        return
      }
      if (!this.form.check) {
        this.$message.warning('请输入验证码')
        return
      }
      if (!this.form.password) {
        this.$message.warning('请输入密码')
        return
      }
      //校验没问题，开始走登录接口
      this.saveYhActivate({
        email: this.form.email,
        phoneNumber: this.form.phone,
        password: this.form.password,
        yzm: this.form.check
      }).then(res => {
        console.log('res', res)
        if (res.statusCode == '200') {
          this.dialogVisible = !this.dialogVisible
          this.$message.success('认证成功')
        } else {
          // this.dialogVisible=!this.dialogVisible
          this.$message.warning(res.message)
        }
      })

    },
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog {
  min-width: 220px !important;
}

/deep/ .el-dialog__footer {
  padding: 20px;
}

.certification {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .inputGroup {
    height: 112.5px;
    margin-bottom: 15px;
    .inputs {
      position: relative;
      overflow: hidden;
      i {
        position: absolute;
        line-height: 15px;
        top: 7.5px;
        left: 0;
        font-size: 13.5px;
        height: 15px;
        width: 33px;
        color: #9b9b9b;
        border-right: 1px solid #e2e2e2;
        text-align: center;
      }
      input {
        float: left;
        width: 220px;
        height: 32px;
        line-height: 32px;
        padding-left: 42px;
        padding-right: 12px;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
        margin-bottom: 8px;
        font-size: 12px;
      }
      .checkCodeMobile {
        float: right;
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border: none;
        background-color: #9b9b9b;
        color: #fff;
        font-size: 12px;
      }
      .active {
        background-color: #28c6c0;
        cursor: pointer;
      }
    }
  }
  .confirm {
    height: 33px;
    line-height: 33px;
    background: #28c6c0;
    border: 0;
    margin-left: 4px;
  }
}
</style>
