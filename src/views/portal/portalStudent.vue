<template>
  <div class="protalStudent">
    <!--头部开始-->
    <div class="studentInforHeader">
      <div class="studentInforHeaderWrap">
        <div class="studentInforHeaderBox1">
          <div class="txBox clearBox">
            <div class="clearBox">
              <img :src="userInfo.header" v-if="userInfo.header" />
              <img src="@/assets/images/header.svg" v-else />
              <div>
                <p class="firstP">
                  <span>{{userInfo.xm}}</span>
                  <i :class="['iconfont',myList.sex ? 'icon-nan' : 'icon-nv']" :style="{color:myList.sex ? 'rgb(74, 144, 226)': '#d76c6c'}"></i>
                </p>
                <p>
                  <i class="iconfont icon-phone txIcon"></i>
                  <span>{{userInfo.ssxymc}}</span>
                </p>
                <div class="clearBox">
                  <p>
                    <i class="iconfont icon-ArtboardCopy85 txIcon"></i>
                    <span>{{userInfo.ssbjmc}}</span>
                  </p>
                  <p>
                    <i class="iconfont icon-icon-test txIcon"></i>
                    <span class="myListXy">{{userInfo.ssxymc}}</span>
                  </p>
                  <p>
                    <i class="iconfont icon-book_icon txIcon" style="font-size: 16px;"></i>
                    <span class="myListZy">{{userInfo.sszymc}}</span>
                  </p>
                </div>
                <p>
                  <i class="iconfont icon-renyuan txIcon" style="font-size: 16px;"></i>
                  <span>辅导员：</span>
                  <span>{{userInfo.fdymc}}</span>
                  <span>{{userInfo.fdydh}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="fourBox">
            <el-col :span="11" v-for="(item,index) in fourBoxData" :key="index">
              <div class="fourBoxCard" :style="{background:item.bgColor}">
                <div>
                  <span>{{item.txt}}</span>
                  <span>{{item.count}}</span>
                </div>
              </div>
            </el-col>
          </div>
          <div class="countBox">
            <div id="myChart" style="width: 230px; height:230px; margin: 0 auto;"></div>
          </div>
        </div>
      </div>
    </div>
    <!--头部结束-->
    <!--消息通知开始-->
    <div class="studentNews">
      <div class="workCount">
        <div class="workCountMain clearBox">
          <div>
            <div>
              <span>待办理</span>
            </div>
            <div class="workCountContent clearBox">
              <div><b>{{cardInfo.wait}}</b>个</div>
              <img class="vimg" src="@/assets/images/v8.jpg" alt>
            </div>
          </div>
          <div>
            <div>
              <span>审核中</span>
            </div>
            <div class="workCountContent clearBox">
              <div><b>{{cardInfo.check}}</b>个</div>
              <img class="vimg" src="@/assets/images/v6.jpg" alt>
            </div>
          </div>
          <div>
            <div>
              <span>已完结</span>
            </div>
            <div class="workCountContent clearBox">
              <div><b>{{cardInfo.finish}}</b>个</div>
              <img class="vimg" src="@/assets/images/v5.png" alt>
            </div>
          </div>
        </div>
      </div>

      <div class="gzx_row_one">
        <!--列表部分开始-->
        <div class="myServiceNotify" v-if="!show_content" :class="{show_content_class : show_content==false}">
          <div style="width: 100%" class="top_btn">
            <div class="top_btn_list">
              <div class="tab_btn " :class="{btn_active : 1===curId}" @click="choose_tab(1)">
                <i class="iconfont icon icon-tongzhi"></i>公告（<span class="font_red" :class="{btn_active :1===curId}">{{total1}}</span>）
              </div>
              <div class="tab_btn" :class="{btn_active : 2===curId}" @click="choose_tab(2)"><i class="iconfont icon icon-12"></i>公示（<span class="font_red" :class="{btn_active : 2===curId}">{{total2}}</span>）
              </div>
              <div class="tab_btn" :class="{btn_active : 3===curId}" @click="choose_tab(3)"><i class="iconfont icon icon-xinxi"></i>通知（<span class="font_red" :class="{btn_active : 3===curId}">{{total3}}</span>）
              </div>
            </div>
            <div class="more">
              <i class="iconfont icon-gengduo" @click="jumpConnection('统一门户管理系统',{
                href : 'http://stuinfo.neu.edu.cn/cloud-fw/#',
                target:'/teacher/messageList',
                appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c'
              })"></i>
            </div>
          </div>
          <el-table :data="news_list" style="width: 95%">
            <el-table-column label="" min-width="950">
              <template slot-scope="scope">
                <span style="margin-left: 10px" @click='to_content(scope.row.bm)'>{{ scope.row.bt }} <span class="dont_read" v-if="scope.row.ydzt=='未读'">【{{ scope.row.ydzt }}】</span></span>
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
            <p>{{news_title}}
              <el-tooltip class="item" effect="dark" content="点击关闭详情" placement="top">
                <span class="close_content" @click="close_content()">x</span>
              </el-tooltip>
            </p>
          </div>
          <div class="page_content" v-html="news_content">
          </div>
        </div>
        <!--正文部分结束-->
        <div class="syllabus">
          <div class="middle_title ">
            <P>课程表</P>
          </div>
          <!--<div class="syllabusWrap">-->
          <!--<ul class="clearBox syllabusWrap_ul">-->
          <!--<li>周一</li>-->
          <!--<li>周二</li>-->
          <!--<li>周三</li>-->
          <!--<li>周四</li>-->
          <!--<li>周五</li>-->
          <!--<li>周六</li>-->
          <!--<li>周日</li>-->
          <!--</ul>-->
          <!--<avue-crud ref="crud" :data="classData" :option="option1"  height="460" >-->
          <!--<template slot="empty">-->
          <!--<div>暂无数据</div>-->
          <!--</template>-->
          <!--<template slot="monday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.monday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->
          <!--<template slot="tuesday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.tuesday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->
          <!--<template slot="wednesday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.wednesday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->
          <!--<template slot="thursday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.thursday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->
          <!--<template slot="friday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.friday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->
          <!--<template slot="saturday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.saturday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->
          <!--<template slot="sunday" slot-scope="scope">-->
          <!--<div class="tuijian">-->
          <!--<el-tag>{{scope.row.sunday}}</el-tag>-->
          <!--</div>-->
          <!--</template>-->

          <!--</avue-crud>-->

          <!--</div>-->

          <div class="syllabusWrap">
            <img src="@/assets/images/kcb.png" alt>
          </div>
          <div>
            <p>该功能正在研发中,敬请期待</p>
          </div>
        </div>

      </div>
    </div>
    <!--消息通知结束-->
    <div class="serviceList">
      <!--推荐服务开始-->
      <div class="tjfwWrap serviceBox">
        <div class="middle_title more_ser">
          <P>推荐服务</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul>
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in tjfwData" :key="index">
                <li @click="jumpConnection('统一门户管理系统',item)">
                  <div class="serviceItem itemColor1">
                    <i :class="item.icon" class="iconfont tb"></i>
                    <div>
                      <b>{{lenTitle(item.title)}}</b>
                      <b style="font-size: 12px">{{lenTitle(item.dep)}}</b>
                    </div>
                    <span><i class="iconfont icon-dian"></i></span>
                    <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                    <i class="iconfont" :class="item.isHeart ? 'icon-ArtboardCopy245' : 'icon-ArtboardCopy234'" @click.stop="collection(item,$event)" :title="item.isHeart ? '已收藏':'收藏'"></i>
                  </div>
                </li>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
      <!--学生管理服务开始-->
      <div class="serviceBox">
        <div class="middle_title more_ser">
          <P>学生管理服务</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul>
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in xsglData" :key="index">
                <li @click="jumpConnection('统一门户管理系统',item)">
                  <div class="serviceItem itemColor1">
                    <i :class="item.icon" class="iconfont tb"></i>
                    <div>
                      <b>{{lenTitle(item.title)}}</b>
                      <b style="font-size: 12px">{{lenTitle(item.dep)}}</b>
                    </div>
                    <span><i class="iconfont icon-dian"></i></span>
                    <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                    <i class="iconfont icon-zan" :class="item.isHeart ? 'icon-ArtboardCopy245' : 'icon-ArtboardCopy234'" @click.stop="collection(item,$event)" :title="item.isHeart ? '已收藏':'收藏'"></i>
                  </div>
                </li>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
      <!--学生管理服务结束-->
      <!--推荐服务结束-->
      <!--学工服务开始-->
      <div class="serviceBox">
        <div class="middle_title more_ser">
          <P>学工服务</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul>
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in xgData" :key="index">
                <li @click="jumpConnection('统一门户学工系统',item)">
                  <div class="serviceItem itemColor1">
                    <i :class="item.icon" class="iconfont tb"></i>
                    <div>
                      <b>{{lenTitle(item.title)}}</b>
                      <b style="font-size: 12px">{{lenTitle(item.dep)}}</b>
                    </div>
                    <span><i class="iconfont icon-dian"></i></span>
                    <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                    <i class="iconfont icon-zan" :class="item.isHeart ? 'icon-ArtboardCopy245' : 'icon-ArtboardCopy234'" @click.stop="collection(item,$event)" :title="item.isHeart ? '已收藏':'收藏'"></i>
                  </div>
                </li>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
      <!--学工服务结束-->
      <!--资助服务开始-->
      <div class="serviceBox">
        <div class="middle_title more_ser">
          <P>资助服务</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul>
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in zzfwData" :key="index">
                <li @click="jumpConnection('统一门户管理系统',item)">
                  <div class="serviceItem itemColor1">
                    <i :class="item.icon" class="iconfont tb"></i>
                    <div>
                      <b>{{lenTitle(item.title)}}</b>
                      <b style="font-size: 12px">{{lenTitle(item.dep)}}</b>
                    </div>
                    <span><i class="iconfont icon-dian"></i></span>
                    <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                    <i class="iconfont icon-zan" :class="item.isHeart ? 'icon-ArtboardCopy245' : 'icon-ArtboardCopy234'" @click.stop="collection(item,$event)" :title="item.isHeart ? '已收藏':'收藏'"></i>
                  </div>
                </li>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
      <!--资助服务结束-->
      <!--心理服务开始-->
      <div class="serviceBox">
        <div class="middle_title more_ser">
          <P>成长中心</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul>
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in xlzxData" :key="index">
                <li @click="jumpConnection('统一门户管理系统',item)">
                  <div class="serviceItem itemColor1">
                    <i :class="item.icon" class="iconfont tb"></i>
                    <div>
                      <b>{{lenTitle(item.title)}}</b>
                      <b style="font-size: 12px">{{lenTitle(item.dep)}}</b>
                    </div>
                    <span><i class="iconfont icon-dian"></i></span>
                    <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                    <i class="iconfont icon-zan" :class="item.isHeart ? 'icon-ArtboardCopy245' : 'icon-ArtboardCopy234'" @click="collection(item)" :title="item.isHeart ? '已收藏':'收藏'"></i>
                  </div>
                </li>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
      <!--心理服务结束-->
      <!--公共服务开始-->
      <div class="serviceBox">
        <div class="middle_title more_ser">
          <P>公共服务</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul>
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in qtfwData" :key="index">
                <li @click="jumpConnection('统一门户管理系统',item)">
                  <div class="serviceItem itemColor1">
                    <i :class="item.icon" class="iconfont tb"></i>
                    <div>
                      <b>{{lenTitle(item.title)}}</b>
                      <b style="font-size: 12px">{{lenTitle(item.dep)}}</b>
                    </div>
                    <span><i class="iconfont icon-dian"></i></span>
                    <i class="iconfont icon-jiaobiaogengduo-copy-copy"></i>
                    <i class="iconfont icon-zan" :class="item.isHeart ? 'icon-ArtboardCopy245' : 'icon-ArtboardCopy234'" @click.stop="collection(item,$event)" :title="item.isHeart ? '已收藏':'收藏'"></i>
                  </div>
                </li>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
      <!--公共服务结束-->

      <!--常用应用开始-->
      <div class="serviceBox">
        <div class="middle_title more_ser">
          <P>常用应用</P>
          <span><i class="iconfont icon-gengduo"></i></span>
        </div>
        <div class="studentBoxCon">
          <ul class="clearBox">
            <el-row :gutter="2">
              <el-col :xl="4" :lg="6" :md="6" v-for="(item,index) in appData" :key="index">
                <li>
                  <div class="serviceItem serviceAppItem itemColor2" @click="serviceClick(item)">
                    <i :class="item.src" class="iconfont tb"></i>
                    <!--<img :src="item.src">-->
                    <div>
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
      </div>
      <!--常用应用结束-->

    </div>
    <el-footer class="copyright">{{footerTitle}}</el-footer>
    <!--<trappedApplication :toDialog="toDialog" @clearForm="clearForm" @toFormClick="toFormClick" ></trappedApplication>-->
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { getStore, removeStore, setStore } from '@/utils/store'
import { setTheme } from '@/utils/util'
import store from '@/store'

