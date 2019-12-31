<template>
  <el-row class="top">
    <!-- 左侧logo 及 文字 -->
    <el-col :span="6">
      <div class="left_logo">
        <div class="logo">
          <img src="@/assets/images/logos.png">
        </div>
        <div class="title">{{topTitle}}</div>
      </div>
    </el-col>
    <!-- 中间菜单 -->
    <el-col :span="12">
      <!-- 中间菜单 -->
      <top-menu></top-menu>
    </el-col>
    <!-- 右侧操作区域 -->
    <el-col :span="6">
      <!-- 右侧操作区域 -->
      <div class="right_operation">
        <el-tooltip class="item" effect="dark" content="切换主题" placement="bottom">
          <el-color-picker class="color-picker" v-model="themeVal" size="mini" @change="modifyTheme"></el-color-picker>
        </el-tooltip>
        <div class="icon">
          <el-tooltip class="item" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
            <i :class="['iconfont',isFullScren?'icon-tuichuquanping':'icon-ArtboardCopy3']" @click="handleScreen"></i>
          </el-tooltip>
          <!-- 顶部消息 -->
          <el-popover placement="bottom-end" width="330" trigger="hover">
            <div>
              <div style="line-height:25px">
                <span class="blue">系统消息（{{ messages.length }}）</span>
                <!-- <span @click="readAll" class="green" style="cursor:pointer;float:right">全部已读</span> -->
              </div>
              <ul class="topMessage">
                <transition-group name="el-fade-in-linear">
                  <li class="messageList" @click="messageRead(index)" v-if="index <= 5" v-for="(item, index) in messages" :key="item.content" >
                    <div class="left">
                      <img :src="item.url" alt="">
                    </div>
                    <div class="right">
                      <p class="content">{{ item.content }}</p>
                      <p class="time">{{ item.time }}</p>
                    </div>
                  </li>
                </transition-group>
              </ul>
              <div v-if="messages.length == 0" style="text-align:center">无新消息</div>
              <div style="text-align:center;line-height:25px;padding-top:10px">
                <span @click="readAll" style="cursor:pointer;margin-right:35px;">全部已读</span>
                <span @click="goToMessageList" style="cursor:pointer;">查看全部</span>
              </div>
            </div>
            <el-badge slot="reference" :value="messages.length" :max="99" class="item">
              <i class="iconfont icon-ArtboardCopy" style="margin-right:0px;"></i>
            </el-badge>
          </el-popover>
          <!-- 顶部消息 -->
        </div>
        <el-dropdown @command="logout" @visible-change="userDropdown">
          <div class="drop_down" :style="{color:theme}">
            <img v-if="userInfo.header != ''" :src="userInfo.header" width="28" height="28">
            <img v-else src="@/assets/images/header.svg" width="28" height="28">
            <div class="username">{{ userInfo.userName }}</div>
            <i class="el-icon-caret-bottom" v-if="userDropdownStatus"></i>
            <i class="el-icon-caret-top" v-else></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="width:100px;">
            <el-dropdown-item command="userData" @mouseover.native="updateStyle('userData',true)"
                              @mouseout.native="updateStyle('userData',false)" ref="userData">
              个人信息
            </el-dropdown-item>
            <el-dropdown-item command="logout" @mouseover.native="updateStyle('logout',true)"
                              @mouseout.native="updateStyle('logout',false)" ref="logout">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import {mapGetters} from "vuex";
  import topMenu from './top_menu';
  import {fullscreenToggel, listenfullscreen, setTheme} from "@/utils/util";
  import {setStore, getStore, removeStore, clearStore} from '@/utils/store'
  import {removeCookies} from '@/utils/auth'

  export default {
    components: {
      topMenu,
    },
    data() {
      return {
        themeVal: '#37c5bf',
        userDropdownStatus: false,
        yhsf: "",
        messages: [
          {
            bm: '1',
            url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=844238745,708567838&fm=173&app=25&f=JPEG?w=610&h=382&s=92F5718467B2A3C61C79FD840300708A/15/32/73/50y58PICWk6_1024.jpg',
            content: '你推荐的 曲妮妮 已通过第三轮面面面面面面面面面面面面面面面面面面面面面面面面面面面',
            time: '16分钟前'
          },
          {
            bm: '2',
            url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=844238745,708567838&fm=173&app=25&f=JPEG?w=610&h=382&s=92F5718467B2A3C61C79FD840300708A/15/32/73/50y58PICWk6_1024.jpg',
            content: '你推荐的 曲妮妮 已通过第三轮面面面面面面面面面面面面面面面面面面面面面面面面面面面',
            time: '16分钟前'
          },
          {
            bm: '3',
            url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=844238745,708567838&fm=173&app=25&f=JPEG?w=610&h=382&s=92F5718467B2A3C61C79FD840300708A/15/32/73/50y58PICWk6_1024.jpg',
            content: '你推荐的 曲妮妮 已通过第三轮面面面面面面面面面面面面面面面面面面面面面面面面面面面',
            time: '16分钟前'
          }
        ]
      }
    },
    created() {
      if (this.theme == undefined) {
        this.$store.commit('SET_THEME', '#37c5bf')
      }
      this.themeVal = this.theme
    },
    mounted() {
      listenfullscreen(this.setScreen)
      // console.log(userInfo.header,'头像')
      // console.log(this.CheckImgExists(userInfo.header),'大大大')
    },
    computed: {
      ...mapGetters([
        'isFullScren',
        'userData',
        'theme',
        'topTitle',
        'userInfo',
        'title'
      ]),
    },
    methods: {

      CheckImgExists(imgurl) {
        var ImgObj = new Image(); //判断图片是否存在
        ImgObj.src = imgurl;
        //存在图片
        if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
          return true;
        } else {
          return false;
        }
      },

      // 设置全屏 取消全屏
      handleScreen() {
        fullscreenToggel()
      },
      setScreen() {
        this.$store.commit("SET_FULLSCREN");
      },
      updateStyle(ref, status) {
        if (status) {
          this.$refs[ref].$el.style.color = this.theme
          this.$refs[ref].$el.style.backgroundColor = '#f2f2f2'
        } else {
          this.$refs[ref].$el.style.color = '#606266'
          this.$refs[ref].$el.style.backgroundColor = '#fff'
        }
      },
      userDropdown(status) {
        this.userDropdownStatus = status
      },
      logout(command) {
        if (command == 'logout') {
          this.$confirm('是否确认退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 清空所有Session 缓存
            removeCookies()
            removeStore({name: 'userData'})
            clearStore({type: 'session'})
            location.href = process.env.ENTRANCE
          })
        } else {
          if (this.userInfo.sflx == 'JG' || this.userInfo.sflx == 'GM') {
            this.$message.success('个人信息开发中...')
            return
          }
          this.$router.push('/studentInfo/inforhome')
        }
      },
      modifyTheme() {
        if (this.themeVal == null) {
          this.themeVal = '#37c5bf'
        }
        this.$store.commit('SET_THEME', this.themeVal)
        setTheme(getStore({name: 'theme'}))
      },
      // 阅读全部
      readAll() {
        this.Api.tytxPlyd().then(res => {}).catch(err => {})
        this.messages = []
      },
      // 跳转到消息详情
      // 消息已读
      messageRead(index) {
        this.Api.tytxYdxx(messages[index].bm).then(res => {

        }).catch(err => {

        })
        this.messages.splice(index, 1)
      },
      // 清空消息
      removeMessage() {

      },
      // 跳转到消息列表
      goToMessageList() {
        this.$router.push('/teacher/messageList')
      }
    }
  };
