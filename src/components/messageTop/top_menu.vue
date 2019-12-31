<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-top-navigate"
      mode="horizontal"
      text-color="#9b9b9b"
      :active-text-color="theme"
    >
      <template v-for="(item,index) in topMenuList">
        <el-menu-item :index="item.id+''" @click.native="openMenu(item)" :key="index">
          <template slot="title">
            <i :class="'iconfont '+item.icon" class="iconfont"></i>
            <span slot="title">{{item.label}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setStore, getStore, removeStore } from '@/utils/store'
import { setTheme } from '@/utils/util'

export default {
  data() {
    return {
      topMenuList: [],
      iconList: [
        'icon-anquan',
        'icon-fengxianceshi',
        'icon-ArtboardCopy82',
        'icon-fuhao-tuceng',
        'icon-anquan',
        'icon-fengxianceshi',
        'icon-ArtboardCopy82',
        'icon-fuhao-tuceng'
      ]
    }
  },
  computed: {
    ...mapGetters(['activeIndex', 'theme', 'navigationAndTagsShow', 'userInfo'])
  },
  filters: {},
  created() {
    let _this = this
    this.getMenuData()
    setTimeout(() => {
      // 关闭全局loading
      _this.$store.commit('SET_GLOBAL_LOADING', false)
    }, 2000)
  },
  mounted() {},
  methods: {
    async getMenuData() {
      try {
        this.appliBm =
          this.userInfo.sflx == 'JG' || this.userInfo.sflx == 'GM'
            ? 'YY_b314a809021d47c593d4cd5c12670613'
            : 'YY_28ab950076994f0aa8e39260e1dbcd9c'
        let datas = await this.Api.findCdTreeListByYhBm({
          yyBm: this.appliBm,
          sfsc: 0,
          sf: this.userInfo.sflx
        })
        if (datas.statusCode == 200) {
          datas.data.forEach((val, index) => {
            if (val.sfsc != '1' && val.sfjy != '1') {
              this.topMenuList.push({
                id: val.id,
                icon: this.iconList[index],
                label: val.label,
                path: val.href,
                children: val.children
              })
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    openMenu(item) {
      if (item.path != -1) {
        if (item.label == '首页') {
          if (location.href.indexOf('localhost') != -1) {
            location.href = 'http://localhost:8801/inlay#/'
          } else {
            // location.href = 'http://cloud-mh.neunb.web/#/'
            location.href = 'http://stuinfo.neu.edu.cn/cloud-mh/#/'
          }
        } else if (item.label == '服务中心') {
          this.$message.warning('该服务暂未开放!')
        } else if (item.label == '活动中心') {
          location.href = item.path + '?appliid=' + item.id
        } else if (item.label == '消息中心') {
          if (location.href.indexOf('localhost') != -1) {
            location.href =
              'http://localhost:8801/#/' +
              '?target=' +
              '/teacher/messageList' +
              '&appliid=' +
              'YY_b314a809021d47c593d4cd5c12670613' +
              '&title=消息管理系统'
          } else {
            // location.href = 'http://cloud-fw.neunb.web/#/' + '?target=' + '/teacher/messageList' + '&appliid=' + 'YY_b314a809021d47c593d4cd5c12670613' + '&title=消息管理系统'
            location.href =
              'http://stuinfo.neu.edu.cn/cloud-fw/#/' +
              '?target=' +
              '/teacher/messageList' +
              '&appliid=' +
              'YY_b314a809021d47c593d4cd5c12670613' +
              '&title=消息管理系统'
          }
        } else if (item.label == '个人中心') {
          if (location.href.indexOf('localhost') != -1) {
            location.href =
              'http://localhost:8801/#/' +
              '?target=' +
              '/studentInfo/inforhome' +
              '&appliid=' +
              'YY_28ab950076994f0aa8e39260e1dbcd9c' +
              '&title=统一门户管理系统'
          } else {
            // location.href = 'http://cloud-fw.neunb.web/#/' + '?target=' + '/studentInfo/inforhome' + '&appliid=' + 'YY_28ab950076994f0aa8e39260e1dbcd9c' + '&title=统一门户管理系统'
            location.href =
              'http://stuinfo.neu.edu.cn/cloud-fw/#/' +
              '?target=' +
              '/studentInfo/inforhome' +
              '&appliid=' +
              'YY_28ab950076994f0aa8e39260e1dbcd9c' +
              '&title=统一门户管理系统'
          }
        }
        return
      }
      let _this = this
      this.$store.commit('SET_ACTIVE_INDEX', item.id)
      console.log('001');
      
      this.topMenuList.forEach((value, index, arr) => {
        if (value.id == this.activeIndex) {
          _this.$store.commit('SET_SIDEBAR_LIST', value.children)
        }
      })
      setTheme(getStore({ name: 'theme' }))
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 80px;
  line-height: 80px;
  .iconfont {
    margin-bottom: -4px;
  }
}
</style>
