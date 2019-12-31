<template>
  <div class="myService">
    <!--第一层开始-->
    <div class="gzx_row_one">
      <!--列表部分开始-->
      <div class="myServiceNotify" v-if="!show_content" :class="{show_content_class : show_content==false}">
        <div style="width: 100%" class="top_btn">
          <div class="top_btn_list">
            <div class="tab_btn" :class="{btn_active : 0===curId}" @click="choose_tab(0)">
              <i class="iconfont icon icon-tongzhi"></i>公告（
              <span class="font_red" :class="{btn_active : 0===curId}">{{total1}}</span>）
            </div>
            <div class="tab_btn" :class="{btn_active : 1===curId}" @click="choose_tab(1)">
              <i class="iconfont icon icon-12"></i>公示（
              <span class="font_red" :class="{btn_active : 1===curId}">{{total2}}</span>）
            </div>
            <div class="tab_btn" :class="{btn_active : 2===curId}" @click="choose_tab(2)">
              <i class="iconfont icon icon-xinxi"></i>通知（
              <span class="font_red" :class="{btn_active : 2===curId}">{{total3}}</span>）
            </div>
          </div>
          <div class="more" @click="jumpConnection('消息中心管理系统',{
            href : 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
            target:'/teacher/messageList',
            appliid: 'YY_b314a809021d47c593d4cd5c12670613'
          })">
            <i class="iconfont icon-gengduo"></i>
          </div>
        </div>

        <el-table :data="news_list" style="width: 95%">
          <el-table-column label min-width="950">
            <template slot-scope="scope">
              <span style="margin-left: 10px" @click="to_content(scope.row.bm)">
                {{ scope.row.bt }}
                <span class="dont_read" v-if="scope.row.ydzt=='未读'">【{{ scope.row.ydzt }}】</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="fbsj" min-width="200" align="center"></el-table-column>
        </el-table>

      </div>
      <!--列表部分结束-->
      <!--正文部分开始-->
      <div class="myServiceNotify" v-if="show_content" :class="{show_content_class : show_content==false}">
        <!--标题-->

        <div class="myServiceBottomTitle middle_title">
          <p>
            {{news_title}}
            <el-tooltip class="item" effect="dark" content="点击关闭详情" placement="top">
              <span class="close_content" @click="close_content()">x</span>
            </el-tooltip>
          </p>
        </div>
        <div class="page_content" v-html="news_content"></div>
      </div>
      <!--正文部分结束-->
      <div class="count-card">
        <div class="grid-content">
          <div class="w_bg">
            <h1 class="v1 v2">待办理</h1>
            <div class="vdiv vdiv2 v1p">
              <b>{{cardInfo.wait}}</b>个
              <img class="vimg" src="@/assets/images/v8.jpg" alt />
            </div>
          </div>
        </div>
        <div class="height_10"></div>
        <div class="grid-content">
          <div class="w_bg">
            <h1 class="v1 v3">审核中</h1>
            <div class="vdiv vdiv3 v1p">
              <b>{{cardInfo.check}}</b>个
              <img class="vimg" src="@/assets/images/v6.jpg" alt />
            </div>
          </div>
        </div>
        <div class="height_10"></div>
        <div class="grid-content">
          <div class="w_bg">
            <h1 class="v1">已完成</h1>
            <div class="vdiv v1p">
              <b>{{cardInfo.finish}}</b>个
              <img class="vimg" src="@/assets/images/v5.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--常用应用开始-->
    <div class="myServiceTop studentBox">
      <div class="myServiceBottomTitle middle_title">
        <p>常用应用</p>
      </div>
      <div class="myServiceText">
        <ul class="clearBox">
          <el-row :gutter="2">
            <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in appData" :key="index">
              <li @click="serviceClick(item)">
                <div class="serviceItem serviceAppItem itemColor2">
                  <i :class="item.src" class="iconfont tb"></i>
                  <!--<img :src="item.src">-->
                  <div class="nsBox">
                    <b>{{item.title}}</b>
                  </div>
                  <span>
                    <i class="iconfont icon-dian"></i>
                  </span>
                  <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                </div>
              </li>
            </el-col>
          </el-row>
        </ul>
      </div>
      <!--常用应用结束-->
    </div>
    <!--底部copyright-->
    <el-footer class="copyright">{{footerTitle}}</el-footer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'

