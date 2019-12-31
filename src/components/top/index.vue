<template>
  <el-row class="top">
    <!-- 左侧logo 及 文字 -->
    <el-col :span="6">
      <div class="left_logo">
        <div class="logo">
          <img src="@/assets/images/logos.png" />
        </div>
        <div class="title">{{ topTitle }}</div>
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
        <el-tooltip class="item qhzt" effect="dark" content="切换主题" placement="bottom">
          <el-color-picker class="color-picker" v-model="themeVal" size="mini" @change="modifyTheme"></el-color-picker>
        </el-tooltip>
        <div class="icon">
          <el-tooltip class="item" effect="dark" :content="isFullScren ? '退出全屏' : '全屏'" placement="bottom">
            <i :class="[ 'iconfont',  isFullScren ? 'icon-tuichuquanping' : 'icon-ArtboardCopy3' ]"
              @click="handleScreen"></i>
          </el-tooltip>
          <!-- 顶部消息 -->

          <el-popover placement="bottom-end" width="400" trigger="hover">
            <el-row>
              <el-link type="primary" :underline="false">系统消息（{{ tableData.length }}）</el-link>
            </el-row>
            <el-row style="padding-top: 10px">
              <el-table style="width:380px" :data="tableData"
                max-height="300" :row-style="{ cursor: 'pointer' }" :show-header="false" @row-click="handleDetails" :header="false">
                <el-table-column width="380" prop="znxbt" show-overflow-tooltip></el-table-column>
              </el-table>
            </el-row>
            <el-row type="flex" justify="center" style="padding-top: 10px">
              <el-button size="small" type="primary" @click="allReaded">全部已读</el-button>
              <el-button size="small" type="primary" @click="allChecked">查看全部</el-button>
            </el-row>

            <el-badge slot="reference" :value="tableData.length" :max="99" class="item">
              <i class="iconfont icon-ArtboardCopy" style="margin-right:0px;"></i>
            </el-badge>
          </el-popover>

          <el-dialog :append-to-body="true" :title="trialData.znxbt" :visible.sync="trialDataVisible" width="30%">
            <div v-html="trialData.znxnr"></div>
            <el-row style="margin: 10px 0px" v-if="trialData.znxfj.length > 0">附件：</el-row>
            <el-row>
              <el-col :span="24" v-for="(site, index) in trialData.znxfj" :key="index">
                <el-link type="primary" :href="site.fileAllpath" :download="site.fileName">{{ index + 1 + "，" + site.fileName }}</el-link>
              </el-col>
            </el-row>
            <el-row slot="footer">
              <el-button @click="trialDataVisible = false">取 消</el-button>
            </el-row>
          </el-dialog>

          <el-dialog :append-to-body="true" title="查看全部站内信" :visible.sync="dialogVisible2" width="50%">
            <el-row>
              <el-table :data="tableAllData" @row-click="handleDetails" :cell-style="setRowStyle" height="300px" style="width: 100%">
                <el-table-column prop="znxbt" label="标题" min-width="180"></el-table-column>
                <el-table-column prop="fssj" label="时间" width="180"></el-table-column>
              </el-table>
            </el-row>
            <el-row slot="footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
            </el-row>
          </el-dialog>
          <!-- 顶部消息 -->
        </div>
        <el-dropdown @command="logout" @visible-change="userDropdown">
          <div class="drop_down" :style="{ color: theme }">
            <img v-if="userInfo.header != '' && imgState == true" :src="userInfo.header" width="28" height="28"/>
            <img v-else src="@/assets/images/header.svg" width="28" height="28"/>
            <div class="username">{{ userInfo.userName }}</div>
            <i class="el-icon-caret-bottom" v-if="userDropdownStatus"></i>
            <i class="el-icon-caret-top" v-else></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="width:100px;z-index: 2181;">
            <el-dropdown-item command="userData"
                              @mouseover.native="updateStyle('userData', true)" @mouseout.native="updateStyle('userData', false)" ref="userData"
            >
              个人信息
            </el-dropdown-item>
            <el-dropdown-item
              command="gwData"
              v-if="isJobShow"
              @mouseover.native="updateStyle('gwData', true)"
              @mouseout.native="updateStyle('gwData', false)"
              ref="gwData"
            >
              选择岗位
            </el-dropdown-item>
            <el-dropdown-item
              command="logout"
              @mouseover.native="updateStyle('logout', true)"
              @mouseout.native="updateStyle('logout', false)"
              ref="logout"
            >
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <el-dialog
      title="岗位修改"
      :visible.sync="dialogVisible1"
      width="500px"
      :append-to-body="true"
    >
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-select v-model="gwChoose" placeholder="请选择" value-key="bm">
          <el-option
            v-for="site in gwList"
            :key="site.bm"
            :label="site.zzjggwmc"
            :value="site"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row :gutter="10" type="flex" justify="center" align="middle">
        <el-button type="primary" @click="setGWInfo">确 定</el-button>
        <el-button @click="dialogVisible1 = false">取 消</el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>
<script>
import { mapGetters } from "vuex";
import topMenu from "./top_menu";
import {
  fullscreenToggel,
  listenfullscreen,
  setTheme,
  CheckImgExists
} from "@/utils/util";
import { setStore, getStore, removeStore, clearStore } from "@/utils/store";
import { removeCookies } from "@/utils/auth";
import color from "@/mixins/color";

