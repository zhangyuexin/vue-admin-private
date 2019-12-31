import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'

// 公共数据
import common from './modules/common'
// TAG公共数据
import tag from './modules/tag'
// 用户数据
import user from './modules/user'
//组织机构数据
import organization from './modules/organization'
//角色管理数据
import roles from './modules/role'
//角色管理数据
import jobs from './modules/jobs'
// 权限数据
import directive from './modules/directive'
// 勤工助学岗位查询弹窗参数
import dailys from './modules/daily'
// 路由
import router from './modules/router'
// TODO
// 登录
import loginIndex from '../service/protal/login/index'

// ftp 服务
import protalTeacherService from '../service/protal/protalTeacher'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 公共State
    common,
    tag,
    user,
    roles,
    jobs,
    directive,
    dailys,
    router,
    // 统一修改—>Actions
    loginIndex,





    organization,

    protalTeacherService,

  },
  // model主入口
  getters
})
