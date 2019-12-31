import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
    path: "/",
    name: "门户登录",
    component: () => import("@/views/InlayLogin"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  }, {
    path: "/getPassword",
    name: "重置密码",
    component: () => import("@/views/getPassword"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },{
    path: "/qrcodeRegister",
    name: "空白页",
    component: () => import("@/views/portal/qrcodeRegister"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }
  }, {
    path: "/home",
    name: "门户首页",
    component: () => import(/* webpackChunkName: "page" */ "@/views/InlayHome"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    },
    children: [{
      path: "/portalTeacher",
      name: "教师门户",
      component: () => import("@/views/portal/portalTeacher"),
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: true
      }
    }, {
      path: "/portalStudent",
      name: "学生门户",
      component: () => import("@/views/portal/portalStudent"),
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: true
      }
    }]
  }]
});
