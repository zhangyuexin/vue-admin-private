/**
 * Created by neunb on 2018/08/09.
 */
const merge = require('webpack-merge')
// TODO 门户Api
// 门户-登录
import * as loginIndex from './protal/login/index'
// 门户-教师门户首页
import * as protalTeacher from './protal/protalTeacher'


// TODO 管理后台—教工端Api

// 学工首页 sunwei
import * as academicHomepage from './academicManagement/homePage'
// 学工管理 sunwei
import * as academicManagement from './academicManagement'
// 学工管理 评奖评优
import * as awardsRecommendation from './academicManagement/awardsRecommendation'
import * as classShow from './academicManagement/classShow'
// 学工-请假管理
import * as askForLeave from './academicManagement/studentWork/askForLeave'
// 学工-问卷和强制阅读
import * as readAndAnswer from './academicManagement/studentWork/readAndAnswer'
// 学工-奖项库
import * as prizeHome from './academicManagement/studentWork/prizeHome'


// 临时api文件，以后再合并
import * as tempApi from './academicManagement/awardsRecommendation/temp'

import * as printApi from './academicManagement/awardsRecommendation/print'

const result = merge(
  // 门户丅
  loginIndex,
  protalTeacher,
  // 门户丄


  // 学工管理
  academicHomepage,
  academicManagement,
  awardsRecommendation,
  classShow,
  askForLeave,
  readAndAnswer,
  prizeHome,
  //成长


  // 临时
  tempApi,
  printApi,
)

export default result
