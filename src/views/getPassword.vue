<template>
  <el-container class="getPass">
    <el-header class="firstHeader">
      <top />
    </el-header>
    <el-container>
      <div class="content">
        <div class="steps">
          <div class="step1" :class="{ active: step === 1 }">
            1.验证您的账号
          </div>
          <div class="step2" :class="{ active: step === 2 }">
            2.重置密码
          </div>
        </div>
        <!-- 验证账号第一步 -->
        <div class="firstStep" v-if="step === 1">
          <div class="inputs">
            <span>登录账号:</span>
            <el-input placeholder="请输入账号" v-model="username"> </el-input>
          </div>
          <div class="inputs">
            <span>选择方式:</span>
            <el-select :popper-append-to-body="false" v-model="type" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="inputs captcha">
            <span>{{ `${options[type].label}:` }}</span>
            <div class="captchaInner">
              <el-input :placeholder="typeHolder" v-model="typeContent">
              </el-input>
              <button
                class="captchaImg"
                @click="checkPass"
                disabled
                ref="captcha"
              >
                {{ captchaMessage }}
              </button>
            </div>
          </div>
          <div class="inputs">
            <span>验证码:</span>
            <el-input placeholder="请输入验证码" v-model="captcha"> </el-input>
          </div>
          <!-- <div class="inputs captcha">
            <span>验证码:</span>
            <div class="captchaInner">
              <el-input
                placeholder="请输入内容"
                v-model="email">
              </el-input>
              <div class="captchaImg">
                <img :src="captcha" alt="">
              </div>
              <p>换一张</p>
            </div>  
          </div> -->
          <button @click="firstStep" disabled ref="firstStep">下一步</button>
        </div>
        <!-- 验证账号第二步 -->
        <div class="secondStep" v-if="step === 2">
          <!-- <div class="inputs">
            <span>请输入接收的验证码:</span>
            <el-input
              placeholder="请输入验证码"
              v-model="captcha"
              :disabled="true">
            </el-input>
          </div> -->
          <div class="inputs">
            <span>请输入新密码:</span>
            <el-input
              placeholder="请输入新密码"
              type="password"
              v-model="password"
            >
            </el-input>
          </div>
          <div class="inputs">
            <span>请确认密码:</span>
            <el-input
              placeholder="请确认密码"
              type="password"
              v-model="confirmPass"
            >
            </el-input>
          </div>
          <button @click="secondStep" disabled ref="secondStep">完成</button>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import top from "@/components/getPasswordTop";