export default {
  computed: {
    ...mapGetters([
      'isCollapse',
      'heightTitle',
      'theme',
      'globalLoading',
      'topMenuList',
      'activeIndex',
      'tag',
      'footerTitle',
      'common',
      'userData',
      'sidebarList'
    ])
  },
  /**
   * 用来监控自己定义的变量
   */

  data () {
    return {
      news_list: [],
      news_title: '', //新闻标题
      news_content: '', //新闻详情
      show_content: false, //是否显示详情
      currentPage: 1, //默认的页码
      fblx: '', //发布类型
      curId: 0, //第几个tab被选中
      total: 0, //计算选中tab的total
      total0: 0, //共有多少条数据
      total1: 0, //公告
      total2: 0, //公示
      total3: 0, //通知
      cardInfo: {
        wait: 5,
        check: 2,
        finish: 3
      },


      //学生管理data
      xlzxData: [
        {
          icon: 'icon-ArtboardCopy145',
          title: '预约管理',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d8e2880734eb465da524fcbca9fe20e8',
          target: '/teacher/appointmentAdmin'
        }
      ],
      //心理中心data
      tygnData: [
        {
          icon: 'icon-ArtboardCopy137',
          title: '校车查询',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d9ed11eb4bd247d7b3f6cf6c7ccf9475',
          target: '/teacher/schoolBusAdmin'
        },
        {
          icon: 'icon-ArtboardCopy142',
          title: '电话查询',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d9ed11eb4bd247d7b3f6cf6c7ccf9475',
          target: '/teacher/phoneAdmin'
        },
        {
          icon: 'icon-ArtboardCopy143',
          title: '下载中心',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d9ed11eb4bd247d7b3f6cf6c7ccf9475',
          target: '/teacher/downloadCenter'
        },
        {
          icon: 'icon-ArtboardCopy146',
          title: '帮助中心',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d9ed11eb4bd247d7b3f6cf6c7ccf9475',
          target: '/teacher/helpCenter'
        },
        {
          icon: 'icon-ArtboardCopy144',
          title: '失物招领',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d9ed11eb4bd247d7b3f6cf6c7ccf9475',
          target: '/teacher/findExamine'
        },
        {
          icon: 'icon-ArtboardCopy144',
          title: '服务列表',
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_d9ed11eb4bd247d7b3f6cf6c7ccf9475',
          target: '/service/serviceList'
        }
      ],
      //通用功能data
      appData: [], //常用应用data
      yhsf: '' //用户身份类型
    }
  },
  created () {
    // 关闭loading
    // this.$store.commit("SET_GLOBAL_LOADING", false)
    // env.BASE_API = env.BASE_API.replace('"', "").replace('"', "");
  },
  mounted () {
    //进入页面取一次新闻
    this.get_news()
    this.yhsf = store.state.user.userInfo.identity
    console.log(this.yhsf, '用户身份类型')
    this.findAllYyList(this.yhsf)
  },
  methods: {
    ...mapActions([

      'pullMhxx',
      'grMhxxList',
      'grWdxx',
      'findYys',
      'findByCondition',
      'findMhxxByBm',
      'ydxx'
    ]),
    lenTitle (str) {
      let text
      if (str.length > 7) {
        text = str.slice(0, 7) + '...'
      } else {
        text = str
      }
      return text
    },
    //顶部tab
    choose_tab (val) {
      this.fblx = val
      this.curId = val
      this.get_news()
    },
    // 系统跳转
    serviceClick (item) {
      // this.$store.commit("SET_ACTIVE_INDEX", item.id)
      if (item.yyzt == '1') {
        this.$message.warning('该系统已禁用')
        return
      }
      this.$message.success('正在进入 ' + item.title + ' 应用')
      if (this.userData.applicationId == 'YY_68d206c2e79342dd9438a16fafd9c5d6') {
        this.teacherActivity() // 活动中心教师端的特殊处理特殊
      }
      if (location.href.indexOf('localhost') == -1) {
        window.open(item.url + '?appliid=' + item.bm + '&title=' + item.title)
      } else {
        window.open(`http://localhost:8801/#/?appliid=${item.bm}&title=${item.title}`)
      }
    },
    teacherActivity () {
      this.$store.commit('SET_DEFAULT_ACTIVE', {
        id: this.sidebarList[0].id,
        value: this.sidebarList[0].href
      })
      this.$store.commit('ADD_TAG', {
        label: this.sidebarList[0].label,
        value: this.sidebarList[0].href,
        params: {},
        query: {
          defaultActive: this.sidebarList[0].id,
          defaultActivePath: this.sidebarList[0].href,
          activeIndex: this.activeIndex
        },
        close: true
      })
      console.log(108);

      this.$router.push(this.sidebarList[0].href)
      this.$store.commit('SET_NAVIGATION_AND_RAGS_SHOW', true)
    },
    // 应用跳转
    jumpConnection (title, item) {
      if (item.target == '') {
        this.$message.error('该服务暂未开放!')
        return
      }
      if (location.href.indexOf('localhost') != -1) {
        location.href =
          'http://localhost:8801/#/?target=' +
          item.target +
          '&appliid=' +
          item.appliid +
          '&title=' +
          title
      } else {
        location.href =
          item.href +
          '?target=' +
          item.target +
          '&appliid=' +
          item.appliid +
          '&title=' +
          title
      }
    },
    //获取应用列表
    async findAllYyList (yhsf) {
      try {
        let datas = await this.Api.findGrYys(yhsf)
        let data = []
        if (datas.statusCode == 200) {
          for (let i = 0; i < datas.data.length; i++) {
            let urlStr = datas.data[i].yytb
            let terms = {
              bm: datas.data[i].bm,
              title: datas.data[i].yymc,
              url: datas.data[i].yydz,
              src: urlStr,
              yyzt: datas.data[i].sfjy
            }
            data.push(terms)
          }
          this.appData = data
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 点击进入详情
    to_content (data) {
      console.log(data) //打印的是点击的新闻id
      this.show_content = true
      //走接口前先赋空一下，避免缓存
      this.news_title = ''
      this.news_content = ''

      this.findMhxxByBm(data).then(res => {
        this.news_title = res.data.bt
        this.news_content = res.data.fbnr
      })
      //走未读变已读的接口
      this.ydxx(data).then(res => {
        console.log('是否已读' + res)
      })
    },
    //点击关闭
    close_content () {
      this.show_content = false
      //进入页面取一次新闻
      this.get_news()
      //进入页面取一下页码
      this.get_total()
    },
    get_news () {
      //拉取信息
      this.pullMhxx()
        .then(res => {
          if (res.statusCode == 200) {
            this.get_total()
            //获取全部新闻开始
            this.grMhxxList({
              pageSize: 5,
              pageNum: this.currentPage,
              fblx: this.fblx,
              ydzt: ''
            })
              .then(res => {
                //如果返回的数量是0，就不给news_list赋值
                if (res.data.total != 0) {
                  this.news_list = res.data.data
                  this.total = Number(res.data.total)
                } else {
                  console.log('无更多数据')
                  this.news_list = []
                }
                console.log('新闻列表', res.data)
                // 发布类型值(1,2,3)变成公告公示通知
                for (var i = 0; i < this.news_list.length; i++) {
                  if (this.news_list[i].fblx == 1) {
                    this.news_list[i].bt = '【公告】' + this.news_list[i].bt
                  } else if (this.news_list[i].fblx == 2) {
                    this.news_list[i].bt = '【公示】' + this.news_list[i].bt
                  } else if (this.news_list[i].fblx == 3) {
                    this.news_list[i].bt = '【通知】' + this.news_list[i].bt
                  }
                }
              })
              .catch(error => {
                this.$message.error('数据获取失败')
              })
            // 获取全部新闻结束
          } else {
            //如果接口没有响应，就重新来一轮
            console.log('如果接口没有响应，就重新来一轮')
            this.get_total()
            this.grMhxxList({
              pageSize: 5,
              pageNum: this.currentPage,
              fblx: this.fblx,
              ydzt: ''
            })
              .then(res => {
                //如果返回的数量是0，就不给news_list赋值
                if (res.data.total != 0) {
                  this.news_list = res.data.data
                  this.total = Number(res.data.total)
                } else {
                  console.log('无更多数据')
                  this.$message.error('无更多数据')
                }
                console.log('新闻列表', res.data)
                // 发布类型值(1,2,3)变成公告公示通知
                for (var i = 0; i < this.news_list.length; i++) {
                  if (this.news_list[i].fblx == 1) {
                    this.news_list[i].bt = '【公告】' + this.news_list[i].bt
                  } else if (this.news_list[i].fblx == 2) {
                    this.news_list[i].bt = '【公示】' + this.news_list[i].bt
                  } else if (this.news_list[i].fblx == 3) {
                    this.news_list[i].bt = '【通知】' + this.news_list[i].bt
                  }
                }
              })
              .catch(error => {
                this.$message.error('数据获取失败')
              })
            // 获取全部新闻结束
          }
        })
        .catch(error => {
          this.$message.error('数据获取失败')
        })
    },
    get_total () {
      //取每个分类的未读消息
      this.grWdxx().then(res => {
        this.total1 = Number(res.data[1]) || 0
        this.total2 = Number(res.data[2]) || 0
        this.total3 = Number(res.data[3]) || 0
        this.total0 = this.total1 + this.total2 + this.total3
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 郭泽璇写的css开始
.person_content {
  width: 100%;
  background: url(~@/assets/images/person_bg.jpg);
  background-size: 100% 100%;
  height: 290px;
  box-sizing: border-box;
  padding: 0px 95px 15px 95px;
  display: flex;
  justify-content: space-around;
  color: #fff;
  overflow: hidden;
  align-items: center;
}

.person_left {
  width: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.person_img {
  border: 6px solid #294e9c;
}

.person_text {
  height: 175px;
  box-sizing: border-box;
  // padding-top: 45px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.person_text p i {
  margin-right: 5px;
}

.person_name {
  font-size: 19px;
}

.person_id {
  font-size: 11px;
}

.person_mid {
  width: 420px;
  height: 210px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.person_mid_content {
  width: 200px;
  height: 90px;
  color: #f2fbfb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
}

.person_mid :nth-child(1).person_mid_content {
  background: #28c6c0;
}

.person_mid :nth-child(2).person_mid_content {
  background: #f9b434;
}

.person_mid :nth-child(3).person_mid_content {
  background: #d76c6c;
}

.person_mid :nth-child(4).person_mid_content {
  background: #4a90e2;
}

.person_mid_content .left_text {
  width: 50px;
  height: 55px;
  box-sizing: border-box;
  border-right: 1px solid #fff;
  margin-left: 25px;
  padding: 0px 15px 0px 0px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.person_mid_content .right_text {
  font-size: 16px;
  width: 150px;
  text-align: center;
}

.person_right {
  width: 430px;
  height: 210px;
}

// 第一层开始
.gzx_row_one {
  // width: 100%;
  width: 96%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  // padding: 0px 40px;
  position: relative;
  // top: -45px;
}

.height_10 {
  width: 100%;
  height: 23px;
}

.margin_left_20 {
  margin-left: 10px;
}

.more_btn {
  float: right;
  margin-right: 30px;
  color: #28c6c0;
  font-size: 20px;
  // margin-top: 20px;
  cursor: pointer;
}

.more_btn_list {
  display: flex;
  justify-content: space-between;
}

.font_red {
  color: #d53449;
}

.icon {
  margin-right: 3px;
}

// 顶部选项卡按钮
.top_btn {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top_btn_list {
  display: flex;
  justify-content: flex-start;
}

.tab_btn {
  width: 150px;
  height: 35px;
  color: #909399;
  background: #f4f4f5;
  border: 1px solid #d3d4d6;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  cursor: pointer;
}

//选中的tab
.btn_active {
  background: #28c6c0;
  color: #fff !important;
}

.fenye_zujian {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 20px;
}

.page_content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
}

.close_content {
  float: right;
  color: #4a4a4a;
  cursor: pointer;
  font-size: 20px;
}

.dont_read {
  color: #ce0b24;
}

.myService {
  width: 100%;
  min-height: 100%;
  background: #f7f7f7;
  overflow: hidden;
}

.studentBox {
  width: 96%;
  /* height: 34%; */
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 9px;
  margin: 20px auto 0;
}

.myWork {
  margin-top: 0;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0; /*初始状态 透明度为0*/
  }
  100% {
    opacity: 1; /*结尾状态 透明度为1*/
  }
}

.show_content_class {
  -webkit-animation-name: fadeIn; /*动画名称*/
  -webkit-animation-duration: 1s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
}

.myServiceNotify {
  width: 72%;
  height: 420px;
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 9px;
  margin-bottom: 20px;
  overflow-y: auto;
}

.myServiceNotify .el-button {
  margin-left: 30px;
  margin-top: 20px;
  width: 150px;
}

.more {
  float: right;
  height: 50px;
  line-height: 50px;
  margin-right: 2.6%;
}

.more i {
  font-size: 28px;
  color: #606266;
}

.myServiceTopNav {
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
  margin: 0 auto;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid rgba(155, 155, 155, 0.31);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.myServiceTopNav > ul > li {
  float: left;
  height: 48px;
  width: 80px;
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.myServiceTopNav > ul > li:hover {
  cursor: pointer;
}

.myServiceTopNav > ul > li.isStyle {
  border-bottom: 3px solid #28c6c0;
  color: #28c6c0;
}

.myServiceText {
  width: 100%;
  height: -moz-calc(100% - 48px);
  height: -webkit-calc(100% - 48px);
  height: calc(100% - 48px);
}

.myServiceText ul {
  padding: 0 20px 20px 20px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.myServiceText ul li {
  float: left;
  margin-top: 20px;
  width: 100%;
}

.myServiceText ul li > img {
  margin: 0 auto;
  display: block;
}

.myServiceText ul li > img:hover {
  cursor: pointer;
}

.myServiceBottom {
  width: 96%;
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 9px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
}

.myServiceBottomTitle {
  overflow: hidden;
}

.myServiceBottomSerach {
  margin: 20px 40px 0 40px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.myServiceBottomTab {
  margin: 20px 40px 0 40px;
  height: 25px;
  line-height: 25px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.myServiceBottomTab > span {
  color: #6f828a;
  font-weight: bold;
  float: left;
  width: 70px;
}

.myServiceBottomTab > ul {
  float: left;
  flex: 1;
}

.myServiceBottomTab > ul > li {
  float: left;
  color: #6f828a;
  padding: 0 14px 0 14px;
  margin-left: 14px;
  text-align: left;
}

.myServiceBottomTab > ul > li.isSerStyle {
  background: #28c6c0;
  color: white;
}

.myServiceBottomTab > ul > li:hover {
  cursor: pointer;
}

.myServiceBottomTab4 {
  margin-bottom: 20px;
}

.myServiceBottomTab4 > ul > li {
  padding: 0 8px 0 8px;
  margin-left: 8px;
}

.myServiceBottomTab4 > ul > li:nth-child(1),
.myServiceBottomTab4 > ul > li:nth-child(2) {
  padding: 0 14px 0 14px;
  margin-left: 14px;
}

.ServiceBottomAll {
  margin: 0 20px 20px 20px;
  border-top: 1px solid rgba(155, 155, 155, 0.31);
  overflow: hidden;
}

.ServiceBottomAll ul {
  margin-bottom: 20px;
}

.ServiceBottomAll li {
  margin-top: 20px;
}

.ServiceBottomAll li > img {
  margin: 0 auto;
  display: block;
}

.ServiceBottomAll li > img:hover {
  cursor: pointer;
}

.el-table {
  margin-left: 30px;
}

.head_background_img {
  /*background: url(~@/assets/images/xsglhead.png);*/
  background-color: #33425a;
  height: 275px;
  width: 100%;
  background-repeat: no-repeat;
  /* background-size:100% 100%; */
  /* -moz-background-size:100% 100%;} */
}

.grid-content {
  border-radius: 0px;
  min-height: 100px;
  cursor: pointer;
  width: 100%;
  height: 100px;
}

.w_bg {
  min-height: auto;
}

.w_bg .mypublish .el-table__empty-block {
  min-height: 44px;
}

.v1 {
  height: 34px;
  line-height: 34px;
  background: #0eadd7;
  font-size: 14px;
  color: #fff;
  padding-left: 15px;
  margin-top: 21px;
}

.v2 {
  background: #ee9611;
}

.v3 {
  background: #29a38b;
}

.v1p {
  float: left;
  color: #fff;
  margin-left: 20px;
  margin-top: 25px;
  z-index: 2;

  b {
    font-size: 40px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
    margin-right: 10px;
  }
}

.vdiv {
  width: 100%;
  float: left;
  background: #09c0ec;
  height: 80px;
  text-align: center;
  margin: 0px;
  padding-top: 17px;
}

.vdiv img {
  margin-top: 0px;
}

.vdiv2 {
  background: #f9b433;
}

.vdiv3 {
  background: RGB(40, 198, 192);
}

.vimg {
  float: right;
  margin-right: 20px;
  margin-bottom: 5px;
  margin-top: 15px;
  width: 75px;
  height: 65px;
}

.count-card {
  height: 460px;
  width: 27%;
  padding: 0px;
}

/*
 * 底部 copyright
 */
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

/*
 * 顶部导航
 */
/*.first_header {*/
/*width: 100%;*/
/*background: #ffffff;*/
/*height: 80px !important;*/
/*z-index: 1;*/
/*padding: 0;*/
/*}*/

.serviceItem {
  border-radius: 4px;
  height: 100px;
  width: 256px;
  margin-left: 10px;
  cursor: pointer;
  position: relative;
  /*padding-top: 30px;*/
  font-family: "微软雅黑";
}

.itemColor1 {
  background: rgb(214, 232, 242);
  color: rgb(36, 187, 182);
}

.itemColor2 {
  background: rgb(250, 211, 147);
  color: rgb(200, 141, 42);
}

.serviceItem .tb {
  font-size: 38px;
  position: absolute;
  top: 30px;
  left: 65px;
}

.serviceAppItem > img {
  margin-top: 25px;
  margin-left: 60px;
  width: 50px;
  height: 50px;
}

.serviceItem span:nth-child(3) {
  position: absolute;
  left: 5px;
  top: 0;
  height: 100%;
  line-height: 98px;
}

.serviceItem span:nth-child(3) i {
  font-size: 30px;
}

.serviceItem i:nth-child(4) {
  font-size: 26px;
  position: absolute;
  right: 9px;
  top: -3px;
}

.serviceItem > div {
  /*<!--margin-top: -32px;-->*/
  /*margin-left: 118px;*/
  width: 120px;
  height: 100%;
  display: flex;
  align-items: center;
  float: right;
  margin-right: 10px;
}

/*.nsBox{*/
/*width: 128px;*/
/*}*/
</style>
