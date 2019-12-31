<template>
  <el-popover
    placement="bottom-end"
    width="330"
    trigger="hover">
    <div>
      <div style="line-height:25px">
        <span class="blue">系统消息（{{ messages.length }}）</span>
        <!-- <span @click="readAll" class="green" style="cursor:pointer;float:right">全部已读</span> -->
      </div>
      <ul class="topMessage">
        <transition-group name="el-fade-in-linear">
          <li class="messageList" @click="messageRead(index)" v-if="index <= 5" v-for="(item, index) in messages" :key="item.bm" >
            <div class="right">
              <p class="content">{{ item.bt }}</p>
              <p class="time">{{ item.fbsj }}</p>
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
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    this.Api.grXtxxList().then(res => {
      console.log('消息气泡', res)
      this.messages = res.data
    }).catch(err => {

    })
  },
  methods: {
    // 阅读全部
    readAll() {
      this.Api.tytxPlyd(4).then(res => {}).catch(err => {})
      this.messages = []
    },
    // 跳转到消息详情
    // 消息已读
    messageRead(index) {
      this.Api.tytxYdxx(this.messages[index].bm).then(res => {

      }).catch(err => {

      })
      this.messages.splice(index, 1)
    },
    //消息气泡
    // 清空消息
    removeMessage() {

    },
    // 跳转到消息列表
    goToMessageList() {
      this.$router.push('/teacher/messageList')
    }
  },
}
</script>

<style lang="scss" scoped>
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