import { mapGetters, mapActions } from "vuex";
import { isEmail } from "@/utils/validate";
import { setInterval, clearInterval } from "timers";
export default {
  components: {
    top
  },
  data() {
    return {
      step: 1,
      username: "",
      type: 0,
      email: "",
      typeContent: "",
      captcha: "",
      password: "",
      confirmPass: "",
      limit: false,
      imageKey: "",
      captchaMessage: "获取验证码",
      options: [
        {
          value: 0,
          label: "邮箱"
        },
        {
          value: 1,
          label: "手机号"
        }
      ]
    };
  },
  computed: {
    typeHolder() {
      return `请输入${this.options[this.type].label}`;
    }
  },
  methods: {
    ...mapActions(["checkYhZh", "updateYhMm", "checkYzmSfcs"]),
    //获取邮箱or手机验证码
    checkPass() {
      if (this.type == 0) {
        //邮箱规则
        if (isEmail(this.typeContent)) {
          let data = {
            dlzh: this.username,
            yzfs: this.type,
            yzxx: this.typeContent
          };
          let limitTime = 60;
          this.limit = true;
          console.log(data);
          this.$refs.captcha.disabled = true;
          let _this = this;
          this.captchaMessage = `${limitTime}S后获取`;
          let timer = setInterval(() => {
            console.log(limitTime);
            this.captchaMessage = `已发送(${limitTime}S)`;
            if (this.step == 2) {
              clearInterval(timer);
              return false;
            }
            if (limitTime == 0) {
              this.captchaMessage = "获取验证码";
              this.$refs.captcha.disabled = false;
              this.limit = false;
              clearInterval(timer);
            }
            limitTime -= 1;
          }, 1000);
          this.captchaMessage = "获取验证码";
          this.checkYhZh(data)
            .then(response => {
              console.log("请求成功>>>", response);
              if (response.statusCode == 200) {
                this.$message.success("发送成功，请到邮箱获取您的验证码。");
                // this.$refs.captcha.disabled = false
              } else {
                //TODO:其他错误
                // this.$refs.captcha.disabled = false
                this.captchaMessage = "获取验证码";
                this.$refs.captcha.disabled = false;
                this.limit = false;
                clearInterval(timer);
              }
            })
            .catch(error => {
              console.log("请求失败>>>", error);
              this.$message.error("发送失败，请稍后再试。");
              // this.$refs.captcha.disabled = false
            });
        } else {
          this.$message.error("请填写正确的邮箱地址");
        }
      } else {
        //TODO:手机号规则
        this.$message.info("手机验证功能暂未开启,请选择邮箱验证");
        return false;
      }
    },
    //验证邮箱密码(邮箱验证码)
    firstStep() {
      let data = {
        dlzh: this.username,
        yzfs: this.type,
        yzxx: this.typeContent,
        yzmm: this.captcha
      };
      this.$refs.firstStep.disabled = true;
      this.checkYzmSfcs(data)
        .then(response => {
          console.log("请求成功>>>", response);
          if (response.statusCode == 200) {
            this.$message.success("验证成功");
            this.$refs.firstStep.disabled = false;
            this.step = 2;
          } else {
            // this.$message.error('验证失败，请检查您的验证码是否正确')
            this.$refs.firstStep.disabled = false;
            return false;
          }
        })
        .catch(error => {
          console.log("请求失败>>>", error);
          // this.$message.error(
          //   "验证失败，请检查您的网络是否稳定或验证码是否正确。"
          // );
          this.$refs.firstStep.disabled = false;
          this.captcha = "";
        });
    },
    secondStep() {
      if (this.password != this.confirmPass) {
        this.$message.error("密码不一致，请重新填写。");
        return false;
      } else if (this.password.length > 18 || this.password.length < 6) {
        this.$message.error("密码不能小于6位或大于18位，请重新填写。");
      } else {
        let data = {
          dlzh: this.username,
          yzfs: this.type,
          yzxx: this.typeContent,
          yzmm: this.captcha,
          zhmm: this.password
        };
        console.log(data);
        this.$refs.secondStep.disabled = true;
        this.updateYhMm(data)
          .then(response => {
            console.log("请求成功>>>", response);
            this.$message.success("密码重置成功");
            this.$router.push("/");
            this.$refs.secondStep.disabled = false;
          })
          .catch(error => {
            console.log("请求失败>>>", error);
            this.$message.error("验证失败，请检查您的网络之后重试。");
            this.$refs.secondStep.disabled = false;
          });
      }
    }
  },
  mounted() {},
  watch: {
    typeContent() {
      if (!this.limit) {
        if (this.typeContent != "") {
          this.$refs.captcha.disabled = false;
        } else {
          this.$refs.captcha.disabled = true;
        }
      }
    },
    captcha() {
      if (this.captcha != "") {
        this.$refs.firstStep.disabled = false;
      } else {
        this.$refs.firstStep.disabled = true;
      }
    }
    // password () {
    //   if (this.password != '' && this.confirmPass != '') {
    //     this.$refs.secondStep.disabled = false
    //   } else {
    //     this.$refs.secondStep.disabled = true
    //   }
    // },
    // confirmPass () {
    //   if (this.password != '' && this.confirmPass != '') {
    //     this.$refs.secondStep.disabled = false
    //   } else {
    //     this.$refs.secondStep.disabled = true
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.getPass {
  .firstHeader {
    background: #ffffff;
    height: 80px !important;
    z-index: 1;
    padding: 0;
  }

  .content {
    padding-top: 50px;
    text-align: center;
    width: 100%;
    min-width: 1366px;
    font-size: 14px;

    .steps {
      margin-bottom: 50px;
      .step1,
      .step2 {
        display: inline-block;
        width: 255px;
        height: 60px;
        line-height: 60px;
        background-color: #d7d7d7;
        color: #9b9b9b;
        font-size: 16px;
        font-weight: 700;
        position: relative;
      }

      .active {
        background-color: #28c6c0;
        color: #fff;
        &::before {
          background-color: #28c6c0 !important;
        }

        &::after {
          border-left: 30px solid #28c6c0 !important;
        }
      }

      .step1 {
        z-index: 2;
        &::before {
          content: "";
          display: block;
          width: 30px;
          height: 60px;
          position: absolute;
          top: 0;
          left: -30px;
          border-bottom-left-radius: 30px;
          border-top-left-radius: 30px;
          background-color: #d7d7d7;
        }

        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: -30px;
          border-top: 30px solid transparent;
          border-bottom: 30px solid transparent;
          border-left: 30px solid #d7d7d7;
        }
      }

      .step2 {
        margin-left: 2px;
        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          border-top: 30px solid transparent;
          border-bottom: 30px solid transparent;
          border-left: 30px solid #fff;
        }

        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: -30px;
          border-top: 30px solid transparent;
          border-bottom: 30px solid transparent;
          border-left: 30px solid #d7d7d7;
        }
      }
    }

    .firstStep {
      .inputs {
        color: #b9c1c8;
        margin-bottom: 10px;
        height: 25px;
        line-height: 25px;

        span {
          width: 60px;
        }
      }

      button {
        margin-top: 30px;
        cursor: pointer;
        &:disabled {
          background-color: #b9c1c8;
          cursor: not-allowed;
        }
      }
    }

    .secondStep {
      .inputs {
        color: #b9c1c8;
        margin-bottom: 10px;

        span {
          width: 150px;
        }
      }

      button {
        margin-top: 50px;
        cursor: pointer;
        &:disabled {
          background-color: #b9c1c8;
          cursor: not-allowed;
        }
      }
    }

    .firstStep,
    .secondStep {
      span {
        display: inline-block;
        text-align: right;
      }

      button {
        width: 75px;
        height: 30px;
        border-radius: 5px;
        background-color: #28c6c0;
        color: #fff;
        border: none;
      }
    }
  }
}
</style>

