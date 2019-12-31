<template>
  <div class="login" @keyup.enter="login()">
    <iframe class="login" :src="portal" height="300" width="500" name="demo" scrolling="auto"></iframe>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { setStore, getStore, removeStore, clearStore } from "@/utils/store";
import { getToken } from "@/utils/auth";
import { getMenuRouter, getRouterList } from "@/utils/router";
import Api from "@/api/index";

export default {
  data () {
    return {
      portal: process.env.ENTRANCE,
      applicationId: "",
      target: "",
      title: ""
    };
  },
  mounted () {
    // console.log(window.location.href,'hahaha')
  },
  computed: {
    ...mapGetters(["tag"])
  },
  created () {
    // 开启loading
    this.$store.commit("SET_TOP_MENU_LIST", []);
    this.$store.commit("SET_GLOBAL_LOADING", true);

    this.applicationId = this.$route.query.appliId || this.$route.query.appliid;
    this.target = this.$route.query.target || "";
    let params = this.$route.query.params;
    // 设置浏览器标题
    this.title = this.$route.query.title;
    // 修改浏览器标题
    this.$store.commit("SET_TOP_TITLE", this.title);
    document.title = this.title;

    let accessToken = Cookies.get("accessToken");
    let userName = Cookies.get("userName");
    if (accessToken != undefined && userName != undefined) {
      // 存储应用ID
      if (this.applicationId != undefined) {
        setStore({
          name: "applicationId",
          content: this.applicationId,
          type: "session"
        });
      }
      // 获取用户信息，身份等
      this.getUser(accessToken, userName);
      // 设置vuex userData 数据
      this.$store.commit("SET_USER_DATA", {
        applicationId: this.applicationId,
        access_token: accessToken,
        userName: userName,
        location: "index"
      });
      // 处理请求路径问题
      let path = "";
      console.log(this.target, 'this.target11')
      if (this.target != "" && this.target != undefined) {
        path = this.target;
      } else {
        path = this.applicationId == "YY_68d206c2e79342dd9438a16fafd9c5d6" ? "/welcome" : "/welcome/welcome";
      }
      // 处理请求参数
      if (params != undefined) {
        params = JSON.parse(params);
        let paramsData = "";
        for (let name in params) {
          if (typeof params[name] != "function") {
            paramsData += `&${name}=${encodeURI(params[name])}`;
          }
        }
        path += `?${paramsData.substring(1)}`;
        console.log(paramsData, "paramsData");
      }
      // console.log(path,'pathpath')
      // 跳转页面
      this.$router.push(path);
    } else {
      // console.log(this.portal,'this.portal')
      window.open(this.portal, "_self");
      // window.location.href = this.portal
    }
  },
  methods: {
    ...mapActions(),
    async getUser (accessToken, userName) {
      let userInfo = await this.Api.findYhByYhm({ yhm: userName });
      if (userInfo.statusCode == 200) {
        this.$store.commit("SET_USER_INFO", {
          userName: userInfo.data.xm,
          header: userInfo.data.ftpFileInfoList.length != 0 ? userInfo.data.ftpFileInfoList[0].filePath : "",
          identity: userInfo.data.sflx,
          sjhm: userInfo.data.sjhm,
          ssbjmc: userInfo.data.ssbjmc,
          ssxymc: userInfo.data.ssxymc,
          sszymc: userInfo.data.sszymc,
          xm: userInfo.data.xm,
          yhbm: userInfo.data.bm
        });
        // 设置上传使用的请求头信息
        this.$store.commit("SET_UPLOAD_HEADER", {
          Authorization: "Bearer " + accessToken,
          "app-flag": "tyrz"
        });
        // 权限校验
        this.checkUser(userInfo.data.sflx);
        // 获取菜单添加动态路由
        this.getAllMenu(userInfo.data.sflx);
      }
    },
    checkUser (identity) {
      if (identity == "XS") {
        return;
      }
      // 获取当前登录用户当前应用权限 无权限跳转到门户
      this.Api["checkUserApp"](this.applicationId)
        .then(res => {
          if (!res.data) {
            window.open(this.portal, "_self");
            // window.location.href = this.portal
          }
        })
        .catch(err => {
          window.open(this.portal, "_self");
          // window.location.href = this.portal
        });
    },

    async getAllMenu (identity) {
      try {
        let res = await this.Api.findCdTreeListByYhBm({
          yyBm: this.applicationId,
          sfsc: 0,
          sf: identity
        });
        if (res.statusCode == 200 && res.data.length != 0) {
          // this.$store.commit("SET_ACTIVE_INDEX", '')
          // 菜单排序
          res.data.sort(function (x, y) {
            return x["orderNum"] - y["orderNum"];
          });
          // console.log(res.data,'res.data2')
          // 动态路由添加
          if (this.$router.options.routes.length <= 3) {
            let routerData = getMenuRouter(res.data);
            // addRoutes动态添加路由
            this.$router.options.routes = [];
            this.$router.addRoutes(routerData);
            this.$router.options.routes.push(routerData);
            this.$store.commit("SET_ROUTER_LIST", []);
            this.$store.commit("SET_ROUTER_LIST", getRouterList(routerData));
          }
          // set顶部菜单数据
          this.$store.commit("SET_TOP_MENU_LIST", res.data);
          // init顶部菜单选中   init左侧菜单选中  init左侧菜单数据

          if (this.target != "" && this.target != undefined) {
            let data = res.data;
            // 活动中心首页的处理
            if (this.target == "/welcome") {
              this.$store.commit("SET_ACTIVE_INDEX", res.data[0].id);
            } else {
              for (let i = 0; i < data.length; i++) {
                this.isWhere(data[i]);
              }
            }
            // 本地存储菜单全部数据
            setStore({ name: "menu", content: res.data, type: "session" });
          } else {
            if (res.data[0].title == "统一通讯") {
              this.Api.queryYhCdTree()
                .then(response => {
                  if (response.statusCode == 200) {
                    this.$store.commit("SET_SIDEBAR_LIST", response.data);
                  }
                })
                .catch(error => {
                  this.$message.error("请求菜单树信息失败,请点击刷新或者刷新页面重试。");
                });
            } else {
              this.$store.commit("SET_ACTIVE_INDEX", res.data[0].id);
              this.$store.commit("SET_SIDEBAR_LIST", res.data[0].children);
            }
          }
          // 本地存储菜单全部数据
          setStore({ name: "menu", content: res.data, type: "session" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    isWhere (data) {
      let res = {};
      if (data.href == this.target) {
        res.sidebar = data;
        // console.log(data,'data[i]22嗷嗷')
        // console.log(this.target,'this.target22嗷嗷')
      }
      // console.log(data,'哈哈')
      if (data.children.length > 0) {
        for (let i = 0; i < data.children.length; i++) {
          this.isWhere(data.children[i]);
          if (data.children[i].href == this.target) {
            res.top = data;
            // console.log(res.top,'res.top')
            // console.log(res.sidebar,'res.sidebar')
            break;
          }
        }
      }
      this.setTopAndSidebarData(res.top, res.sidebar);
    },

    filterData (id, data) {
      for (let i = 0; i < data.length; i++) {
        if (this.target == data[i].href) {
          mengId = data[i].parentId;
        } else {
          this.filterData(id, data[i].children);
        }
      }
    },

    setTopAndSidebarData (top, sidebar) {
      let query = {};
      if (top != undefined) {
        console.log("走一个", sidebar);
        console.log("1111111111", top);
        query.activeIndex = top.id;
        this.$store.commit("SET_ACTIVE_INDEX", top.id);
        this.$store.commit("SET_SIDEBAR_LIST", top.children);
        // this.$store.commit("ADD_TAG", this.tag)
      }
      if (sidebar != undefined) {
        query.defaultActive = sidebar.id;
        query.defaultActivePath = sidebar.href;
        this.$store.commit("SET_DEFAULT_ACTIVE", {
          id: sidebar.id,
          value: sidebar.href
        });
        // console.log('107');

        this.$store.commit("ADD_TAG", {
          label: sidebar.label,
          value: sidebar.href,
          params: {},
          query: query,
          close: true
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  min-height: 768px;
  min-width: 1366px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border: 0;
  display: none;
}
</style>
