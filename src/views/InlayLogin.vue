<template>
  <div class="login" v-loading="globalLoading" element-loading-text="数据正在处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(10, 10, 10, 0.8)">
    <div class="main">
      <!-- 顶部logo -->
      <div class="logo">
        <img src="@/assets/images/login/logo.png" alt="" width="293px" height="115px" />
      </div>
      <!-- 顶部名称 -->
      <p class="name">统一认证与授权中心</p>
      <i class="arrowup"></i>
      <!-- 右上角登陆模式切换 -->
      <div class="changeMode" @click="changeMode()">
        <i class="arrowright"></i>
        <img src="@/assets/images/login/mobile.png" alt="" width="20.5px" height="23.5px" v-if="mode === 'PC'" />
        <img src="@/assets/images/login/PC.png" alt="" width="24px" height="25px" v-if="mode === 'mobile'" />
      </div>
      <!-- 主体内容 -->
      <div class="content">
        <!-- 用户头像 -->
        <div class="head">
          <img :src="userHead" alt="" />
        </div>
        <!-- 用户表单 -->
        <div class="inputGroup">
          <div class="inputs">
            <i class="iconfont icon-wode"></i>
            <input type="text" v-model="username" placeholder="请输入您的账号" />
          </div>
          <!-- PC登录表单 -->
          <div v-if="mode === 'PC'">
            <div class="inputs">
              <i class="iconfont icon-ArtboardCopy43"></i>
              <input type="password" v-model="password" @keyup.enter="login()" placeholder="请输入您的密码" />
            </div>
            <div class="inputs" v-if="shouldCheck">
              <i class="iconfont icon-ArtboardCopy44"></i>
              <input type="text" v-model="pcCheck" @keyup.enter="login()" placeholder="请输入验证码" style="width: 73px;" />
              <div class="checkCode">
                <img :src="captcha" alt="" />
              </div>
              <span @click="refreshImg">换一张</span>
            </div>
          </div>
          <!-- 手机登录表单 -->
          <div v-if="mode === 'mobile'">
            <div class="inputs">
              <i class="iconfont icon-ArtboardCopy44"></i>
              <input type="text" v-model="mobileCheck" placeholder="请输入验证码" style="width: 114px;" />
              <button class="checkCodeMobile" :class="{ active: username != '' }">
                获取验证码
              </button>
            </div>
          </div>
        </div>
        <!-- 登录按钮 -->
        <button class="loginButton" @click="login()" ref="login">
          {{ loginMessage }}
        </button>
        <!-- 底部找回和记录登录状态 -->
        <div class="bottom">
          <el-checkbox v-model="check">下次自动登录</el-checkbox>
          <span @click="toGetPassword"><i class="iconfont icon-wangjimimacopy"></i>忘记密码</span>
        </div>
      </div>
    </div>
    <p class="copyright">沈阳东深科技有限公司 @neunb-2018</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setStore, getStore, removeStore, clearStore } from "@/utils/store";
import defaultImg from "@/assets/images/header.svg";
import { getToken } from "@/utils/auth";