</script>

<style lang="scss" scoped>
  .top {
    height: 80px;
    .left_logo {
      height: 80px;
      padding-left: 26px;
      line-height: 80px;
      .logo, .title {
        float: left;
        display: inline-block;
      }
      .logo {
        width: 120px;
        img {
          width: 120px;
          height: 50px;
          display: inline-block;
          vertical-align: middle;
          margin-top: -4px;
        }
      }
      .title {
        width: calc(100% - 138px);
        padding-left: 18px;
        color: #4a4a4a;
        font-size: 18px;
        font-weight: bolder;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .middle_menu {
      height: 80px;
    }
    .right_operation {
      position: relative;
      height: 80px;
      line-height: 80px;
      float: right;
      padding-right: 49px;
      .color-picker, .drop_down, .icon {
        float: left;
      }
      .color-picker {
        padding-top: 26px;
      }
      .drop_down {
        height: 100%;
        height: 80px;
        img {
          float: left;
          border-radius: 14px;
          margin: 26px 0;
        }
        i {
          float: left;
          margin: 33px 0;
        }
        .username {
          float: left;
          max-width: 90px;
          min-width: 40px;
          padding-left: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .icon {
        height: 100%;
        padding: 0 26px;
        color: #9b9b9b;
        i:nth-child(1) {
          margin-right: 26px;
        }
      }
    }
  }

  .topMessage {
    li {
      box-sizing: border-box;
      width: 100%;
      padding: 6px 0;
      border-bottom: 1px solid #e9e9e9;
      overflow: hidden;
      .left {
        float: left;
        box-sizing: border-box;
        width: 70px;
        height: 70px;
        padding: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }
      }
      .right {
        box-sizing: border-box;
        float: left;
        padding: 10px 0;
        width: 260px;
        height: 70px;
        .content {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 25px;
        }
        .time {
          line-height: 25px;
        }
      }
    }
  }
  .messageList {
    transition: all 1s;
    // display: inline-block;
    // // margin-right: 10px;
  }
  .el-fade-in-linear-enter{
    opacity: 0;
    height: 0;
  }
  .el-fade-in-linear-leave-active {
    position: absolute;
  }
  /deep/ .el-badge__content.is-fixed {
    top: 30px
  }

  /deep/ .el-badge {
    vertical-align: baseline;
    height: 46px;
  }
</style>