export default {
  data () {
    return {
      toDialog: false,//临时困补分类弹窗
      lfbzData: [],//路费补助data
      knsData: [],//困难生data
      news_list: [],
      option: {   //雷达图
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'center',
          data: ['罗纳尔多', '舍普琴科']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        calculable: true,
        polar: [{
          indicator: [
            { text: '表达', max: 100 },
            { text: '创业', max: 100 },
            { text: '创新', max: 100 },
            { text: '领导', max: 100 },
            { text: '思辨', max: 100 },
            { text: '执行', max: 100 }
          ],
          radius: 65
        }],
        series: [{
          name: '完全实况球员数据',
          type: 'radar',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: [{
            value: [60, 42, 88, 94, 55, 86],

          }]
        }]
      },
      myList: {  //个人信息简介
        "names": "张XX", //姓名
        "sex": "1",//男
        "tel": "183XXXXXXXX", //电话
        "bj": "自动化一班",  //班级
        "xy": "电力系统及自动化",//学院
        "zy": "信息科学与工程学院",  //专业
        'fdyxm': "曲婷",//辅导员姓名
        'fdydh': "135xxxxxxxx",//辅导员电话
      },
      fourBoxData: [
        {
          "txt": "本月消费",
          "bgColor": "#7ed321",
          "count": "1000.00"
        }, {
          "txt": "本月上网",
          "bgColor": "#f9b434",
          "count": "50:21"
        }, {
          "txt": "已借图书",
          "bgColor": "#d76c6c",
          "count": "15"
        }, {
          "txt": "预约图书",
          "bgColor": "#4a90e2",
          "count": "10"
        }],
      dwIndex: 0,
      txImg: "http://cloud-img.rd/ftp_cloud/tyrz/pic/c820ea143a354aaf8899a134ecdcb379_20181225085124.jpg",
      news_title: '',//新闻标题
      news_content: '',//新闻详情
      show_content: false,//是否显示详情
      currentPage: 1,//默认的页码
      fblx: '',//发布类型
      curId: 1,//第几个tab被选中
      total: 0,//计算选中tab的total
      total0: 0,//共有多少条数据
      total1: 0,//公告
      total2: 0,//公示
      total3: 0,//通知
      cardInfo: {
        wait: 5,
        check: 2,
        finish: 3
      },
      tjfwData: [
        {
          icon: "icon-Artboard18",
          title: "困难生认证",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/accreditationOfDifficultStudents",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy268",
          title: "在校证明开具",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/studentWithCertificatesAcademy",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy205",
          title: "学生证补办",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/supplementaryStudentCertificate",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy208",
          title: "荣誉证书补办",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/certificateOfHonorReapplyAssist",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy166",
          title: "假期离校登计",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/holidayLeaveRegistration",
          isHeart: false
        }],//推荐服务data
      xsglData: [
        {
          icon: "icon-ArtboardCopy260",
          title: "奖学金申请",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/scholarshipApplication",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy206",
          title: "命名奖学金申请",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/scholarshipApplication",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy256",
          title: "荣誉称号申请",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/honoraryTitleApplication",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy166",
          title: "假期离校登计",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/holidayLeaveRegistration",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy226",
          title: "请假申请",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/leaveService",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy268",
          title: "在校证明开具",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/studentWithCertificatesAcademy",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy205",
          title: "学生证补办",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/supplementaryStudentCertificate",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy208",
          title: "荣誉证书补办",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/certificateOfHonorReapplyAssist",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy279",
          title: "假期疾病申请",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/certificateOfHonorReapplyAssist",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy280",
          title: "市医保服务",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/certificateOfHonorReapplyAssist",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy282",
          title: "商业保险服务",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/certificateOfHonorReapplyAssist",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy278",
          title: "补充医疗保险",
          dep: "学生管理科",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/certificateOfHonorReapplyAssist",
          isHeart: false
        },
      ],//学生管理data
      zzfwData: [
        {
          icon: "icon-ArtboardCopy198",
          title: "国家助学金申请",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/grant",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy260",
          title: "国家励志奖学金申请",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/socialGrant",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy219",
          title: "临时补助申请",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/trappedApplication",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy193",
          title: "路费补助申请",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/allowanceApplication",
          isHeart: false
        }, {
          icon: "icon-Artboard18",
          title: "困难生认证",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/accreditationOfDifficultStudents",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy156",
          title: "基层就业补偿",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/jcjyapply",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy155",
          title: "应征入伍补偿代偿",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/armyServiceNote",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy244",
          title: "退役复学补偿代偿",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/retirementServiceNote",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy216",
          title: "生源地贷款信息填报",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/studentServiceNote",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy216",
          title: "校园地贷款信息填报",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/schoolServiceNote",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy253",
          title: "勤工助学岗位申请",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/dailyApply",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy219",
          title: "勤工助学岗位查询",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/dailyFind",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy224",
          title: "勤工助学考勤查询",
          dep: "资助中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-zz/#/',
          appliid: 'YY_d7fc59b7fa524e4f985458e0678f1b18',
          target: "/student/dailyCheck",
          isHeart: false
        }
      ],
      xlzxData: [
        {
          icon: "icon-ArtboardCopy257",
          title: "活动参与",
          dep: "成长中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_b3eee8ed196244c19a7af1b125e99949',
          target: "/growUpCenter/activeList",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy257",
          title: "学生获奖信息",
          dep: "成长中心",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_b3eee8ed196244c19a7af1b125e99949',
          target: "/growUpCenter/prizeList",
          isHeart: false
        },
      ],//心理中心服务data
      qtfwData: [
        {
          icon: "icon-ArtboardCopy229",
          title: "成绩查询",
          dep: "教务处",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_b3eee8ed196244c19a7af1b125e99949',
          target: "/student/resultInquiry",
          isHeart: false
        },
        // {
        //   icon: "icon-ArtboardCopy129",
        //   title: "班级展示",
        //   dep: "教务处",
        //   href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
        //   appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
        //   target: "",
        //   isHeart: false
        // },
        {
          icon: "icon-ArtboardCopy224",
          title: "第二课堂成绩单查询",
          dep: "教务处",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/twice_report",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy222",
          title: "帮助中心",
          dep: "公共服务",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/helpCenter",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy144",
          title: "失物招领",
          dep: "公共服务",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/lostList",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy248",
          title: "下载中心",
          dep: "公共服务",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/student/downloadCenter",
          isHeart: false
        }, {
          icon: "icon-ArtboardCopy248",
          title: "服务列表",
          dep: "公共服务",
          href: 'http://stuinfo.neu.edu.cn/cloud-fw/#/',
          appliid: 'YY_28ab950076994f0aa8e39260e1dbcd9c',
          target: "/service/serviceList",
          isHeart: false
        }
      ],//公共服务data
      appData: [],
      xgData: [
        //   {
        //   icon: "icon-ArtboardCopy260",
        //   title: "国家奖学金申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/applyNationalScholarship",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "优秀学生申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/excellentStudents",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "优秀学生标兵申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/pacesetterStudents",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "优秀学生干部申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/studentsCadres",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "优秀学生干部标兵申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/pacesetterStudentsCadres",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "学业特长优秀个人申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/academicSkills",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "悦居寝室申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/goodDormitory",
        //   isHeart: false
        // },
        // {
        //   icon: "icon-ArtboardCopy22",
        //   title: "先进班集体申请",
        //   dep: "学工管理",
        //   href: 'http://www.baidu.com',
        //   appliid: 'YY_4f507eef94ee440f83625126c463ce96',
        //   target: "/student/advancedClass",
        //   isHeart: false
        // },
        {
          icon: "icon-ArtboardCopy22",
          title: "学生请假服务",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/leaveService",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "奖项录入",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/prizeInput",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "获奖情况录入",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/prizeSituation",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "学生请假信息查询",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/studentLeave",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "在校证明开具",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/schoolProve",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "学生证补办",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/studentCard",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "荣誉证书补办",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/honor",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "假期离校登记",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/vacationLeave",
          isHeart: false
        },
        {
          icon: "icon-ArtboardCopy22",
          title: "假期返校统计",
          dep: "学工管理",
          href: 'http://www.baidu.com',
          appliid: 'YY_4f507eef94ee440f83625126c463ce96',
          target: "/students/vacationReturn",
          isHeart: false
        },

      ],
      yhsf: "",//用户身份类型
    }
  },

  computed: {
    ...mapGetters([
      'tagList',
      'tag',
      'theme',
      'footerTitle',
      'userInfo'
    ])
  },
  created () {

    //进入页面取一次新闻
    this.get_news()
    this.findQyLfbz()
    this.findFwByFwbs()
    console.log(this.userInfo, '湿哒哒大待多多多多111111111多')
  },
  mounted () {


    this.drawLine()
    //进入页面取一次新闻
    this.get_news()
    this.yhsf = store.state.user.userInfo.identity
    this.findAllYyList(this.yhsf)
  },
  methods: {
    ...mapActions([
      'findGrYys',
      'pullMhxx',
      'grMhxxList',
      'grWdxx',
      'findYys',
      'findByCondition',
      'findMhxxByBm',
      'ydxx'

    ]),

    //获取应用列表
    async findAllYyList (yhsf) {
      try {
        let datas = await this.findGrYys(yhsf);
        let data = [];
        if (datas.statusCode == 200) {
          for (let i = 0; i < datas.data.length; i++) {
            let urlStr = datas.data[i].yytb;
            let terms = {
              bm: datas.data[i].bm,
              title: datas.data[i].yymc,
              url: datas.data[i].yydz,
              src: urlStr,
              yyzt: datas.data[i].sfjy
            };
            data.push(terms);
          }
          this.appData = data;
        }

      } catch (e) {
        console.log(e);
      }
    },




    // 系统跳转
    serviceClick (item) {
      console.log('item', item)
      if (item.yyzt == '1') {
        this.$message.warning("该系统已禁用");
        return
      }
      this.$message.success("正在进入 " + item.title + " 应用")
      if (location.href.indexOf('localhost') == -1) {
        window.open(item.url + '?appliid=' + item.bm + '&title=' + item.title)
      } else {
        window.open(`http://localhost:8801/#/?appliid=${item.bm}&title=${item.title}`)
      }
    },
    clearForm () {
      this.toDialog = false
    },
    toFormClick (bm, xnd, xqmc) {
      this.toDialog = false
      if (location.href.indexOf('localhost') != -1) {
        Cookies.set('LSKB_SET', bm, { expires: 7 })
        Cookies.set('LSKB_xnd', xnd, { expires: 7 })
        Cookies.set('LSKB_xqmc', xqmc, { expires: 7 })
        location.href = 'http://localhost:8801/#/?target=' + '/student/trappedApplication' + '&appliid=' + 'YY_d7fc59b7fa524e4f985458e0678f1b18' + '&title=' + '临时补助申请'
      } else {
        let domain = location.href.split('/')[2]
        domain = '.' + domain.split('.')[1] + '.' + domain.split('.')[2]
        Cookies.set('LSKB_SET', bm, { expires: 7, domain: domain })
        Cookies.set('LSKB_xnd', xnd, { expires: 7, domain: domain })
        Cookies.set('LSKB_xqmc', xqmc, { expires: 7, domain: domain })
        location.href = 'http://stuinfo.neu.edu.cn/cloud-zz/#/' + '?target=' + '/student/trappedApplication' + '&appliid=' + 'YY_d7fc59b7fa524e4f985458e0678f1b18' + '&title=' + '临时补助申请'
      }
    },

    //判断路费补助
    async findQyLfbz () {
      try {
        let result = await this.Api.findQyLfbz({})
        if (result.statusCode == 200) {
          this.lfbzData = result.data
        }
      } catch (e) {
        console.log(e)
      }
    },

    //判断困难生
    async findFwByFwbs () {
      try {
        let result = await this.Api.findFwByFwbs('KNSRD')
        if (result.statusCode == 200) {
          this.knsData = result.data
        }
      } catch (e) {
        console.log(e)
      }
    },


    // 应用跳转
    jumpConnection (title, item) {
      if (item.target == '') {
        this.$message.error('该服务暂未开放!')
        return
      }
      // if( item.title == '临时补助申请'){
      //   this.toDialog = true
      //   return
      // }
      // if( item.title == '路费补助申请' && this.lfbzData == null){
      //   this.$message.warning("未进行路费补助设置")
      //   return
      // }
      // if( item.title == '困难生认证' && this.knsData == null){
      //   this.$message.warning("未进行困难生设置")
      //   return
      // }
      if (location.href.indexOf('localhost') != -1) {
        location.href = 'http://localhost:8801/#/?target=' + item.target + '&appliid=' + item.appliid + '&title=' + title
      } else {
        location.href = item.href + '?target=' + item.target + '&appliid=' + item.appliid + '&title=' + title
      }
    },
    lenTitle (str) {
      return (str.length > 8) ? str.slice(0, 8) + "..." : str;
    },
    // 绘制图标
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option);
    },
    //顶部tab
    choose_tab (val) {
      this.fblx = val
      this.curId = val
      this.get_news()
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
      this.pullMhxx().then(res => {
        if (res.statusCode == 200) {
          this.get_total()
          //获取全部新闻开始
          this.grMhxxList({
            pageSize: 5,
            pageNum: this.currentPage,
            fblx: this.fblx,
            ydzt: '',
          }).then(res => {
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

          }).catch(error => {
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
            ydzt: '',
          }).then(res => {
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
          }).catch(error => {
            this.$message.error('数据获取失败')
          })
          // 获取全部新闻结束
        }
      }).catch(error => {
        this.$message.error('数据获取失败')

      })
    },
    get_total () {
      //取每个分类的未读消息
      this.grWdxx().then(res => {
        this.total1 = Number(res.data[1] || 0)
        this.total2 = Number(res.data[2] || 0)
        this.total3 = Number(res.data[3] || 0)
        this.total0 = this.total1 + this.total2 + this.total3
      })

    },


    //收藏
    collection (item, event) {
      event.preventDefault = true
      if (item.isHeart == false) {
        item.isHeart = true
      } else {
        item.isHeart = false
      }
      // event.preventDefault();
    }


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin centerBox {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

@mixin boxStyle1 {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  z-index: 10;
  margin-top: 20px;
}

@mixin boxStyle2 {
  position: relative;
  width: 100%;
}
.middle_title {
  overflow: hidden;
}

.protalStudent {
  width: 100%;
  min-height: 100%;
  background: #f7f7f7;
  overflow: hidden;
}

.studentInforHeader {
  width: 100%;
  height: 300px;
  position: relative;
}

.studentInforHeaderWrap {
  width: 100%;
  height: 100%;
  background: #33425a;
}

.studentInforHeaderBox1 {
  width: -moz-calc(100% - 160px);
  width: -webkit-calc(100% - 160px);
  width: calc(100% - 160px);
  margin: 0 auto;
  height: 260px;

  .txBox {
    float: left;
    margin-left: 40px;
    margin-top: 8px;
    min-width: 440px;
    height: 230px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;

    img {
      width: 108px;
      height: 150px;
      border: 4px solid #485f85;
      float: left;
    }

    div:nth-child(2) {
      float: left;
      color: white;
      margin-left: 10px;

      p {
        margin-top: 5px;
        height: 24px;
        line-height: 24px;

        i {
          float: left;
        }

        span {
          float: left;
          margin-left: 10px;
        }
      }

      .firstP {
        font-size: 18px;

        span {
          margin-left: 0;
          margin-right: 6px;
        }
      }

      div:nth-child(3) {
        margin-top: 32px;
      }

      div:nth-child(3) p {
        float: left;
        padding-right: 10px;
      }

      .txIcon {
        font-size: 20px;
      }
    }
  }

  .fourBox {
    margin-top: 8px;
    float: left;
    margin-left: 4%;
    width: 32%;

    > div {
      margin-right: 16px;
      margin-top: 16px;
      height: 100px;
    }

    > div:nth-child(2),
    > div:nth-child(4) {
      margin-right: 0;
    }

    .fourBoxCard {
      height: 100px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      div {
        height: 50px;
        display: flex;
        align-items: center;
        width: 80%;
      }

      span {
        float: left;
        color: white;
      }

      span:nth-child(1) {
        width: 30px;
        padding-right: 16px;
        border-right: 1px solid white;
        margin-right: 16px;
        width: 48px;
        @include centerBox;
      }

      span:nth-child(2) {
        flex: 1;
        text-align: center;
      }
    }
  }
  .countBox {
    margin-top: 10px;
    float: left;
    height: 230px;
    width: 22%;
  }
}

.studentNews {
  width: -moz-calc(100% - 80px);
  width: -webkit-calc(100% - 80px);
  width: calc(100% - 80px);
  min-height: 300px;
  margin: 0 auto;
  position: relative;
  top: -30px;
  left: 0;
}

.workCount {
  width: 100%;
  height: 120px;
  margin-bottom: 30px;
}

.workCountMain {
  margin: 0 auto 0;
  width: 1120px;
}

.workCountMain > div {
  width: 360px;
  height: 120px;
  float: left;
  border-radius: 3px;
  margin-left: 20px;
}

.workCountMain > div:nth-child(1) {
  background: #f9b433;
  margin-left: 0;
}

.workCountMain > div:nth-child(2) {
  background: rgb(40, 198, 192);
}

.workCountMain > div:nth-child(3) {
  background: #09c0ec;
}

.workCountMain > div > div:nth-child(1) {
  display: block;
  height: 34px;
  width: 100%;
  line-height: 34px;
  color: white;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.1);
  text-indent: 20px;
}