export default {
  data () {
    return {
      mode: "PC",
      username: "",
      password: "",
      userHead: defaultImg,
      pcCheck: "",
      imageKey: "",
      mobileCheck: "",
      captcha: "",
      check: false,
      shouldCheck: false, // 是否需要验证码
      loading: false,
      disabled: "", // 是否可以点击
      loginMessage: "登录", //  按钮文字
      path: "" // 跳转路径
    };
  },
  computed: {
    ...mapGetters([
      "defaultActivePath",
      // 'footerTitle',
      // 'topTitle',
      "globalLoading"
    ])
  },
  methods: {
    ...mapActions(["userLogin", "getCaptcha", "refreshCaptcha"]),
    // 切换登录入口
    changeMode () {
      // this.mode = this.mode === 'PC' ? 'mobile' : 'PC'
      // console.log(this.mode)
    },
    // 获取验证码
    refreshImg () {
      this.refreshCaptcha({
        imageKey: this.imageKey === "" ? "" : this.imageKey
      })
        .then(response => {
          console.log("请求成功>>>", response);
          this.captcha = response.data.imageBase64;
          this.imageKey = response.data.imageKey ? response.data.imageKey : "";
          // this.shouldCheck = response.data.imageCode
        })
        .catch(error => {
          this.$message.error("获取验证码失败,请点击刷新或者刷新页面重试。");
        });
    },
    // 登录
    login () {
      this.$refs["login"].disabled = true;
      this.loginMessage = "登录中";
      if (this.username == "" && this.password == "") {
        if (this.username == "" && this.password != "") {
          this.$message.error("账号不能为空");
        } else if (this.username != "" && this.password == "") {
          this.$message.error("密码不能为空");
        } else {
          this.$message.error("账号和密码不能为空");
        }
        this.$refs["login"].disabled = false;
        this.loginMessage = "登录";
        return false;
      }
      this.loading = true;
      // 开启loading
      this.$store.commit("SET_GLOBAL_LOADING", true);
      this.userLogin({
        username: this.username,
        grant_type: "password",
        password: this.password,
        imageCodeResult: this.pcCheck,
        imageKey: this.imageKey
      })
        .then(async response => {
          console.log("login请求成功>>>", response);
          // 设置按钮状态
          this.$refs["login"].disabled = false;
          this.loginMessage = "登录";
          this.$store.commit("SET_GLOBAL_LOADING", false);
          //  判断获取验证码
          if (
            response.statusCode != 200 &&
            response.message == "请输入验证码"
          ) {
            this.shouldCheck = true;
            this.refreshImg();
            return false;
          }
          //  判断Token 回执按钮状态
          if (!response.access_token) {
            if (
              (response.statusCode != 200 &&
                response.message.indexOf("密码错误") != -1) ||
              (response.statusCode != 200 &&
                response.message.indexOf("用户被锁定") != -1) ||
              (response.statusCode != 200 &&
                response.message.indexOf("验证码") != -1)
            ) {
              this.password = "";
              this.pcCheck = "";
              this.refreshImg();
            }
            return false;
          }
          // setStore({name: 'userData', content: response, type: 'session'})
          // 存储到cookie
          if (location.href.indexOf("localhost") != -1) {
            Cookies.set("accessToken", response.access_token, { expires: 7 });
            Cookies.set("userName", response.userName, { expires: 7 });
          } else {
            let domain = location.href.split("/")[2];
            domain = "." + domain.split(".")[1] + "." + domain.split(".")[2];
            Cookies.set("accessToken", response.access_token, {
              expires: 7,
              domain: domain
            });
            Cookies.set("userName", response.userName, {
              expires: 7,
              domain: domain
            });
          }
          // 设置userData数据
          this.$store.commit("SET_USER_DATA", {
            access_token: response.access_token,
            userName: response.userName,
            location: "inlay"
          });
          // 下次自动登录
          if (this.check == true) {
            setStore({ name: "userData", content: response });
            setStore({ name: "autoName", content: this.username });
          }
          // 登录成功提示跳转
          this.$notify({ title: "登录成功", type: "success" });
          this.$router.push("/home");
        })
        .catch(error => {
          // 关闭loading
          this.loading = false;
          this.$store.commit("SET_GLOBAL_LOADING", false);
          this.$refs["login"].disabled = false;
          this.refreshImg();
          this.loginMessage = "登录";
        });
    },
    // 重置密码
    toGetPassword () {
      this.$router.push("/getPassword");
    }
  },
  mounted () {
    if (getStore({ name: "autoName" })) {
      this.username = getStore({ name: "autoName" });
    }
    // 首次获取验证码
    // this.getCaptcha().then(response => {
    //   console.log('请求成功>>>', response)
    //   this.captcha = response.data.imageBase64
    //   this.imageKey = response.data.imageKey ? response.data.imageKey : ''
    //   this.shouldCheck = response.data.imageCode
    // }).catch(error => {
    //   console.log('请求失败>>>', error)
    //   this.$message.error('获取验证码失败,请点击刷新或者刷新页面重试。')
    // })
    // window.onkeydown(13) = function () {}
  },
  created () {
    // 验证accessToken 存在即自动登录，不存在清空所有缓存
    let accessToken = Cookies.get("accessToken");
    let userName = Cookies.get("userName");
    if (accessToken != undefined && userName != undefined && getToken()) {
      this.$store.commit("SET_USER_DATA", {
        access_token: accessToken,
        userName: userName,
        location: "inlay"
      });
      this.$router.push("/home");
    }
    // 获取验证码
    this.$store.commit("DEL_ALL_TAG");
    this.$store.commit("DEL_DEFAULT_ACTIVE");
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  min-height: 768px;
  min-width: 1366px;
  overflow: auto;
  background: url(~@/assets/images/login/loginback.png) no-repeat center;
  background-size: 100% 100%;
  position: relative;
  font-family: "MicrosoftYaHei";

  .logo {
    position: absolute;
    top: -155px;
    left: 33.5px;
    img {
      width: 220px;
      height: 86.5px;
    }
  }

  .main {
    width: 300px;
    height: 350px;
    position: absolute;
    top: 28%;
    left: 50%;
    margin-left: -150px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;

    .name {
      position: absolute;
      width: 100%;
      left: 0;
      top: -78px;
      line-height: 64px;
      font-size: 30px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }

    .content {
      width: 255px;
      margin: 0 auto;

      .head {
        width: 70.5px;
        height: 70.5px;
        border-radius: 70.5px;
        margin: 0 auto;
        margin-top: 25.5px;
        margin-bottom: 25.5px;
        overflow: hidden;
      }

      img {
        width: 70.5px;
        height: 70.5px;
      }

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
            width: 196.5px;
            padding-left: 43.5px;
            padding-right: 13px;
            border: 1px solid #dfdfdf;
            line-height: 28.5px;
            height: 28.5px;
            border-radius: 5px;
            margin-bottom: 7.5px;
            font-size: 12px;
          }

          span {
            color: #28c6c0;
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            text-decoration: underline;
          }

          .checkCode {
            float: left;
            width: 60px;
            height: 30px;
            line-height: 30px;
            margin-left: 8px;
            margin-right: 8px;
            border-radius: 5px;
            background-color: #9b9b9b;
            text-align: center;
            img {
              width: 60px;
              height: 30px;
            }
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

      .loginButton {
        width: 255px;
        height: 30px;
        font-size: 14px;
        color: #fff;
        line-height: 30px;
        background: #28c6c0;
        border: none;
        border-radius: 5px;
        margin-bottom: 15px;
        cursor: pointer;
        &:disabled {
          background-color: #dfdfdf;
          cursor: default;
        }
      }

      .bottom {
        overflow: hidden;
        position: relative;

        .el-checkbox {
          float: left;
        }

        span {
          float: right;
          font-size: 12px;
          color: #d0021b;
          position: relative;
          cursor: pointer;
          i {
            position: absolute;
            top: 1px;
            left: -18px;
            color: #4a4a4a;
            font-size: 14px;
            line-height: 16px;
          }
        }
      }
    }

    .arrowup {
      position: absolute;
      top: -8px;
      left: 142.5px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid rgba(255, 255, 255, 1);
    }

    .changeMode {
      width: 45px;
      height: 45px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #28c6c0;
      cursor: not-allowed;

      img {
        position: absolute;
        top: 4.5px;
        left: 16px;
      }

      .arrowright {
        border-top: 45px solid transparent;
        border-right: 45px solid transparent;
        border-bottom: 45px solid #fff;
        position: absolute;
        top: -45px;
        left: 0;
      }
    }
  }
}

.copyright {
  position: absolute;
  font-size: 14px;
  line-height: 19px;
  width: 100%;
  text-align: center;
  color: #fff;
  bottom: 32px;
}

/deep/ .el-checkbox__label {
  font-size: 12px;
  padding-left: 5px;
}
</style>