<style lang="scss">
.getPass {
  .el-input {
    width: 338px;
    margin-left: 5px;
    .el-input__inner {
      height: 25px;
      line-height: 25px;
      font-size: 12px;
    }
  }

  .captcha {
    .el-input {
      width: 237px;
      margin-left: 0;
      vertical-align: top;
    }

    .captchaInner {
      width: 338px;
      height: 25px;
      line-height: 25px;
      margin-left: 5px;
      display: inline-block;
      text-align: left;
      .el-input {
      }
      .captchaImg {
        width: 90px !important;
        height: 26px !important;
        padding-top: 1px;
        line-height: 26px;
        color: #fff;
        background-color: #28c6c0;
        display: inline-block;
        border-radius: 5px;
        text-align: center;
        margin-left: 7px;
        margin-top: 0 !important;
        &:disabled {
          background-color: #9b9b9b;
          cursor: default;
        }
        img {
          width: 75px;
          height: 25px;
          display: block;
        }
      }
    }
  }

  .el-select {
    width: 338px !important;
    display: inline-block;
    margin-left: 5px;
    .el-input--suffix {
      margin-left: 0;
    }
    .el-input__suffix {
      line-height: 25px;
      .el-input__icon {
        line-height: 25px;
      }
    }
  }
}

.el-select-dropdown__item {
  height: 25px;
  line-height: 25px;
}
</style>