export default {
  components: {
    topMenu
  },
  mixins: [color()],
  data() {
    return {
      themeVal: "#37c5bf",
      isJobShow: true,
      userDropdownStatus: false,
      imgState: null,
      messages: [],
      tableData: [],
      tableAllData: [],
      trialData: {
        znxfj: []
      },
      trialDataVisible: false,
      dialogVisible2: false,
      gwChoose: {},
      dialogVisible1: false
    };
  },
  computed: {
    ...mapGetters([
      "isFullScren",
      "userData",
      "theme",
      "topTitle",
      "userInfo",
      "gwInfo",
      "gwList"
    ])
  },
  created() {
    if (this.theme == undefined) {
      this.$store.commit("SET_THEME", "#37c5bf");
    }
    this.themeVal = this.theme;
    this.getNotes();
    this.getAllNotes();
    this.getGWList();
  },
  mounted() {
    // 全屏监听
    this.imgState = CheckImgExists(this.userInfo.header);
    // console.log(this.imgState, "this.imgState");
    if (this.userInfo.identity == "XS") {
      this.isJobShow = false;
    }
    listenfullscreen(this.setScreen);
    this.Api.grXtxxList()
      .then(res => {
        // console.log('消息气泡', res)
        this.messages = res.data;
      })
      .catch(err => {});
  },

  methods: {
    // 设置全屏 取消全屏
    handleScreen() {
      fullscreenToggel();
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    // 下拉框动态样式
    updateStyle(ref, status) {
      this.$refs[ref].$el.style.color = status ? this.theme : "#606266";
      this.$refs[ref].$el.style.backgroundColor = status ? "#f2f2f2" : "#fff";
    },
    // 下拉框图标
    userDropdown(status) {
      this.userDropdownStatus = status;
    },
    // 退出
    logout(command) {
      if (command == "logout") {
        this.$confirm("是否确认退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          removeCookies();
          removeStore({ name: "userData" });
          clearStore({ type: "session" });
          // this.$router.push('/')
          location.href = "http://stuinfo.neu.edu.cn";
        });
      } else if (command == "gwData") {
        this.gwChoose = this.gwInfo;
        this.dialogVisible1 = true;
      } else {
        // TODO 只有教工以上管理岗才能进入统一认证，教工端没有个人信息所以暂时未开发
        this.$message.success("个人信息开发中...");
      }
    },
    // 消息气泡
    // 跳转到消息详情
    //消息气泡
    // 切换主题
    modifyTheme() {
      if (this.themeVal == null) {
        this.themeVal = "#37c5bf";
      }
      this.$store.commit("SET_THEME", this.themeVal);
      setTheme(getStore({ name: "theme" }));
    },
    //  查询站内信未读信息
    getNotes() {
      this.Api.getYhZnx({ znxLx: 2, sfyd: "0" })
        .then(res => {
          if (res.statusCode == 200) {
            this.tableData = res.data;
            console.log(res, "res");
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    //  设置岗位
    setGWInfo() {
      this.$store.commit("SET_GW_INFO", {
        bm: this.gwChoose.bm,
        gwmc: this.gwChoose.gwmc,
        zzjggwmc: this.gwChoose.zzjggwmc
      });
      this.dialogVisible1 = false;
    },
    //  查询信息
    getGWList() {
      this.Api.findGwxx()
        .then(res => {
          if (res.statusCode == 200) {
            this.$store.commit("SET_GW_LIST", res.data);
            let ifGWInfo = getStore({ name: "gwInfo" });
            if (ifGWInfo == undefined) {
              this.gwChoose = this.gwList[0];
            } else {
              if (
                this.gwList.filter(data => data.bm == this.gwInfo.bm).length > 0
              ) {
                this.gwChoose = this.gwList.filter(data => {
                  return data.bm == this.gwInfo.bm;
                })[0];
              } else {
                this.gwChoose = this.gwList[0];
              }
            }
            this.setGWInfo();
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    //  查询站内信全部信息
    getAllNotes() {
      this.Api.getYhZnx({ znxLx: 2, sfyd: "" })
        .then(res => {
          if (res.statusCode == 200) {
            this.tableAllData = res.data;
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    //  查看详情
    handleDetails(row, column, event) {
      this.trialData = row;
      this.trialDataVisible = true;
      this.Api.getYhZnxXq(row.bm)
        .then(res => {
          if (res.statusCode == 200) {
            this.getNotes()
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    //  设置样式
    setRowStyle({ row, rowIndex }) {
      // console.log("setRowStyle",111111112);
      if (row.sfyd == 1) {
        // console.log('念念')
        return "color:#999999;cursor:pointer";
      } else {
        return "cursor:pointer";
      }
    },
    //  隐藏表头
    // setHeadStyle({ row, rowIndex }) {
    //   console.log("setHeadStyle");
    //   return { display: "none" };
    // },
    //  全部已读
    allReaded() {
      let postData = { bms: [] };
      this.tableData.forEach(data => {
        postData.bms.push(data.sxrBm);
      });
      this.Api.ydGrZnx(postData)
        .then(res => {
          if (res.statusCode == 200) {
            this.getNotes();
            this.$message.success(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    //  查看全部
    allChecked() {
      this.getAllNotes()
      this.dialogVisible2 = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin centerBox {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.top {
  height: 80px;
  .left_logo {
    height: 80px;
    padding-left: 26px;
    line-height: 80px;
    .logo,
    .title {
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
    .color-picker,
    .drop_down,
    .icon {
      float: left;
    }
    .color-picker {
      margin-top: 26px;
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

// 消息气泡
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
      width: 330px;
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

.el-fade-in-linear-enter {
  opacity: 0;
  height: 0;
}

.el-fade-in-linear-leave-active {
  position: absolute;
}

/deep/ .el-badge__content.is-fixed {
  top: 30px;
}

/deep/ .el-badge {
  vertical-align: baseline;
  height: 46px;
}

// 消息气泡
</style>
