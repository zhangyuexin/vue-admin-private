import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/",
    name: "统一认证登录",
    component: () => import(/* webpackChunkName: "page" */ "@/views/Login"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  }, {
    path: "/qrcodeRegister",
    name: "空白",
    component: () => import(/* webpackChunkName: "page" */ "@/views/portal/qrcodeRegister"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true
    }
  }]
});

// export default new Router({
//   routes: [{
//     path: "/",
//     name: "统一认证登录",
//     component: () => import(/* webpackChunkName: "page" */ "@/views/Login"),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: false
//     }
//   }, {
//     path: "/getPassword",
//     name: "重置密码",
//     component: () => import("@/views/getPassword"),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: false
//     }
//   }, {
//     path: "/home",
//     name: "统一认证首页",
//     component: () => import(/* webpackChunkName: "page" */ "@/views/Home"),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: true
//     },
//     children: [{
//       path: "/cantFind",
//       name: "未找到对应页面",
//       component: () =>
//         import(/* webpackChunkName: "page" */ "@/views/common/error/cantFind"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/role/role",
//       name: "角色",
//       component: () => import("@/views/center/role/role"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/role/userRule",
//       name: "角色权限",
//       component: () => import("@/views/center/role/userRule"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/system/menuresource",
//       name: "菜单资源管理",
//       component: () => import("@/views/center/system/menuresource"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/system/menuziduan",
//       name: "菜单字段管理",
//       component: () => import("@/views/center/system/menuziduan"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/organization/organization",
//       name: "组织机构",
//       component: () => import("@/views/center/organization/organization"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       },
//       children: [{
//         path: "/views/organization/information",
//         name: "information",
//         component: () => import("@/views/center/organization/information")
//       }, {
//         path: "/views/organization/post",
//         name: "post",
//         component: () => import("@/views/center/organization/post")
//       }, {
//         path: "/views/organization/personnel",
//         name: "personnel",
//         component: () => import("@/views/center/organization/personnel")
//       }]
//     }, {
//       path: "/applicationManagement/access",
//       name: "applicationManagement",
//       component: () => import("@/views/center/applicationManagement/access"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/userAdmin/staffAdmin",
//       name: "用户管理->教工",
//       component: () => import("@/views/center/userAdmin/staffAdmin"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/userAdmin/studentAdmin",
//       name: "用户管理->学生",
//       component: () => import("@/views/center/userAdmin/studentAdmin"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/userAdmin/groupAdmin",
//       name: "用户组管理",
//       component: () => import("@/views/center/userAdmin/groupAdmin"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/userAdmin/membersAdmin",
//       name: "成员管理",
//       component: () => import("@/views/center/userAdmin/membersAdmin"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: "/applicationManagement/appAccess",
//       name: "应用接入管理",
//       component: () => import("@/views/center/applicationManagement/access"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/applicationManagement/appAdministrator",
//       name: "应用管理员",
//       component: () => import("@/views/center/applicationManagement/administrator"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         iappAdministratorsAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/applicationManagement/appManagement",
//       name: "应用权限管理",
//       component: () => import("@/views/center/applicationManagement/management"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/menu/menuManagement",
//       name: "菜单管理",
//       component: () => import("@/views/center/menu/menuManagement"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/menu/menuResource",
//       name: "资源管理",
//       component: () => import("@/views/center/menu/resource"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/systemSet",
//       name: "系统设置",
//       component: () => import("@/views/center/idenManagement/systemSet"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/idenAdmin",
//       name: "认证设置",
//       component: () => import("@/views/center/idenManagement/idenAdmin"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/databaseIden",
//       name: "数据库认证",
//       component: () => import("@/views/center/idenManagement/databaseIden"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/ldap",
//       name: "LDAP认证<<开发中>>",
//       component: () => import("@/views/center/idenManagement/ldap"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/ad",
//       name: "AD认证<<开发中>>",
//       component: () => import("@/views/center/idenManagement/ad"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/agreement",
//       name: "协议认证<<开发中>>",
//       component: () => import("@/views/center/idenManagement/agreement"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     }, {
//       path: "/idenManagement/idenSource",
//       name: "认证源设置",
//       component: () => import("@/views/center/idenManagement/idenSource"),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true // 身份验证 true 不验证 false 验证
//       }
//     },
//       {
//         path: "/termAdmin/termAdmin",
//         name: "学期管理",
//         component: () => import("@/views/center/termAdmin/termAdmin"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         path: "/gradeAdmin/gradeAdmin",
//         name: "年级管理",
//         component: () => import("@/views/center/gradeAdmin/gradeAdmin"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         path: "/academicYearAdmin/academicYearAdmin",
//         name: "学年度管理",
//         component: () => import("@/views/center/academicYearAdmin/academicYearAdmin"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         //jiaorui add
//         path: "/dict/dictType",
//         name: "字典类型",
//         component: () => import("@/views/center/dict/dictType"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         //jiaorui add
//         path: "/dict/dictCode",
//         name: "数据字典",
//         component: () => import("@/views/center/dict/dictCode"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         path: "/clusterAdmin/cluster",
//         name: "集群管理",
//         component: () => import("@/views/center/clusterAdmin/cluster"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         path: "/tagAdmin/tagAdmin",
//         name: "标签管理",
//         component: () => import("@/views/center/tagAdmin/tagAdmin"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       }, {
//         path: "/welcome/welcome",
//         name: "欢迎页面",
//         component: () => import("@/views/center/welcome/welcome"),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true // 身份验证 true 不验证 false 验证
//         }
//       },
//       // 服务中心
//       {
//         path: '/welcome',
//         name: '首页',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/welcome/index'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/grantApplication',
//         name: '助学金申请表单',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/grantAdmin/grantApplication'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/scholarshipApplication',
//         name: '命名奖学金申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/scholarshipApplication'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/honoraryTitleApplication',
//         name: '荣誉称号申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/honoraryTitleApplication'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/insuranceApplication',
//         name: '保险申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/insuranceApplication'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/encouragementApplication',
//         name: '国家励志奖学金申请表单',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/encouragementAdmin/encouragementApplication'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/socialGrantApplication',
//         name: '社会奖助学金申请表单',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/grantAdmin/socialGrantApplication'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/studentServiceNote',
//         name: '生源地贷款信息填报',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/studentServiceNote'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       },
//       //   {
//       //   path: '/studentServiceNote',
//       //   name: '第二课堂成绩单',
//       //   component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/studentServiceNote'),
//       //   meta: {
//       //     keepAlive: true,
//       //     isTab: false,
//       //     isAuth: true
//       //   }
//       // },
//       {
//         path: '/studentLoansForm',
//         name: '填写生源地贷款信息填报',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/studentLoansForm'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/GrassRootsCtcServiceNote',
//         name: '基层就业补偿代偿申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/encouragementAdmin/GrassRootsCtcServiceNote'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/GrassRootsCtcServiceNoteForm',
//         name: '填写基层就业补偿代偿申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/encouragementAdmin/GrassRootsCtcServiceNoteForm'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/grant',
//         name: '助学金申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/grantAdmin/grant'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/socialGrant',
//         name: '国家励志奖学金申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/grantAdmin/socialGrant'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/encouragement',
//         name: '社会奖助学金申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/encouragementAdmin/encouragement'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/armyCtcForm',
//         name: '填写应征入伍补偿代偿申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/armyCtcForm'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/armyServiceNote',
//         name: '应征入伍补偿代偿申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/armyServiceNote'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       },
//       {
//         path: '/twice_report',
//         name: '第二课堂成绩单',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/twice_report'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       },
//       {
//         path: '/retirementServiceNote',
//         name: '退役复学补偿代偿申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/retirementServiceNote'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/retirementForm',
//         name: '填写退役复学补偿代偿申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/supportCenter/retirementForm'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/settingDifficultStudents',
//         name: '困难生设置',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/difficultyIdentification/settingDifficultStudents'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/examinationOfDifficultStudents',
//         name: '困难生审核',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/difficultyIdentification/examinationOfDifficultStudents'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/examinationOfDifficultStudentsDetails',
//         name: '困难生审核详情',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/difficultyIdentification/examinationOfDifficultStudentsDetails'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/nationalScholarship',
//         name: '国家励志奖学金',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/encouragementAdmin/nationalScholarship'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/nationalScholarshipForm',
//         name: '学生-国家励志奖学金申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/encouragementAdmin/nationalScholarshipForm'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/appointmentAdmin',
//         name: '心理中心/预约管理（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/psychCenter/appointmentAdmin'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/reissueStudentIdCardAssist',
//         name: '学生证补办（辅）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/proofOfReplacement/reissueStudentIdCardAssist'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/reissueStudentIdCardSchool',
//         name: '学生证补办（校）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/proofOfReplacement/reissueStudentIdCardSchool'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/certificateRenewal',
//         name: '荣誉证书补办 (辅)',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/proofOfReplacement/certificateRenewal'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/certificateRenewalSchool',
//         name: '荣誉证书补办 (校)',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/proofOfReplacement/certificateRenewalSchool'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/trapSettings',
//         name: '临时困补设置',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/subsidizedLoanSupplement/trapSettings'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/distressAudit',
//         name: '临时困补审核',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/subsidizedLoanSupplement/distressAudit'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/tollSubsidy',
//         name: '路费补助设置',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/subsidizedLoanSupplement/tollSubsidy'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/roadSubsidyAudit',
//         name: '路费补助审核',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/subsidizedLoanSupplement/roadSubsidyAudit'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/schoolBusAdmin',
//         name: '校车管理（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/queryService/schoolBusAdmin'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/studentWithCertificatesAcademy',
//         name: '学生-在校证明开具',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/studentWithCertificatesAcademy'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/leaveService',
//         name: '请假申请',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/leaveService'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/certificateOfHonorReapplyAssist',
//         name: '荣誉证书补办',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/certificateOfHonorReapplyAssist'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/phoneAdmin',
//         name: '电话管理（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/queryService/phoneAdmin'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/phoneAdd',
//         name: '电话管理/下级部门添加（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/queryService/phoneAdd'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/downloadCenter',
//         name: '下载中心（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/downloadCenter'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/helpCenter',
//         name: '帮助中心（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/helpCenter'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/helpAdd',
//         name: '帮助中心/新建帮助（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/helpAdd'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/findExamine',
//         name: '寻物招领审核（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/finding/findExamine'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/findInfo',
//         name: '寻物招领详情（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/finding/findInfo'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/findAdmin',
//         name: '寻物招领管理（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/finding/findAdmin'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/findEdit',
//         name: '寻物招领编辑（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/finding/findEdit'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/findCheck',
//         name: '寻物招领查看（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/finding/findCheck'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/goodsTypeAdmin',
//         name: '物品类型管理（教师）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/finding/goodsTypeAdmin'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/certificateInSchool',
//         name: '教师-在校证明开具',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/proofOfReplacement/certificateInSchool'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/template',
//         name: '教师-在校证明开具(模板)',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/proofOfReplacement/template'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/supplementaryStudentCertificate',
//         name: '学生证补办',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/supplementaryStudentCertificate'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/holidayLeaveRegistration',
//         name: '假期离校登记',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/holidayLeaveRegistration'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/accreditationOfDifficultStudents',
//         name: '困难生认证',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/subsidizedServices/accreditationOfDifficultStudents'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/psychologicalConsultation',
//         name: '心理咨询预约',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/psychologicalConsultation'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/resultInquiry',
//         name: '成绩查询（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/resultInquiry'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/classScheduleInquiry',
//         name: '课表查询（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentManagement/classScheduleInquiry'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/helpCenter',
//         name: '帮助中心（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/help/helpCenter'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/helpCenterDetail',
//         name: '帮助中心详情（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/help/helpCenterDetail'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/downloadCenter',
//         name: '下载中心（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/download/downloadCenter'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/lostList',
//         name: '寻物招领列表（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/lost/lostList'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/lostListAdd',
//         name: '寻物招领新建（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/lost/lostListAdd'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/lostListEdit',
//         name: '寻物招领编辑（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/lost/lostListAdd'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/lostDetail',
//         name: '寻物招领详情（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/lost/lostDetail'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/myLostList',
//         name: '寻物招领我的发布（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/publicService/lost/myLostList'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/student/serviceList',
//         name: '服务列表（学生）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/serviceList'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/statisticsOfVacationDepartures',
//         name: '假期离校统计',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/leavingSchool/statisticsOfVacationDepartures'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/statisticsOfVacationDeparturesDetails',
//         name: '假期离校统计详情',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/leavingSchool/statisticsOfVacationDeparturesDetails'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/leaveManagement',
//         name: '请假管理',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/leavingSchool/leaveManagement'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/teacher/serviceManagement',
//         name: '服务管理',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/general/serviceManagement'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/schoolReturn',
//         name: '返校统计（校）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/returnSchool/schoolReturn'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/schoolReturnInfo',
//         name: '返校统计（校）-详情',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/returnSchool/schoolReturnInfo'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/instituteReturn',
//         name: '返校统计（院）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/returnSchool/instituteReturn'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/instituteReturnInfo',
//         name: '返校统计（院）-详情',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/returnSchool/instituteReturnInfo'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/instructorReturn',
//         name: '返校统计（辅导员）',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/returnSchool/instructorReturn'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/instructorReturnInfo',
//         name: '返校统计（辅导员）-详情',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/returnSchool/instructorReturnInfo'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/classQuery',
//         name: '班级信息查询',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/classAdmin/schoolClassQuery'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/studentTeaInfo/inforhome',
//         name: '教师端-个人信息一张表',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/studentTeaInfo/inforhome'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/committeeInfor',
//         name: '班委信息',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/committeeAdmin/committeeInfor'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }, {
//         path: '/studentTeaInfo/studentSearch',
//         name: '教师端-学生信息综合查询',
//         component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/studentTeaInfo/studentSearch'),
//         meta: {
//           keepAlive: true,
//           isTab: false,
//           isAuth: true
//         }
//       }]
//   }, {
//     path: '/messageCenterIndex',
//     name: 'messageCenterIndex',
//     component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/messageCenter/index'),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: true
//     },
//     children: [{
//       path: '/teacher/messageList',
//       name: '消息中心/消息列表（教师）',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/messageCenter/messageList'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/teacher/messageInfo',
//       name: '消息中心/消息详情（教师）',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/service/teacher/messageCenter/messageInfo'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }]
//   }, {
//     path: '/studentInfo/inforhome',
//     name: '学生端-个人信息一张表',
//     component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentInfo/inforhome'),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: true
//     }
//   }, {
//     path: '/studentInfo/myInforForm',
//     name: '学生端-学生个人信息变更',
//     component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/studentInfo/myInforForm'),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: true
//     }
//   }, {
//     path: '/student/myApplication',
//     name: '我的申请（学生）',
//     component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/personalCenter/myApplication'),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: true
//     }
//   }, {
//     path: '/student/myFavorite',
//     name: '我的收藏（管理）',
//     component: () => import( /* webpackChunkName: "page" */ '@/views/service/student/personalCenter/myFavorite'),
//     meta: {
//       keepAlive: true,
//       isTab: false,
//       isAuth: true
//     }
//   },
//     // 活动中心
//     {
//       path: '/welcome',
//       name: '首页',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/welcome/index'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/query',
//       name: '学生活动查询',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/students/query'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       }
//     }, {
//       path: '/details',
//       name: '获胜数据详情',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/students/details'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       }
//     },
//     {
//       path: '/activeManage',
//       name: '活动管理',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/activeManage'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/activeDetails',
//       name: '活动详情',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/activeDetails'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/newActive',
//       name: '新建活动',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/newActive'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/activeSummary',
//       name: '活动总结',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/activeSummary'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/findActive',
//       name: '活动查询',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/findActive'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/enrollDetails',
//       name: '报名详情',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/enrollDetails'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/codeManage',
//       name: '标签管理',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/codeManage'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     }, {
//       path: '/topicManage',
//       name: '主题管理',
//       component: () => import( /* webpackChunkName: "page" */ '@/views/activity/manage/topicManage'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: true
//       }
//     },
//     // 统一通讯
//     {
//       path: '/gatewayInformation',
//       name: '门户信息',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/communication/gatewayInformation'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     }, {
//       path: '/informationEdit',
//       name: '门户信息编辑',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/communication/information/informationEdit'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     }, {
//       path: '/informationCreate',
//       name: '门户信息新建',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/communication/information/informationCreate'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     }, {
//       path: '/messageTemplate',
//       name: '消息管理/消息模板',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/communication/messageAdmin/messageTemplate'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },
//     //后台管理
//     {
//       path: '/typeAdmin',
//       name: '分类管理',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/typeAdmin'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },{
//       path: '/videoAdmin',
//       name: '视频管理',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/videoAdmin'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },{
//       path: '/contentAdmin',
//       name: '内容管理',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/contentAdmin'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },{
//       path: '/pic_news',
//       name: '图文内容',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/pic_news'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },{
//       path: '/integral_set',
//       name: '积分设置',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/integral_set'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },{
//       path: '/integral_select',
//       name: '积分查询',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/integral_select'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     },{
//       path: '/integral_detail',
//       name: '积分明细',
//       component: () => import ( /* webpackChunkName: "page" */ '@/views/backstage/integral_detail'),
//       meta: {
//         keepAlive: true,
//         isTab: false,
//         isAuth: false
//       },
//     }
//   ]
// });
