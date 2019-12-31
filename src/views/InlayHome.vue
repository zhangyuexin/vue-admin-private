<template>
  <el-container class="home" v-loading="globalLoading" element-loading-text="数据正在处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(10, 10, 10, 0.8)">
    <el-container>
      <!--顶部导航栏-->
      <el-header class="first_header">
        <top></top>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/**
 * TH 1450096592@qq.com
 * 以下注解，解释权归 "TH" 所有
 */
import top from "@/components/portal/";
import { mapActions, mapGetters } from 'vuex'
import { getStore, removeStore, setStore, clearStore } from '@/utils/store'
import { setTheme } from '@/utils/util'

export default {
  components: {
    top,
  },
  /**
   * 用于定义属性实例
   */
  data () {
    return {}
  },
  /**
   * 用来监控自己定义的变量
   */
  computed: {
    ...mapGetters([
      'isCollapse',
      'heightTitle',
      'theme',
      'globalLoading',
      'topMenuList',
      'activeIndex',
      'tag',
      'userData'
    ])
  },
  /**
   * 生命周期钩子函数，就是一个vue实例被生成之后调用该钩子。
   * 函数中调用ajax获取页面初始化所需的数据
   */
  created () {
    if (location.href.indexOf('localhost') != -1) {
      Cookies.set('certification', true, { expires: 7 })
    } else {
      let domain = location.href.split('/')[2]
      domain = '.' + domain.split('.')[1] + '.' + domain.split('.')[2]
      Cookies.set('certification', true, { expires: 7, domain: domain })
    }
    // 初始化tag
    if (getStore({ name: 'tag', type: 'session' }) == undefined) {
      this.$store.commit("ADD_TAG", this.tag)
    }
    // 开启loading
    this.$store.commit("SET_GLOBAL_LOADING", true)
    //  两秒后关闭loading
    setTimeout(() => {
      this.$store.commit("SET_GLOBAL_LOADING", false)
    }, 2000)
    // 设置userData数据
    this.$store.commit("SET_USER_DATA", {
      access_token: Cookies.get('accessToken'),
      userName: Cookies.get('userName'),
      location: 'inlay'
    })
    // 初始化tag tagList
    // if (getStore({name: 'tag', type: 'session'}) == undefined) {
    //   this.$store.commit("ADD_TAG")
    // }
    // 获取菜单数据
    // if (getStore({name: 'menu', type: 'session'}) == undefined) {
    // this.getAllMenu()
    // }
    // 获取字典值
    if (getStore({ name: 'dictionary', type: 'session' }) == undefined) {
      this.getDictionariesValueAll()
    }
  },
  /**
   * 生命周期钩子函数，el被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
   * 在这发起后端请求，拿回数据，配合路由钩子做一些事情
   */
  mounted () {
    this.getUserHeader()
    this.Api.authenticationQuery().then(res => {
      this.$store.commit('SET_CERTIFICATION', !res)
    })
    setTheme(getStore({ name: 'theme' }), this.theme)
  },
  /**
   * 创建所有JavaScript函数方法
   */
  methods: {
    ...mapActions([
      'userLogin',
      'findCdTreeListByYhBm'
    ]),
    async getUserHeader () {
      let response = this.userData
      let userInfo = await this.Api.findYhByYhm({ yhm: response.userName })
      if (userInfo.statusCode == 200) {
        this.loading = false
        this.$store.commit('SET_USER_INFO', {
          userName: userInfo.data.xm,
          header: (userInfo.data.ftpFileInfoList.length != 0) ? userInfo.data.ftpFileInfoList[0].filePath : '',
          identity: userInfo.data.sflx,
          sjhm: userInfo.data.sjhm,
          ssbjmc: userInfo.data.ssbjmc,
          ssxymc: userInfo.data.ssxymc,
          sszymc: userInfo.data.sszymc,
          xm: userInfo.data.xm,
          fdydh: userInfo.data.fdydh,
          fdymc: userInfo.data.fdymc,
          yhbm: userInfo.data.bm,
        })
        this.$store.commit('SET_UPLOAD_HEADER', {
          Authorization: 'Bearer ' + response.access_token,
          'app-flag': 'tyrz'
        })
        // 根据角色跳转页面
        let path = (userInfo.data.sflx == 'JG' || userInfo.data.sflx == 'GM') ? '/portalTeacher' : '/portalStudent'
        this.$router.push(path)
      }
    },
    // getAllMenu() {
    //   this.findCdTreeListByYhBm({yyBm: 'YY_b78535e013aa4b1ea84de63c5b566f9e'}).then(res => {
    //     if (res.statusCode == 200) {
    //       console.log('菜单>>>', res.data)
    //       // set顶部菜单数据
    //       this.$store.commit("SET_TOP_MENU_LIST", res.data)
    //       // set顶部选中
    //       this.$store.commit("SET_ACTIVE_INDEX", res.data[0].id)
    //       res.data.forEach((val) => {
    //         if (val.id == this.activeIndex) {
    //           // set左侧菜单数据
    //           this.$store.commit("SET_SIDEBAR_LIST", val.children)
    //         }
    //       })
    //       setStore({name: 'menu', content: res.data, type: 'session'})
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    getDictionariesValueAll () {
      this.Api.findTypeAndCodeAllList().then(res => {
        // console.log('获取字典>>>', res)
        if (res.statusCode == 200) {
          // console.log(1111111111111)
          this.$store.commit("SET_DICT", res.data)
          console.log('iam2222222222')
        }
      }).catch(e => {
        console.log('获取字典Error>>>', e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  overflow: hidden;
  /*
     * 顶部导航
     */
  .first_header {
    width: 100%;
    background: #ffffff;
    height: 80px !important;
    padding: 0;
  }
  .main {
    padding: 0;
    margin: 0;
  }
}
</style>
