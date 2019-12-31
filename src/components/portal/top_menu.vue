<template>
  <div class="container">
    <el-menu :default-active="activeIndex" class="el-top-navigate" mode="horizontal" text-color="#9b9b9b" :active-text-color="theme">
      <el-menu-item v-for="(item,index) in appData" :index="item.id" @click.native="openMenu(item)" :key="index" v-if="item.show != '1'">
        <template slot="title">
          <i :class="'iconfont '+iconList[index]" class="iconfont"></i>
          <span slot="title">{{item.label}}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setStore, getStore, removeStore } from "@/utils/store";
import { setTheme } from "@/utils/util";

export default {
  data () {
    return {
      appData: [],
      iconList: ['icon-anquan', 'icon-fengxianceshi', 'icon-ArtboardCopy82', 'icon-fuhao-tuceng', 'icon-anquan', 'icon-fengxianceshi', 'icon-ArtboardCopy82', 'icon-fuhao-tuceng'],
      appliBm: ''
    };
  },
  computed: {
    ...mapGetters([
      "topMenuList",
      "activeIndex",
      "theme",
      'userInfo',
      'userData'
    ])
  },
  filters: {},
  created () {
    // 获取角色顶部菜单编码
    let identity = this.userInfo.identity
    this.appliBm = (identity == 'JG' || identity == 'GM') ? 'YY_b314a809021d47c593d4cd5c12670613' : 'YY_28ab950076994f0aa8e39260e1dbcd9c'
    // 1.5秒后关闭遮罩层
    let _this = this
    setTimeout(() => {
      // loading
      _this.$store.commit("SET_GLOBAL_LOADING", false);
    }, 1500);
  },
  mounted () {
    this.findAllYyList()
  },
  methods: {
    ...mapActions([
    ]),
    //获取应用列表
    async findAllYyList () {
      try {
        let datas = await this.Api.findCdTreeListByYhBm({ yyBm: this.appliBm, sfsc: 0, sf: this.userInfo.identity })
        if (datas.statusCode == 200) {
          datas.data.forEach((val, index) => {
            if (val.sfsc != '1' && val.sfjy != '1') {
              // console.log('val', val)
              this.appData.push(val)
              // this.appData.push({
              //   id: val.icon,
              //   icon: this.iconList[index],
              //   label: val.label,
              //   path: val.href,
              //   show: val.show,
              // })
            }
          })
        }
      } catch (e) {
        console.log(e);
      }
    },
    openMenu (item) {
      // console.log(item,'protaltop')
      // console.log(this.userInfo,'protaltop-userInfo')
      let appliid = ''
      let target = ''
      let title = ''
      if (item.label == '服务中心') {
        if (this.userInfo.identity != 'XS') {
          location.replace(location.href)
          return
        }
        target = '/student/serviceList'
        appliid = 'YY_b314a809021d47c593d4cd5c12670613'
        title = '服务管理系统'
      } else if (item.label == '活动中心') {
        target = '/welcome'
        appliid = (this.userInfo.identity == 'XS') ? 'YY_c57e9c60a1a4440aa9e959232ff69a3f' : 'YY_68d206c2e79342dd9438a16fafd9c5d6'
        title = '活动中心'
      } else if (item.label == '消息中心') {
        target = '/teacher/messageList'
        appliid = 'YY_b314a809021d47c593d4cd5c12670613'
        title = '消息中心'
      } else if (item.label == '个人中心') {
        target = '/studentInfo/inforhome'
        appliid = 'YY_28ab950076994f0aa8e39260e1dbcd9c'
        title = '统一门户管理系统'
      }
      if (location.href.indexOf('localhost') != -1) {
        window.open('http://localhost:8801/#/' + '?target=' + target + '&appliid=' + appliid + '&title=' + title)
      } else {
        window.open(item.href + '?target=' + target + '&appliid=' + appliid + '&title=' + title)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 80px;
  line-height: 80px;
  .iconfont {
    margin-bottom: -4px;
  }
}
</style>