.workCountContent {
  width: 100%;
}

.workCountContent > div:nth-child(1) {
  float: left;
  width: 265px;
  height: 86px;
  text-align: center;
  color: white;
  line-height: 86px;
}

.workCountContent > div:nth-child(1) > b {
  font-size: 40px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
  margin-right: 10px;
}

.workCountContent > img {
  float: right;
  margin-right: 20px;
  margin-bottom: 5px;
  width: 75px;
  height: 65px;
  margin-top: 10px;
}

.gzx_row_one {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
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
  height: 100%;
  background: #f7f7f7;
}

.myServiceNotify {
  flex: 1;
  height: 420px;

  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 9px;
  margin-bottom: 10px;
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

.grid-content > div > div {
  width: 100%;
  height: 100px;
}

.serviceList {
  width: -moz-calc(100% - 80px);
  width: -webkit-calc(100% - 80px);
  width: calc(100% - 80px);
  margin: 0 auto;
}

.serviceBox {
  @include boxStyle1;
}

.tjfwWrap {
  margin-top: 0;
}

.more_ser > p {
  float: left;
}

.more_ser > span {
  float: right;
  height: 46px;
  line-height: 46px;
  margin-right: 20px;
}

.more_ser > span > i {
  float: right;
  font-size: 28px;
  color: #6f828a;
}

.studentBoxCon {
  width: 100%;
  height: -moz-calc(100% - 48px);
  height: -webkit-calc(100% - 48px);
  height: calc(100% - 48px);
}

.studentBoxCon ul {
  padding: 0 20px 20px 20px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.studentBoxCon ul li {
  float: left;
  margin-top: 20px;
  width: 100%;
}

.studentBoxCon ul li > img {
  margin: 0 auto;
  display: block;
}

.studentBoxCon ul li > img:hover {
  cursor: pointer;
}

.serviceItem {
  border-radius: 4px;
  height: 68px;
  width: 256px;
  margin-left: 10px;
  cursor: pointer;
  position: relative;
  padding-top: 30px;
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
  margin-top: 67px;
  margin-left: 65px;
  font-size: 38px;
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

.serviceItem i:nth-child(5) {
  font-size: 20px;
  position: absolute;
  right: 18px;
  bottom: 18px;
}

.serviceItem div:nth-child(2) {
  margin-top: -38px;
  margin-left: 118px;
  width: 136px;
}

.serviceItem div:nth-child(2) b {
  display: block;
}

.serviceAppItem {
  padding-top: 0;
  height: 100px;
}

.serviceAppItem > img {
  margin-top: 25px;
  margin-left: 60px;
  width: 50px;
  height: 50px;
  float: left;
}

.serviceAppItem > div:nth-child(2) {
  width: 120px;
  height: 100%;
  display: flex;
  align-items: center;
  float: right;
  margin-right: 10px;
  margin-left: 0;
  margin-top: 0;
}

.appsWrap {
  width: 100%;
  margin-top: 20px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.appsMain {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  max-height: 400px;
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
}

.studentBoxCon_apps {
  width: 100%;
  height: -moz-calc(100% - 48px);
  height: -webkit-calc(100% - 48px);
  height: calc(100% - 48px);
  overflow-y: auto;
}

.studentBoxCon_apps ul {
  padding: 0 20px 20px 20px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.studentBoxCon_apps ul li {
  float: left;
  margin-top: 20px;
  width: 100%;
}

.studentBoxCon_apps ul li > img {
  margin: 0 auto;
  display: block;
}

.studentBoxCon_apps ul li > img:hover {
  cursor: pointer;
}

.syllabus {
  width: 540px;
  height: 420px;
  background: white;
  border-radius: 10px;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  margin-left: 12px;
  position: relative;
}

.syllabusWrap {
  width: 100%;
  height: -moz-calc(100% - 48px);
  height: -webkit-calc(100% - 48px);
  height: calc(100% - 48px);
}

.syllabusWrap_ul > li {
  float: left;
  width: 65px;
  text-align: center;
}

.syllabusWrap > img {
  float: left;
  margin-top: 18px;
  margin-left: 32px;
  width: 480px;
}

.syllabus > div:nth-last-child(1) {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  color: white;
  font-weight: bold;
  opacity: 0;
  /*display: none;*/
}

.syllabus:hover div:nth-last-child(1) {
  opacity: 1;
}

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
</style>
<style scoped>
/deep/ .el-table {
  margin: 0 auto;
}
</style>
