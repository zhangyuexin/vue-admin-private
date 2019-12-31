<template>
  <div class="protalStudent">
    <el-backtop target=".main" :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #fff;
        }"
      >
        ∧
      </div>
    </el-backtop>
    <div class="topImg">
      <img src="@/assets/images/mhtop.png" alt />
      <div>
        <p class="topName" style="font-size: 40px">东北大学</p>
        <p class="topSName" style="font-size:25px">云成长一体化大数据平台</p>
      </div>
    </div>

    <div class="topNav">
      <div class="topNavContent">
        <el-carousel
          height="28px"
          arrow="never"
          indicator-position="outside"
          trigger="click"
          :autoplay="false"
        >
          <el-carousel-item v-for="(item, index) in navInfo" :key="index">
            <ul>
              <li v-for="(nitem, nindex) in item" :key="nindex">
                {{ nitem.name }} :
                <span class="numberSpan">{{nitem.number}}</span>
                {{ nitem.dw }}
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="topLeft">
        <p class="title">审核办理</p>
        <ul>
          <li>
            <!-- <img src="@/assets/images/home/1.png" alt=""> -->
            <p>{{ shbl.dsh }}</p>
            <p>待审核</p>
          </li>
          <li>
            <!-- <img src="@/assets/images/home/2.png" alt=""> -->
            <p>{{ shbl.shz }}</p>
            <p>审核中</p>
          </li>
          <li>
            <!-- <img src="@/assets/images/home/3.png" alt=""> -->
            <p>{{ shbl.ywc }}</p>
            <p>已完成</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="bgbox">
      <div class="content">
        <el-row :gutter="40">
          <el-col :span="12">
            <div class="timetable">
              <div class="top">
                <div class="left">
                  <div class="dropDown button" @click="timetableShow = !timetableShow">
                    {{ timetableTop }}
                    <i class="arrowup" v-show="timetableShow"></i>
                    <i class="arrowdown" v-show="!timetableShow"></i>
                    <div class="dropDownContent" v-show="timetableShow">
                      <div
                        class="wbutton"
                        @click="wbuttonClick(1, '课表')"
                        :class="{active: topActive == 1}"
                      >课表</div>
                      <div
                        class="wbutton"
                        @click="wbuttonClick(2, '活动')"
                        :class="{active: topActive == 2}"
                      >活动</div>
                    </div>
                  </div>
                  <div class="button">活动</div>
                </div>
                <div class="middle">
                  <el-dropdown @command="handleCommand" style="color:#fff">
                    <span class="el-dropdown-link">
                      第12周
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        command="a"
                        v-for="(item,index) in weeks"
                        :key="index"
                      >{{ item }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="right">
                  <p>晴 6-17</p>
                  <p>西南风1-2级</p>
                </div>
              </div>
              <div class="sub">
                <el-row :gutter="15" style="height:100%">
                  <div style="width: calc(100% - 310px);float:left" class="left">
                    <ul>
                      <li v-for="(item, index) in classList" :key="index">
                        <div class="left">
                          <p>{{ 2*index + 1 }}</p>
                          <p>{{ 2*index + 2 }}</p>
                        </div>
                        <div class="right">
                          <p>
                            <el-tooltip
                              class="item"
                              effect="dark"
                              :content="item.name"
                              placement="top-start"
                            >
                              <span style="width:60%">{{ item.name }}</span>
                            </el-tooltip>
                            <el-tooltip
                              class="item"
                              effect="dark"
                              :content="item.time"
                              placement="top-end"
                            >
                              <span style="float:right;width:39%;text-align:right">{{ item.time }}</span>
                            </el-tooltip>
                          </p>
                          <p>{{ item.place }}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div style="width:300px;float:right" class="right">
                    <div class="calendar">
                      <!-- <el-calendar v-model="calendar">
                      </el-calendar> -->
                      <v-date-picker v-model="date" data="YYYY-MM-DD" :available-dates='{ start: new Date(), end: null }' is-inline :attributes="attributes" @dayclick="dayclick" is-expanded/>
                    </div>
                    <div class="todo"></div>
                  </div>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="messageList">
              <div class="top">
                <ul>
                  <li
                    v-for="(item, index) in messageList.nav"
                    :key="index"
                    :class="{active: messageList.active == index}"
                  >{{ item.name }}（{{ item.number }}）</li>
                </ul>
              </div>
              <div class="list">
                <ul>
                  <li v-for="(item, index) in messageList.list" :key="index">
                    <p class="left">{{ item.title }}</p>
                    <p class="right">{{ item.time }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="wbgbox">
      <div class="content">
        <div class="commonTitle">
          <img src="@/assets/images/home/jns.png" alt />
          <p>校园吉尼斯</p>
        </div>
        <el-row :gutter="15" class="jnsList">
          <el-col v-for="(item, index) in jnsList" :key="index" :span="6">
            <p class="left">{{ item.name }}：</p>
            <p class="right">{{ item.content }}</p>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="bgbox2">
      <div class="content">
        <el-row :gutter="30">
          <el-col :span="8" class="serviceList">
            <div class="commonTitle">
              <img src="@/assets/images/home/fw.png" alt />
              <p>服务</p>
            </div>
            <el-carousel
              height="400px"
              arrow="never"
              indicator-position="outside"
              trigger="click"
              :autoplay="false"
              style="margin-top: 15px"
            >
              <el-carousel-item v-for="(item, index) in serviceList" :key="index">
                <ul>
                  <li v-for="(nitem, nindex) in 9" :key="nindex">
                    <p>{{ item[nindex] ? item[nindex].icon : '' }}</p>
                    <p>{{ item[nindex] ? item[nindex].name : '' }}</p>
                    <div v-if="nindex == item.length">
                      <p>自定义图标</p>
                      <p>自定义测试</p>
                    </div>
                  </li>
                </ul>
              </el-carousel-item>
              <el-carousel-item v-if="serviceList[serviceList.length - 1].length == 9">
                <ul>
                  <li v-for="(oitem, oindex) in 9" :key="oindex">
                    <div v-if="oindex == 0">
                      <p>自定义图标</p>
                      <p>自定义测试</p>
                    </div>
                  </li>
                </ul>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="8" class="act">
            <div class="commonTitle">
              <img src="@/assets/images/home/tjhd.png" alt />
              <p>推荐活动</p>
            </div>
            <div class="actTop" :style="{backgroundImage: `url(${ actTop.img })`}">
              <div class="type">{{ actTop.type }}</div>
              <p class="title">{{ actTop.title }}</p>
              <p class="time">{{ actTop.time }}</p>
              <div class="infor">
                <p>{{ actTop.content }}</p>
                <p>
                  <span>【详细】</span>
                </p>
              </div>
            </div>
            <div class="actList">
              <div v-for="(item, index) in actList" :key="index" class="infor">
                <div class="title">
                  <p>{{ item.title }}</p>
                  <p>{{ item.time }}</p>
                </div>
                <div class="list">
                  <span class="type">{{ item.type }}</span>
                  <p class="cont">{{ item.infor }}</p>
                  <p class="to">【详细】</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="classShow">
            <div class="commonTitle">
              <img src="@/assets/images/home/bjzs.png" alt />
              <p>班级展示</p>
            </div>
            <div class="class">
              <div class="top">
                <div class="topImg">
                  <div></div>
                </div>
                <div class="topContent">
                  <p>{{ classShow.name }}</p>
                  <p>
                    <span>辅导员: {{ classShow.fdy }}</span>
                    <span>班长: {{ classShow.bz }}</span>
                    <span>学委: {{ classShow.xw }}</span>
                  </p>
                  <p>
                    <span>班导师: {{ classShow.bds }}</span>
                    <span>副班长: {{ classShow.fbz }}</span>
                    <span>团支书: {{ classShow.tzs }}</span>
                  </p>
                </div>
                <p class="good">{{ classShow.gy }}</p>
              </div>
              <div class="middle">
                <div class="left" :style="{backgroundImage: `url(${ classShow.img })`}">
                  <div>
                    <p>{{ classShow.middle.title }}</p>
                    <p>{{ classShow.middle.time }}</p>
                  </div>
                </div>
                <div class="right">
                  <div v-for="(item, index) in classShow.list" :key="index" class="list">
                    <div class="up">
                      <p>{{ item.title }}</p>
                      <p>{{ item.time }}</p>
                    </div>
                    <div class="down">
                      <p>{{ item.infor }}</p>
                      <p>【详情】</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="infor">
                  <p class="left">辅导员心语</p>
                  <p class="right">{{ classShow.fdyxy }}</p>
                </div>
                <div class="infor">
                  <p class="left">班导师心语</p>
                  <p class="right">{{ classShow.bdsxy }}</p>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="wbgbox2">
      <div class="content">
        <el-row :gutter="20" class="dataPic">
          <el-col :span="16">
            <div class="commonTitle">
              <img src="@/assets/images/home/czcp.png" alt />
              <p>成长测评</p>
            </div>
            <div id="czcp" style="width: 100%"></div>
          </el-col>
          <el-col :span="8">
            <div class="commonTitle">
              <img src="@/assets/images/home/szmx.png" alt />
              <p>我的素质模型</p>
            </div>
            <div id="szmx" style="width: 100%"></div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="commonFuncTitle">
      <div class="line"></div>
      <div class="italicLine"></div>
      <div class="textLeft">common functions</div>
      <div class="textRight">常用功能</div>
    </div>

    <div class="wbgbox3">
      <div class="content">
        <el-row :gutter="30">
          <el-col :span="8" v-show="custom.xdbj">
            <div class="commonTitle">
              <img src="@/assets/images/home/xdbj.png" alt />
              <p>兄弟班级</p>
            </div>
            <div class="app">
              <input type="text" class="searchInput" placeholder="输入关键字..." v-model="xdbj.search" />
              <div class="xdbjpics">
                <div
                  v-for="(item, index) in 4"
                  :key="index"
                  class="pic"
                  :style="{ backgroundImage: `url(${xdbj.pic[index].img})` }"
                >
                  <div class="back">
                    <p class="title">{{ xdbj.pic[index].title }}</p>
                    <div class="infor">
                      <p>{{ xdbj.pic[index].infor }}</p>
                      <p>【详情】</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="xdbjlist">
                <div v-for="(item, index) in 3" :key="index">
                  <p>{{ xdbj.list[index].infor }}</p>
                  <p>{{ xdbj.list[index].time }}</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.xzzx">
            <div class="commonTitle">
              <img src="@/assets/images/home/xzzx.png" alt />
              <p>下载中心</p>
            </div>
            <div class="app">
              <div class="downloadList">
                <div v-for="(item, index) in 20" :key="index">
                  <img src="@/assets/images/home/download.png" alt />
                  <p>困难生认证申请表</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.cjcx">
            <div class="commonTitle">
              <img src="@/assets/images/home/cjcx.png" alt />
              <p>成绩查询</p>
            </div>
            <div class="app">
              <div class="cjcx">
                <div class="autoNav">
                  <ul>
                    <li
                      v-for="(item, index) in cjcx.nav"
                      :key="index"
                      :class="{active: cjcx.active == index}"
                    >{{ item }}</li>
                  </ul>
                </div>
                <input type="text" class="searchInput" placeholder="输入关键字..." v-model="cjcx.search" />
                <div class="xnd">
                  <img src="@/assets/images/home/rl.png" alt />
                  <p>2018-2019学年度</p>
                  <div>
                    <span><</span>
                    <span>></span>
                  </div>
                </div>
                <div class="list">
                  <div class="top">
                    <p>
                      已挂学分：
                      <span style="color:red">{{ cjcx.ygxf }}分</span>
                    </p>
                    <p>英语四级：{{ cjcx.yysj }}</p>
                    <p>英语四级：{{ cjcx.yylj }}</p>
                  </div>
                  <div v-for="(item, index) in 5" :key="index" class="infor">
                    <p>{{ cjcx.list[index].name }}</p>
                    <p>
                      <span>{{ cjcx.list[index].xs }}</span>
                      <span>{{ cjcx.list[index].xf }}</span>
                    </p>
                    <p>成绩：{{ cjcx.list[index].cj }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.yxgr">
            <div class="commonTitle">
              <img src="@/assets/images/home/yxgr.png" alt />
              <p>优秀个人</p>
            </div>
            <div class="app">
              <div class="yxgr">
                <div
                  v-for="(item, index) in 4"
                  :key="index"
                  class="pic"
                  :style="{ backgroundImage: `url(${yxgr[index].img})` }"
                >
                  <div class="back">
                    <div class="infor">
                      <p>{{ yxgr[index].class }}</p>
                      <p>{{ yxgr[index].name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.yxbjt">
            <div class="commonTitle">
              <img src="@/assets/images/home/yxbjt.png" alt />
              <p>优秀班集体</p>
            </div>
            <div class="app">
              <div class="yxbjt">
                <div class="top" :style="{backgroundImage: `url(${ yxbjt.top.img })`}">
                  <div>
                    <p>{{ yxbjt.top.class }}</p>
                    <p>{{ yxbjt.top.time }}</p>
                  </div>
                </div>
                <div class="commonList">
                  <div v-for="(item, index) in 6" :key="index">
                    <p class="name">{{ yxbjt.list[index].infor }}</p>
                    <p class="wtime">{{ yxbjt.list[index].time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.yxqs">
            <div class="commonTitle">
              <img src="@/assets/images/home/yxqs.png" alt />
              <p>优秀寝室</p>
            </div>
            <div class="app">
              <div class="yxqs">
                <div style="overflow: hidden">
                  <div class="top" :style="{backgroundImage: `url(${ yxqs.top[0].img })`}">
                    <div>
                      <p>{{ yxqs.top[0].name }}</p>
                      <p>{{ yxqs.top[0].time }}</p>
                    </div>
                  </div>
                  <div class="top" :style="{backgroundImage: `url(${ yxqs.top[1].img })`}">
                    <div>
                      <p>{{ yxqs.top[0].name }}</p>
                      <p>{{ yxqs.top[0].time }}</p>
                    </div>
                  </div>
                </div>

                <div class="commonList">
                  <div v-for="(item, index) in 6" :key="index">
                    <p class="name">{{ yxqs.list[index].name }}</p>
                    <p class="wtime">{{ yxqs.list[index].time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.yxfdy">
            <div class="commonTitle">
              <img src="@/assets/images/home/yxfdy.png" alt />
              <p>优秀辅导员</p>
            </div>
            <div class="app">
              <div class="yxfdy">
                <div style="height:21px"></div>
                <div class="top">
                  <img :src="yxfdy.top.img" alt />
                  <p>{{ yxfdy.top.name }}</p>
                  <p>{{ yxfdy.top.infor }}</p>
                  <p>【详情】</p>
                </div>
                <el-row class="pics" :gutter="15">
                  <el-col :span="6" v-for="(item, index) in 8" :key="index">
                    <img :src="yxfdy.pics[index].img" alt />
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.yxbds">
            <div class="commonTitle">
              <img src="@/assets/images/home/yxfdy.png" alt />
              <p>优秀班导师</p>
            </div>
            <div class="app">
              <div class="yxbds">
                <div class="top">
                  <img :src="yxbds.top.img" alt />
                  <div>
                    <p>{{ yxbds.top.name }}</p>
                    <p>{{ yxbds.top.infor }}</p>
                    <p>【详情】</p>
                  </div>
                </div>
                <el-row class="pics" :gutter="15">
                  <el-col :span="6" v-for="(item, index) in 4" :key="index">
                    <img :src="yxfdy.pics[index].img" alt />
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.qgzx">
            <div class="commonTitle">
              <img src="@/assets/images/home/qgzx.png" alt />
              <p>勤工助学</p>
            </div>
            <div class="app">
              <div class="qgzx">
                <div class="autoNav">
                  <ul>
                    <li
                      v-for="(item, index) in qgzx.nav"
                      :key="index"
                      :class="{active: qgzx.active == index}"
                    >{{ item }}</li>
                  </ul>
                </div>
                <div class="commonList">
                  <div v-for="(item, index) in 8" :key="index">
                    <p class="sname" :class="{ tj: qgzx.list[index].tj}">{{ qgzx.list[index].name }}</p>
                    <p class="type">{{ qgzx.list[index].lb }}</p>
                    <p class="time">{{ qgzx.list[index].time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.xjsj">
            <div class="commonTitle">
              <img src="@/assets/images/home/xjsj.png" alt />
              <p>先进事迹</p>
            </div>
            <div class="app">
              <div class="xjsj">
                <div class="autoNav">
                  <ul>
                    <li
                      v-for="(item, index) in xjsj.nav"
                      :key="index"
                      :class="{active: xjsj.active == index}"
                    >{{ item }}</li>
                  </ul>
                </div>
                <div class="commonList">
                  <div v-for="(item, index) in 8" :key="index">
                    <p class="pname">{{ xjsj.list[index].name }}</p>
                    <p class="time">{{ xjsj.list[index].time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.gzzd">
            <div class="commonTitle">
              <img src="@/assets/images/home/gzzd.png" alt />
              <p>规章制度</p>
            </div>
            <div class="app">
              <div class="gzzd">
                <div class="autoNav">
                  <ul>
                    <li
                      v-for="(item, index) in gzzd.nav"
                      :key="index"
                      :class="{active: gzzd.active == index}"
                    >{{ item }}</li>
                  </ul>
                </div>
                <div class="commonList">
                  <div v-for="(item, index) in 8" :key="index">
                    <p class="pname ding">{{ gzzd.list[index].name }}</p>
                    <p class="time">{{ gzzd.list[index].time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-show="custom.qzjy">
            <div class="commonTitle">
              <img src="@/assets/images/home/yxfdy.png" alt />
              <p>求职就业</p>
            </div>
            <div class="app">
              <div class="qzjy">
                <div class="autoNav">
                  <ul>
                    <li
                      v-for="(item, index) in qzjy.nav"
                      :key="index"
                      :class="{active: qzjy.active == index}"
                    >{{ item }}</li>
                  </ul>
                </div>
                <div class="commonList">
                  <div v-for="(item, index) in 8" :key="index">
                    <p class="pname hot">{{ qzjy.list[index].name }}</p>
                    <p class="time">{{ qzjy.list[index].time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16" v-show="custom.cjqk">
            <div class="commonTitle">
              <img src="@/assets/images/home/cjqk.png" alt />
              <p>成绩情况</p>
            </div>
            <div class="app">
              <div id="cjqk" style="height:415px">
              </div>
            </div>
          </el-col>
          <el-col :span="8" class="diy">
            <img src="@/assets/images/home/zdy.png" alt="" @click="customShow = true">
          </el-col>
        </el-row>
      </div>
      <div class="custom" v-show="customShow">
        <span @click="customShow = false" class="close">X</span>
        <el-carousel
          height="200px"
          arrow="hover"
          indicator-position="none"
          trigger="click"
          :autoplay="false"
        >
          <el-carousel-item>
            <el-row :gutter="15" style="padding-top:40px">
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard.jpg" alt="">
                <el-checkbox v-model="custom.xdbj">兄弟班级</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 40.jpg" alt="">
                <el-checkbox v-model="custom.xzzx">下载中心</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 41.jpg" alt="">
                <el-checkbox v-model="custom.cjcx">成绩查询</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 42.jpg" alt="">
                <el-checkbox v-model="custom.yxgr">优秀个人</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 43.jpg" alt="">
                <el-checkbox v-model="custom.yxbjt">优秀班级体</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 44.jpg" alt="">
                <el-checkbox v-model="custom.yxqs">优秀寝室</el-checkbox>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row :gutter="15" style="padding-top:40px">
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 45.jpg" alt="">
                <el-checkbox v-model="custom.yxfdy">优秀辅导员</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 46.jpg" alt="">
                <el-checkbox v-model="custom.yxbds">优秀班导师</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 47.jpg" alt="">
                <el-checkbox v-model="custom.qgzx">勤工助学</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 48.jpg" alt="">
                <el-checkbox v-model="custom.xjsj">先进事迹</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 49.jpg" alt="">
                <el-checkbox v-model="custom.gzzd">规章制度</el-checkbox>
              </el-col>
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 50.jpg" alt="">
                <el-checkbox v-model="custom.qzjy">求职就业</el-checkbox>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row :gutter="15" style="padding-top:40px">
              <el-col :span="4">
                <img src="@/assets/images/home/Artboard Copy 51.jpg" alt="">
                <el-checkbox v-model="custom.cjqk">成绩情况</el-checkbox>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="footer">
      <div class="content">
        <p style="padding-top:20px"><a href="javascript:;">东北大学章程</a> | <a href="javascript:;">校长直通车</a> | <a href="javascript:;">OA系统</a> | <a href="javascript:;">信息公开</a> | <a href="javascript:;">政务公开></a> | <a href="javascript:;">教务管理</a> | <a href="javascript:;">研究生管理</a> | <a href="javascript:;">科研管理</a> | <a href="javascript:;">人力资源管理</a> | <a href="javascript:;">财务管理</a> | <a href="javascript:;">资产管理</a> | <a href="javascript:;">教务处</a> | <a href="javascript:;">校园电视</a></p>
        <el-row style="margin-top:25px">
          <el-col :span="14">
            <p>校址：辽宁省沈阳市和平区文化路三巷11号 | 邮编：110819 | 辽ICP备11009868号-3</p>
            <p>Northeastern University 2015 | 设计制作：党委宣传部，技术运维：网络中心 | 旧版入口</p>
          </el-col>
          <el-col :span="10" style="text-align:right">
            <div class="wx">
              <img src="@/assets/images/home/wx.png" alt="">
              <p>东北大学官方微信</p>
              <p>neu-1923</p>
            </div>
            <div class="wb">
              <img src="@/assets/images/home/wb.png" alt="">
              <p>东北大学官方微博</p>
              <p>neu1923</p>
            </div>
          </el-col>
        </el-row>
        <p style="padding-top:20px;text-align:center;color: #9B9B9B">copyright©沈阳东深科技有限公司 版权所有</p>
      </div>
    </div>

  </div>
</template>

<script>
import tsimg from "../../assets/images/zixunshi/xl.png";
export default {
  data() {
    return {
      myChart: null,
      myChart1: null,
      myChart2: null,
      customShow: false,
      date: new Date(),
      custom: {
        xdbj: true,
        xzzx: true,
        cjcx: true,
        yxgr: true,
        yxbjt: true,
        yxqs: true,
        yxfdy: true,
        yxbds: true,
        qgzx: true,
        xjsj: true,
        gzzd: true,
        qzjy: true,
        cjqk: true
      },
      attributes: [
        {
          dot: 'red',
          dates: [1563552000000, new Date(2019, 6, 28)]
        }
      ],
      navInfo: [
        [
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          }
        ],
        [
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          },
          {
            name: "已修学分",
            number: 20,
            dw: "分"
          }
        ]
      ],
      shbl: {
        dsh: 15,
        shz: 20,
        ywc: 16
      },
      timetableTop: "课表",
      timetableShow: false,
      topActive: 1,
      weeks: ["第11周", "第11周", "第11周"],
      classList: [
        {
          time: "08:30-10:00",
          name: "大学英语",
          place: "汉卿学堂208室"
        },
        {
          time: "08:30-10:00",
          name: "大学英语",
          place: "汉卿学堂208室"
        },
        {
          time: "08:30-10:00",
          name: "大学英语",
          place: "汉卿学堂208室"
        },
        {
          time: "08:30-10:00",
          name: "大学英语",
          place: "汉卿学堂208室"
        },
        {
          time: "08:30-10:00",
          name: "大学英语",
          place: "汉卿学堂208室"
        }
      ],
      messageList: {
        active: 0,
        nav: [
          {
            name: "通知",
            number: 0
          },
          {
            name: "公示",
            number: 5
          },
          {
            name: "公告",
            number: 5
          },
          {
            name: "站内信",
            number: 5
          }
        ],
        list: [
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          },
          {
            title: "测试标题",
            time: "2018-08-08 12:30"
          }
        ]
      },
      jnsList: [
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        },
        {
          name: "借阅次数最多的图书",
          content: "十万个为什么"
        }
      ],
      serviceList: [
        [
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          },
          {
            icon: "测试图标",
            name: "测试名称"
          }
        ]
      ],
      actTop: {
        img: tsimg,
        type: "竞赛",
        title: "第十二届机器人设计大赛开始了，快来报名！",
        time: "2018.01.21",
        content: "航空动力装备振动及控制教育部重点实验室航空动力装备aaaaadddw"
      },
      actList: [
        {
          title: "东北大学第一届校园歌手大赛开赛",
          time: "2018.01.21",
          type: "竞赛",
          infor: "东北大学第一届校园歌手大赛开赛东北大学第一届"
        },
        {
          title: "东北大学第一届校园歌手大赛开赛",
          time: "2018.01.21",
          type: "竞赛",
          infor: "东北大学第一届校园歌手大赛开赛东北大学第一届"
        },
        {
          title: "东北大学第一届校园歌手大赛开赛",
          time: "2018.01.21",
          type: "竞赛",
          infor: "东北大学第一届校园歌手大赛开赛东北大学第一届"
        },
        {
          title: "东北大学第一届校园歌手大赛开赛",
          time: "2018.01.21",
          type: "竞赛",
          infor: "东北大学第一届校园歌手大赛开赛东北大学第一届"
        }
      ],
      classShow: {
        name: "自动化一般",
        fdy: "袁老师",
        bz: "张某听",
        xw: "张三",
        bds: "曲老师",
        fbz: "李四",
        tzs: "李四",
        gy: "博学慎思,明辨笃行！",
        img: tsimg,
        middle: {
          title: "东北大学“校友之家”授牌仪式正式开始。",
          time: "2019.04.03"
        },
        list: [
          {
            title: "班级主体班级主体",
            time: "2019.04.03",
            infor: "2018东深科技校园招聘会2018.10.01"
          },
          {
            title: "班级主体班级主体",
            time: "2019.04.03",
            infor: "2018东深科技校园招聘会2018.10.01"
          }
        ],
        fdyxy: "为中华崛起而奋斗！",
        bdsxy: "为中华崛起而奋斗！"
      },
      xdbj: {
        search: "",
        pic: [
          {
            img: tsimg,
            title: "2019级计算机专业1班",
            infor: "荣获班集体优秀一等奖，及光荣称号容易，沈阳市个人五"
          },
          {
            img: tsimg,
            title: "2019级计算机专业1班",
            infor: "荣获班集体优秀一等奖，及光荣称号容易，沈阳市个人五"
          },
          {
            img: tsimg,
            title: "2019级计算机专业1班",
            infor: "荣获班集体优秀一等奖，及光荣称号容易，沈阳市个人五"
          },
          {
            img: tsimg,
            title: "2019级计算机专业1班",
            infor: "荣获班集体优秀一等奖，及光荣称号容易，沈阳市个人五"
          }
        ],
        list: [
          {
            infor: "2018困难生资助名单公示",
            time: "2018-09-30 09:30"
          },
          {
            infor: "2018困难生资助名单公示",
            time: "2018-09-30 09:30"
          },
          {
            infor: "2018困难生资助名单公示",
            time: "2018-09-30 09:30"
          }
        ]
      },
      cjcx: {
        active: 0,
        nav: ["学习成绩", "综合评测成绩"],
        search: "",
        ygxf: 15,
        yysj: 350,
        yylj: 350,
        list: [
          {
            name: "大学高数A",
            xs: "必修：40学时",
            xf: "五级学分制：4.0学分",
            cj: "98"
          },
          {
            name: "大学高数A",
            xs: "必修：40学时",
            xf: "五级学分制：4.0学分",
            cj: "98"
          },
          {
            name: "大学高数A",
            xs: "必修：40学时",
            xf: "五级学分制：4.0学分",
            cj: "98"
          },
          {
            name: "大学高数A",
            xs: "必修：40学时",
            xf: "五级学分制：4.0学分",
            cj: "98"
          },
          {
            name: "大学高数A",
            xs: "必修：40学时",
            xf: "五级学分制：4.0学分",
            cj: "98"
          }
        ]
      },
      yxgr: [
        {
          img: tsimg,
          name: "王某听",
          class: "2019级计算机专业1班"
        },
        {
          img: tsimg,
          name: "王某听",
          class: "2019级计算机专业1班"
        },
        {
          img: tsimg,
          name: "王某听",
          class: "2019级计算机专业1班"
        },
        {
          img: tsimg,
          name: "王某听",
          class: "2019级计算机专业1班"
        }
      ],
      yxbjt: {
        top: {
          img: tsimg,
          class: "文法学院2019级01班",
          time: "2018.01.21"
        },
        list: [
          {
            infor: "计算机学院2018级02班",
            time: "2018.01.21"
          },
          {
            infor: "计算机学院2018级02班",
            time: "2018.01.21"
          },
          {
            infor: "计算机学院2018级02班",
            time: "2018.01.21"
          },
          {
            infor: "计算机学院2018级02班",
            time: "2018.01.21"
          },
          {
            infor: "计算机学院2018级02班",
            time: "2018.01.21"
          },
          {
            infor: "计算机学院2018级02班",
            time: "2018.01.21"
          }
        ]
      },
      yxqs: {
        top: [
          {
            name: "A区20#102室",
            time: "2019.04.03",
            img: tsimg
          },
          {
            name: "A区20#102室",
            time: "2019.04.03",
            img: tsimg
          }
        ],
        list: [
          {
            name: "A区20#102室",
            time: "2019.04.03"
          },
          {
            name: "A区20#102室",
            time: "2019.04.03"
          },
          {
            name: "A区20#102室",
            time: "2019.04.03"
          },
          {
            name: "A区20#102室",
            time: "2019.04.03"
          },
          {
            name: "A区20#102室",
            time: "2019.04.03"
          },
          {
            name: "A区20#102室",
            time: "2019.04.03"
          }
        ]
      },
      yxfdy: {
        top: {
          img: tsimg,
          name: "张三",
          infor:
            "张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍"
        },
        pics: [
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          }
        ]
      },
      yxbds: {
        top: {
          img: tsimg,
          name: "张三",
          infor:
            "张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍张三介绍"
        },
        pics: [
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          },
          {
            img: tsimg
          }
        ]
      },
      qgzx: {
        active: 0,
        nav: ["岗位展示", "考勤管理"],
        list: [
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30",
            tj: true
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30"
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30"
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30",
            tj: true
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30"
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30"
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30"
          },
          {
            name: "校学生管理办公室助理",
            lb: "困难生",
            time: "2018-09-30 09:30"
          }
        ]
      },
      xjsj: {
        active: 0,
        nav: ["学生", "班级", "寝室"],
        list: [
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          }
        ]
      },
      gzzd: {
        active: 0,
        nav: ["政策法规", "求职就业"],
        list: [
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          }
        ]
      },
      qzjy: {
        active: 0,
        nav: ["大型招聘", "网络招聘"],
        list: [
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          },
          {
            name: "校优秀三好学生张某天的事迹",
            time: "2018-09-30 09:30"
          }
        ]
      }
    };
  },
  mounted() {
    this.drawLine();
    this.drawRader()
    this.drawBar()
    setTimeout(() => {
      window.onresize = () => {
        this.myChart.resize()
        this.myChart1.resize()
        this.myChart2.resize()
      }
    }, 200);
    let that = this;
  },
  methods: {
    wbuttonClick(index, content) {
      this.timetableTop = content;
      this.topActive = index;
    },
    drawLine() {
      this.myChart = this.$echarts.init(document.getElementById("czcp"));
      this.myChart.setOption({
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["科目一", "科目二", "科目三", "科目四", "科目五"],
          top: 20
          // bottom: 0
        },
        toolbox: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["2017-2018", "2018-2019", "2019-2020", "2020-2021"],
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 100
          }
        ],
        series: [
          {
            name: "科目一",
            type: "line",
            data: [60, 70, 80, 90]
          },
          {
            name: "科目二",
            type: "line",
            data: [80, 70, 86, 90]
          },
          {
            name: "科目三",
            type: "line",
            data: [68, 90, 84, 50]
          },
          {
            name: "科目四",
            type: "line",
            data: [60, 40, 90, 80]
          },
          {
            name: "科目五",
            type: "line",
            data: [66, 78, 70, 80]
          }
        ]
      });
    },
    drawRader() {
      this.myChart1 = this.$echarts.init(document.getElementById("szmx"));
      this.myChart1.setOption({
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["本人成绩", "专业平均值"],
          bottom: 0
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
              // backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "人文底蕴", max: 10 },
            { name: "健康生活", max: 10 },
            { name: "学会学习", max: 10 },
            { name: "实践创新", max: 10 },
            { name: "责任担当", max: 10 },
            { name: "科学精神", max: 10 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [5, 8, 6, 2, 7, 10],
                name: "本人成绩"
              },
              {
                value: [10, 7, 3, 4, 8, 6],
                name: "专业平均值"
              }
            ]
          }
        ]
      });
    },
    drawBar() {
      this.myChart2 = this.$echarts.init(document.getElementById("cjqk"));
      this.myChart2.setOption({
        tooltip: {
          trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
        },
        toolbox: {
        },
        legend: {
          data:['个人分数', '班级平均分']
        },
        xAxis: [
          {
            type: 'category',
            data: ['科目1','科目2','科目3','科目4','科目5','科目6'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '分数',
            min: 0,
            max: 100,
            interval: 10,
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
          },
          // {
          //   type: 'value',
          //   name: '温度',
          //   min: 0,
          //   max: 25,
          //   interval: 5,
          //   axisLabel: {
          //     formatter: '{value} °C'
          //   }
          // }
        ],
        series: [
          {
            name:'个人分数',
            type:'bar',
            data:[88, 77, 60, 90, 45, 66]
          },
          {
            name:'班级平均分',
            type:'line',
            // yAxisIndex: 1,
            data:[78, 97, 60, 100, 55, 44]
          }
        ]
      });
    },
    dayclick(day) {
      console.log(day)
    },
    handleCommand(a) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.topImg {
  position: relative;
  color: #ffffff;
  div {
    position: absolute;
    top: 30%;
    left: 15%;
  }
}
.topNav {
  height: 40px;
  padding: 20px 0;
  position: relative;
  background: #fff;
  .topNavContent {
    width: 71%;
    margin: 0 auto;
    height: 28px;
    border: 1px solid #ededed;
    ul {
      overflow: hidden;
      li {
        line-height: 28px;
        width: 20%;
        float: left;
        text-align: center;
        &:nth-child(2n) {
          background: #f4f9fd;
        }
        &:nth-child(2n + 1) {
          background: #fff;
        }
        span {
          display: inline-block;
          line-height: 28px;
          color: #f5a623;
          font-size: 16px;
        }
      }
    }
  }
  .topLeft {
    position: absolute;
    top: 20px;
    left: 5%;
    width: 75px;
    text-align: center;
    ul {
      margin-top: 5px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.21);
      li {
        width: 75px;
        height: 75px;
        background-color: #fff;
        position: relative;
        border-bottom: 1px solid #e7ebf1;
        &:nth-child(1) {
          background-image: url(../../assets/images/home/3.png);
          background-size: 60px 60px;
          background-repeat: no-repeat;
          background-position: 7.5px 7.5px;
          &:hover {
            background-color: #f5a623;
            background-image: url(../../assets/images/home/6.png);
            color: #fff;
          }
        }
        &:nth-child(2) {
          background-image: url(../../assets/images/home/1.png);
          background-repeat: no-repeat;
          background-size: 60px 60px;
          background-position: 7.5px 7.5px;
          &:hover {
            background-color: #6daefa;
            background-image: url(../../assets/images/home/4.png);
            color: #fff;
          }
        }
        &:nth-child(3) {
          background-image: url(../../assets/images/home/2.png);
          background-repeat: no-repeat;
          background-size: 60px 60px;
          background-position: 7.5px 7.5px;
          &:hover {
            background-color: #aad06d;
            background-image: url(../../assets/images/home/5.png);
            color: #fff;
          }
        }
        img {
          position: absolute;
          top: 2.5px;
          left: 2.5px;
          z-index: 1;
        }
        p {
          position: relative;
          z-index: 2;
          &:nth-child(1) {
            padding-top: 12px;
            font-size: 30px;
          }
        }
      }
    }
  }
}
.bgbox {
  background-color: #f4f9fd;
  padding: 40px 0;
  .timetable {
    .top {
      height: 60px;
      text-align: center;
      background-image: url(../../assets/images/home/timetable.png);
      background-size: 100% 100%;
      .left {
        background: #a6cfff;
        box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.45);
        border-radius: 3px;
        width: 101px;
        height: 20px;
        float: left;
        margin: 20px 0 0 10px;
        .button {
          width: 50px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          float: left;
          position: relative;
          cursor: pointer;
        }
        .dropDown {
          position: relative;
          background-color: #68aeff;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          .dropDownContent {
            position: absolute;
            top: 21px;
            left: 0;
            width: 50px;
            z-index: 2;
            .wbutton {
              width: 50px;
              height: 20px;
              background-color: #fff;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
              border-radius: 3px;
              cursor: pointer;
              &:hover {
                background-color: #68aeff;
              }
            }
            .wbutton.active {
              background-color: #68aeff;
            }
          }
        }
      }
      .middle {
        height: 20px;
        display: inline-block;
        font-size: 18px;
        margin-top: 20px;
      }
      .right {
        height: 40px;
        float: right;
        margin-top: 10px;
        line-height: 20px;
        color: #fff;
        text-align: left;
        margin-right: 10px;
      }
    }
    .sub {
      padding: 15px;
      height: 380px;
      background: #fff;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      .left {
        ul {
          li {
            position: relative;
            height: 64px;
            margin-bottom: 15px;
            &:nth-child(1) {
              .left,
              .right {
                background: #e093b7;
              }
            }
            &:nth-child(2) {
              .left,
              .right {
                background: #6daefa;
              }
            }
            &:nth-child(3) {
              .left,
              .right {
                background: #aea1d9;
              }
            }
            &:nth-child(4) {
              .left,
              .right {
                background: #aad06d;
              }
            }
            &:nth-child(5) {
              .left,
              .right {
                background: #f5a623;
              }
            }
            .left {
              width: 35px;
              height: 64px;
              line-height: 32px;
              color: #fff;
              border-radius: 4px;
              text-align: center;
              float: left;
            }
            .right {
              width: calc(100% - 45px);
              height: 64px;
              line-height: 32px;
              color: #fff;
              border-radius: 4px;
              float: right;
              p {
                height: 32px;
                padding: 0 10px;
                font-size: 12px;
                span {
                  display: inline-block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
      .right {
        .calendar {
          padding: 10px;
          height: 255px;
        }
        .todo {
          height: 100px;
          padding: 0 10px;
          border-top: 4px solid #ffd520;
          box-shadow: 0 5px 8px 0 rgba(169, 183, 198, 0.32);
        }
      }
    }
  }
  .messageList {
    background: #fff;
    border-radius: 3px;
    .top {
      height: 60px;
      padding: 0 20px;
      ul {
        overflow: hidden;
        line-height: 60px;
        li {
          float: left;
          padding: 0 4px;
          position: relative;
        }
        li.active {
          color: #28c6c0;
          &::after {
            content: "";
            width: 60%;
            position: absolute;
            bottom: 5px;
            height: 3px;
            background: #28c6c0;
            left: 20%;
          }
        }
      }
    }
    .list {
      height: 380px;
      padding: 15px;
      ul {
        li {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          border-bottom: 1px solid #e7ebf1;
          .left,
          .right {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .left {
            width: 67%;
            float: left;
          }
          .right {
            width: 30%;
            float: right;
            text-align: right;
          }
        }
      }
    }
  }
}
.bgbox2 {
  background-color: #f4f9fd;
  padding: 25px 0;
  .serviceList {
    ul {
      width: 100%;
      position: relative;
      overflow: hidden;
      border-top: 1px solid #ededed;
      border-left: 1px solid #ededed;
      li {
        background: #fff;
        float: left;
        width: calc(33% - 0.5px);
        // width: 33%;
        height: 132px;
        border-right: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        line-height: 66px;
        text-align: center;
        &:hover {
          background: #4a90e2;
          color: #fff;
        }
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .act {
    .actTop {
      padding: 80px 20px 0 20px;
      color: #fff;
      margin-top: 15px;
      height: 68px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: relative;
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .type {
        position: absolute;
        width: 40px;
        height: 18px;
        line-height: 18px;
        border-radius: 3px;
        background: #f5a623;
        top: 6px;
        right: 6px;
        text-align: center;
      }
      .time,
      .infor {
        font-size: 12px;
      }
      .infor {
        p {
          &:nth-child(1) {
            width: calc(100% - 50px);
            float: left;
          }
          &:nth-child(2) {
            width: 50px;
            float: right;
            text-align: right;
          }
        }
      }
    }
    .actList {
      padding: 10px 0;
      height: 247px;
      background: #fff;
      .infor {
        padding: 5px 10px;
        border-bottom: 1px solid #f4f4f4;
        line-height: 26px;
        overflow: hidden;
        &:nth-child(4) {
          border: none;
        }
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .title {
          overflow: hidden;
          p {
            &:nth-child(1) {
              width: calc(100% - 68px);
              float: left;
            }
            &:nth-child(2) {
              width: 65px;
              float: right;
              text-align: right;
              font-size: 10px;
              color: #535353;
            }
          }
        }
        .list {
          overflow: hidden;
          span {
            width: 40px;
            height: 18px;
            line-height: 18px;
            margin-top: 4px;
            border-radius: 3px;
            background: #f5a623;
            color: #fff;
            float: left;
            margin-right: 10px;
            text-align: center;
          }
          .cont {
            width: calc(100% - 110px);
            float: left;
          }
          .to {
            width: 60px;
            float: right;
            text-align: right;
            color: #69a3e7;
          }
        }
      }
    }
  }
  .classShow {
    .class {
      margin-top: 15px;
      padding: 10px;
      height: 395px;
      background: #fff;
      .top {
        margin-top: 10px;
        padding: 10px;
        height: 92px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
        border-radius: 5px;
        position: relative;
        .topImg {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50px;
          top: -15px;
          left: -5px;
          border: 1px solid rgba(0, 0, 0, 0.19);
          background: #fff;
          div {
            position: absolute;
            width: 40px;
            height: 40px;
            top: 5px;
            left: 5px;
            border-radius: 40px;
            background: #000;
          }
        }
        .topContent {
          padding-left: 45px;
          border-bottom: 1px solid #e7ebf1;
          line-height: 21px;
          p {
            overflow: hidden;
          }
          span {
            float: left;
            width: 33%;
            color: #999999;
            font-size: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .good {
          text-align: center;
          font-size: 16px;
          line-height: 38px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .middle {
        margin-top: 15px;
        height: 153px;
        overflow: hidden;
        .left {
          float: left;
          width: 45%;
          background-size: cover;
          background-repeat: no-repeat;
          height: 153px;
          div {
            padding: 94px 10px 5px 10px;
            color: #fff;
            p {
              &:nth-child(1) {
                height: 40px;
                line-height: 20px;
                text-overflow: ellipsis;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              &:nth-child(2) {
                font-size: 12px;
                text-align: right;
              }
            }
          }
        }
        .right {
          float: right;
          width: calc(55% - 10px);
          .list {
            line-height: 37px;
            border-bottom: 1px solid #e6e6e6;
            .up {
              overflow: hidden;
              p {
                &:nth-child(1) {
                  width: calc(100% - 80px);
                  float: left;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
                &:nth-child(2) {
                  width: 80px;
                  float: right;
                  font-size: 12px;
                  text-align: right;
                  color: #4a4a4a;
                }
              }
            }
            .down {
              overflow: hidden;
              p {
                font-size: 12px;
                &:nth-child(1) {
                  width: calc(100% - 60px);
                  float: left;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
                &:nth-child(2) {
                  width: 60px;
                  float: right;
                  text-align: right;
                  color: #69a3e7;
                }
              }
            }
          }
        }
      }
      .bottom {
        margin-top: 15px;
        .infor {
          height: 34px;
          margin-bottom: 15px;
          .left {
            width: 133px;
            height: 39px;
            float: left;
            line-height: 39px;
            background: #e1f1fe;
            text-align: center;
          }
          .right {
            width: calc(100% - 154px);
            padding: 0 10px;
            height: 37px;
            line-height: 37px;
            float: left;
            border: 1px solid #e7ebf1;
            color: #4a4a4a;
            border-left: none;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.wbgbox {
  background-color: #fff;
  padding: 25px 0;
  .jnsList {
    padding: 15px 0;
    .left,
    .right {
      height: 45px;
      line-height: 45px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .left {
      width: 65%;
      text-align: right;
      color: #9b9b9b;
      float: left;
    }
    .right {
      width: 35%;
      float: left;
    }
  }
}
.wbgbox2 {
  background-color: #fff;
  padding: 25px 0;
  #czcp,
  #szmx {
    height: 420px;
    padding: 10px;
  }
}
.wbgbox3 {
  background-color: #fff;
  padding: 25px 0;
  position: relative;
  .app {
    margin-top: 15px;
    margin-bottom: 25px;
    height: 415px;
    .searchInput {
      height: 34px;
      line-height: 34px;
      background: #f4f4f4;
      position: relative;
      width: calc(100% - 20px);
      padding: 0 10px;
      border-radius: 7px;
    }
    .xdbjpics {
      margin-top: 15px;
      overflow: hidden;
      .pic {
        height: 110px;
        width: calc(50% - 7.5px);
        margin-bottom: 15px;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        color: #fff;
        &:nth-child(2n) {
          float: left;
        }
        &:nth-child(2n + 1) {
          float: right;
        }
        &:hover .back {
          display: block;
        }
        .back {
          position: absolute;
          width: 100%;
          height: 110px;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: none;
          .title {
            padding: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .infor {
            position: absolute;
            width: calc(100% - 5px);
            padding: 5px;
            left: 0;
            bottom: 0;
            p {
              font-size: 12px;
              &:nth-child(1) {
                width: 100%;
                height: 30px;
                line-height: 15px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              &:nth-child(2) {
                text-align: right;
                color: #69a3e7;
              }
            }
          }
        }
      }
    }
    .xdbjlist {
      div {
        overflow: hidden;
        border-bottom: 1px solid #e6e6e6;
        line-height: 38px;
        &:nth-child(3) {
          border: none;
        }
        p {
          &:nth-child(1) {
            width: calc(100% - 110px);
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:nth-child(2) {
            width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #4a4a4a;
            float: right;
            text-align: right;
          }
        }
      }
    }
    .downloadList {
      overflow: hidden;
      div {
        width: 20%;
        height: 103px;
        float: left;
        img {
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 auto;
          margin-top: 10px;
        }
        p {
          height: 30px;
          margin-top: 15px;
          font-size: 12px;
          text-align: center;
          line-height: 15px;
          overflow: hidden;
        }
      }
    }
    .autoNav {
      height: 34px;
      background-color: #28c6c0;
      margin-bottom: 15px;
      ul {
        overflow: hidden;
        color: #fff;
        li {
          line-height: 34px;
          padding: 0 5px;
          float: left;
          position: relative;
          &.active:after {
            content: "";
            width: 60%;
            position: absolute;
            bottom: 1px;
            height: 2px;
            background: #fff;
            left: 20%;
          }
        }
      }
    }
    .cjcx {
      .xnd {
        padding-left: 32px;
        position: relative;
        overflow: hidden;
        line-height: 35px;
        border-bottom: 1px solid #e0e0e0;
        p {
          float: left;
          width: calc(100% - 50px);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        img {
          position: absolute;
          width: 20px;
          height: 20px;
          top: 6px;
          left: 5px;
        }
        div {
          float: left;
          width: 50px;
          span {
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 18px;
            border: 1px solid #28c6c0;
            color: #28c6c0;
            font-size: 16px;
            text-align: center;
            line-height: 18px;
          }
        }
      }
      .list {
        p {
          width: 33%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
        }
        .top {
          overflow: hidden;
          line-height: 30px;
          border-bottom: 1px solid #e0e0e0;
          p {
            text-align: center;
            &:nth-child(1) {
              text-align-last: left;
            }
          }
        }
        .infor {
          overflow: hidden;
          line-height: 50px;
          border-bottom: 1px solid #e0e0e0;
          p {
            text-align: center;
            span {
              display: block;
              line-height: 25px;
              font-size: 12px;
              color: #999999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &:nth-child(1) {
              text-align-last: left;
            }
          }
        }
      }
    }
    .yxgr {
      .pic {
        height: 180px;
        width: calc(50% - 15px);
        margin-bottom: 30px;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        color: #fff;
        &:nth-child(2n) {
          float: left;
        }
        &:nth-child(2n + 1) {
          float: right;
        }
        &:hover .back {
          display: block;
        }
        .back {
          position: absolute;
          width: 100%;
          height: 180px;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: none;
          p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: calc(100% - 30px);
            padding: 0 15px;
            position: absolute;
            color: #fff;
            &:nth-child(1) {
              left: 0;
              bottom: 70px;
              line-height: 20px;
            }
            &:nth-child(2) {
              left: 0;
              bottom: 40px;
              font-size: 24px;
              line-height: 26px;
            }
          }
        }
      }
    }
    .yxbjt,
    .yxqs {
      overflow: hidden;
      .top {
        height: 150px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        color: #fff;
        div {
          width: calc(100% - 20px);
          padding: 0 10px;
          position: absolute;
          left: 0;
          bottom: 5px;
          overflow: hidden;
          line-height: 20px;
        }
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          &:nth-child(1) {
            width: calc(100% - 62px);
            float: left;
          }
          &:nth-child(2) {
            width: 62px;
            float: left;
            text-align: right;
            font-size: 12px;
          }
        }
      }
    }
    .commonList {
      div {
        line-height: 40px;
        border-bottom: 1px solid #f4f4f4;
        overflow: hidden;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.name {
            width: calc(100% - 80px);
            float: left;
          }
          &.wtime {
            width: 80px;
            float: left;
            text-align: right;
            font-size: 12px;
            color: #535353;
          }
          &.sname,
          &.pname {
            width: calc(100% - 210px);
            padding-left: 30px;
            float: left;
            position: relative;
            &.tj:after {
              content: "";
              height: 20px;
              width: 20px;
              position: absolute;
              top: 9px;
              left: 4px;
              background-image: url(../../assets/images/home/tj.png);
              background-repeat: no-repeat;
              background-size: 20px 20px;
            }
            &.ding:after {
              content: "";
              height: 20px;
              width: 20px;
              position: absolute;
              top: 9px;
              left: 4px;
              background-image: url(../../assets/images/home/ding.png);
              background-repeat: no-repeat;
              background-size: 20px 20px;
            }
            &.hot:after {
              content: "";
              height: 20px;
              width: 20px;
              position: absolute;
              top: 9px;
              left: 4px;
              background-image: url(../../assets/images/home/hot.png);
              background-repeat: no-repeat;
              background-size: 20px 20px;
            }
          }
          &.pname {
            width: calc(100% - 150px);
          }
          &.type {
            width: 60px;
            text-align: center;
            float: left;
          }
          &.time {
            width: 120px;
            float: right;
            text-align: right;
          }
        }
      }
    }
    .yxqs {
      .top {
        width: calc(50% - 7.5px);
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
        }
      }
    }
    .yxfdy {
      .top {
        height: 112px;
        padding-left: 131px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        margin-bottom: 15px;
        position: relative;
        img {
          position: absolute;
          height: 110px;
          width: 110px;
          top: -10px;
          left: 10px;
        }
        p {
          &:nth-child(2) {
            font-size: 16px;
            position: relative;
            line-height: 26px;
            &:after {
              position: absolute;
              content: "";
              width: 28px;
              height: 2px;
              background: #000000;
              bottom: 0;
              left: -2px;
            }
          }
          &:nth-child(3) {
            height: 40px;
            padding-top: 20px;
            line-height: 20px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &:nth-child(4) {
            text-align: right;
          }
        }
      }
      .pics {
        img {
          height: 100px;
          display: block;
        }
        div {
          margin-bottom: 15px;
        }
      }
    }
    .yxbds {
      .top {
        height: 236px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        margin-bottom: 26px;
        overflow: hidden;
        img {
          display: block;
          height: 236px;
          width: 52%;
          float: left;
        }
        div {
          padding: 0 10px;
          width: calc(48% - 20px);
          float: right;
          p {
            &:nth-child(1) {
              font-size: 16px;
              position: relative;
              line-height: 26px;
              padding-top: 20px;
              &:after {
                position: absolute;
                content: "";
                width: 28px;
                height: 2px;
                background: #000000;
                bottom: 0;
                left: -2px;
              }
            }
            &:nth-child(2) {
              height: 40px;
              padding-top: 120px;
              line-height: 20px;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            &:nth-child(3) {
              text-align: right;
            }
          }
        }
      }
      .pics {
        img {
          height: 100px;
          display: block;
        }
        div {
          margin-bottom: 15px;
        }
      }
    }
  }
  .diy {
    height: 487px;
    box-sizing: border-box;
    padding-top: 100px;
    img {
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  .custom {
    height: 226px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(74,74,74,0.65);
    text-align: center;
    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 50px;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      z-index: 10;
      cursor: pointer;
    }
  }
}
.footer {
  height: 165px;
  background-color: #282828;
  color: #fff;
  font-size: 13px;
  line-height: 20px;
  a {
    color: #fff;
  }
  .wx, .wb{
    margin-right: 30px;
    height: 40px;
    padding-left: 45px;
    display: inline-block;
    position: relative;
    text-align: left;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
    }
  }
}
.commonFuncTitle {
  background-color: #fff;
  height: 20px;
  padding-top: 60px;
  position: relative;
  font-size: 16px;
  z-index: 5;
  .line {
    height: 1px;
    background-color: #9b9b9b;
  }
  .italicLine {
    width: 80px;
    height: 1px;
    background-color: #9b9b9b;
    position: absolute;
    left: 50%;
    top: 60px;
    margin-left: -30px;
    transform: rotate(-60deg);
  }
  .textLeft {
    position: absolute;
    width: 150px;
    left: 50%;
    top: 34px;
    margin-left: -125px;
  }
  .textRight {
    position: absolute;
    width: 150px;
    left: 50%;
    top: 64px;
    margin-left: 20px;
  }
}
.content {
  width: 71%;
  margin: 0 auto;
}
.commonTitle {
  padding-left: 30px;
  position: relative;
  height: 30px;
  line-height: 30px;
  border-bottom: 2px solid #e7ebf1;
  img {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 3px;
    left: 5px;
  }
}
.arrowup {
  position: absolute;
  top: 8px;
  right: 2px;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-bottom: 3px solid black;
}
.arrowdown {
  position: absolute;
  top: 8px;
  right: 2px;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid black;
}
/deep/ .el-carousel__button {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  // background: #D8D8D8;
}
/deep/ .is-active .el-carousel__button {
  background: #4a90e2;
}
/deep/ .el-carousel__arrow {
  background-color:rgba(31,45,61,1)
}
/deep/ .el-checkbox {
  color: #fff;
}
</style>
