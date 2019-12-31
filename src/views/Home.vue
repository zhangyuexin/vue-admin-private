<template>
  <el-container class="home" v-loading="globalLoading" element-loading-text="数据正在处理中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(10, 10, 10, 0.8)">
    <el-header class="first_header">
      <!-- 顶部导航栏 -->
      <top />
    </el-header>
    <el-container style="height: calc(100% - 80px);">
      <!-- 左侧导航栏 -->
      <div class="left" v-if="navigationAndTagsShow">
        <sidebar></sidebar>
      </div>
      <el-container class="right" style="height: 100%;">
        <!-- 顶部标签卡 -->
        <el-header class="second_header" v-if="navigationAndTagsShow">
          <tags></tags>
        </el-header>
        <!-- 右侧数据展示 -->
        <el-main class="second_middle">
          <!-- 展示数据 -->
          <router-view></router-view>
        </el-main>
        <!-- 底部copyright -->
        <el-footer class="copyright">
          {{footerTitle}}
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
/**
 * TH 1450096592@qq.com
 * 以下注解，解释权归 "TH" 所有
 */
import top from '@/components/top/'
import sidebar from '@/components/sidebar'
import tags from '@/components/tag'
import { mapActions, mapGetters } from 'vuex'
import { getStore, removeStore, setStore, clearStore } from '@/utils/store'
import { setTheme } from '@/utils/util'

export default {
  components: {
    top,
    sidebar,
    tags
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
      'theme',
      'globalLoading',
      'tag',
      'footerTitle',
      'userData',
      'navigationAndTagsShow',
      'topTitle'
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
    // 设置userData数据
    this.$store.commit("SET_USER_DATA", {
      applicationId: getStore({ name: 'applicationId', type: 'session' }),
      access_token: Cookies.get('accessToken'),
      userName: Cookies.get('userName'),
      location: 'index'
    })

    // 防止刷新标题改变
    document.title = this.topTitle
    // 获取字典值
    if (getStore({ name: 'dictionary', type: 'session' }) == undefined) {
      this.findTypeAndCodeAllList()
    }
    // 获取顶部标题&页脚信息
    this.getFindXtsz()
  },
  /**
   * 生命周期钩子函数，el被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
   * 在这发起后端请求，拿回数据，配合路由钩子做一些事情
   */
  mounted () {
    // 设置主题颜色
    setTheme(getStore({ name: 'theme' }), this.theme)
  },
  /**
   * 创建所有JavaScript函数方法
   */
  methods: {
    ...mapActions([

      'findTypeAndCodeAllList'
    ]),
    getFindXtsz () {
      this.Api.findXtsz().then(res => {
        if (res.statusCode == 200) {
          // 设置顶部标题
          // this.$store.commit("SET_TOP_TITLE", res.data.bt)
          // 设置底部文字
          this.$store.commit("SET_FOOTER_TITLE", res.data.dbwz + ' ' + res.data.zzq)
        }
      }).catch(err => {
        console.log(err)
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
  /*overflow: hidden;*/
  /*顶部导航*/
  .first_header {
    width: 100%;
    background: #ffffff;
    height: 80px !important;
    padding: 0;
  }
  /*左侧导航*/
  .left {
    max-width: 220px;
  }
  /*右侧导航*/
  .right {
    font-size: 14px !important;
    height: 100%;
    width: 100%;
  }
  /*顶部tag标签*/
  .second_header {
    background: #ffffff;
    height: 70px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
    border-top: 1px solid rgba(0, 0, 0, 0.09);
  }
  /*左侧展示数据部分*/
  .second_middle {
    padding: 20px 20px 4px 20px;
    width: 100%;
    height: 100%;
  }
  /*底部 copyright*/
  .copyright {
    width: 80%;
    margin: 14px auto;
    text-align: center;
    height: 20px !important;
    line-height: 20px;
    color: #9b9b9b;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    letter-spacing: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
