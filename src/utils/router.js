/**
 * 拼装路由数据，添加路由
 * @param {*} s
 */
const routerData = [{
  path: "/",
  name: "统一认证登录",
  component: () => import( /* webpackChunkName: "page" */ "@/views/Login"),
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
}, {
  path: "/home",
  name: "统一认证首页",
  component: () => import( /* webpackChunkName: "page" */ "@/views/Home"),
  meta: {
    keepAlive: true,
    isTab: false,
    isAuth: true
  },
  children: [{
    path: "/welcome/welcome",
    name: "欢迎页面",
    component: () => import("@/views/center/welcome/welcome"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true // 身份验证 true 不验证 false 验证
    }
  }, {
    path: "/cantFind",
    name: "未找到对应页面",
    component: () =>
      import( /* webpackChunkName: "page" */ "@/views/common/error/cantFind"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }
  }]
}]

const routerList = ['/', '/getPassword', '/home']
const zzjg = []

export function getMenuRouter(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].type == 'menu') {
      routerData[2].children.push({
        path: data[i].href,
        name: data[i].label,
        component: getViews(data[i].viewPath),
        meta: {
          show: data[i].show, // 显示隐藏
          openType: data[i].openType, // 打开方式
          isAuth: true, // 是否验证身份
          title: data[i].label, // 菜单名称
          permissionsList: data[i].buttons // 权限列表
        }
      })
      if (data[i].title == '组织机构-信息' || data[i].title == '组织机构-权限' || data[i].title == '组织机构-岗位') {
        zzjg.push({
          path: data[i].href,
          name: data[i].label,
          component: getViews(data[i].viewPath),
          meta: {
            show: data[i].show, // 显示隐藏
            openType: data[i].openType, // 打开方式
            isAuth: true, // 是否验证身份
            title: data[i].label, // 菜单名称
            permissionsList: data[i].buttons // 权限列表
          }
        })
      }
    }
    if (data[i].children.length) {
      getMenuRouter(data[i].children)
    }
  }
  return routerData
}

export function getViews(path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/views/' + path + '.vue'))
    })
  }
}

export function getRouterList(data) {
  if (data[2].children.length) {
    data[2].children.forEach(value => {
      if (routerList.indexOf(value.path) == -1)
        routerList.push(value.path)
    })
  }
  return routerList
}
