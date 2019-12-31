import request from "@/utils/request";
//评奖评优
//查询用户身份
export function pjryglFindYhSf() {
  return request({
    url: `/api/xggl/pjrygl/findYhSf`,
    method: "get"
  });
}
//评奖人员管理

//查询学院组织机构树
export function findPjryglTree() {
  return request({
    url: `/api/xggl/pjrygl/findPjryglTree`,
    method: "get"
  });
}
//查询年级专业列表
export function pjryglFindNjZyList(object) {
  return request({
    url: "/api/xggl/pjrygl/findNjZyList",
    method: "post",
    data: object
  });
}
//初始化学年度评奖人员
export function pjryglInitXndPjry(xnd) {
  return request({
    url: `/api/xggl/pjrygl/initXndPjry/${xnd}`,
    method: "post"
  });
}
//查询学院列表
export function pjryglFindXyList(object) {
  return request({
    url: "/api/xggl/pjrygl/findXyList",
    method: "post",
    data: object
  });
}
//查询评奖人员列表
export function findPjryList(object) {
  return request({
    url: "/api/xggl/pjrygl/findPjryList",
    method: "post",
    data: object
  });
}
//导入模板
export function pjryglExportTemplate(obj) {
  return request({
    url: "/api/xggl/pjrygl/exportTemplate",
    method: "get",
    data: obj,
    responseType: "blob"
  });
}
//导出评奖人员信息
export function pjryglExportPjry(obj) {
  return request({
    url: `/api/xggl/pjrygl/exportPjry`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//编辑评奖人员信息
export function pjryglEditPjryxx(object) {
  return request({
    url: "/api/xggl/pjrygl/editPjryxx",
    method: "post",
    data: object
  });
}
//查询动态年级名称
export function pjryglFindNjmcList() {
  return request({
    url: "/api/xggl/pjrygl/findNjmcList",
    method: "get"
  });
}
//奖项发布
//查询校级设置
export function findJxfbsz(bm) {
  return request({
    url: `/api/xggl/jxfb/findJxfbsz/${bm}`,
    method: "get"
  });
}

//评奖评优奖项库
//查询列表
export function findJxs(object) {
  return request({
    url: "/api/xggl/jxk/findJxs",
    method: "post",
    data: object
  });
}
//新增奖项
export function saveJx(object) {
  return request({
    url: "/api/xggl/jxk/saveJx",
    method: "post",
    data: object
  });
}
//修改奖项
export function updateJx(object) {
  return request({
    url: "/api/xggl/jxk/updateJx",
    method: "post",
    data: object
  });
}
//删除奖项
export function deleteJx(bm) {
  return request({
    url: `/api/xggl/jxk/deleteJx/${bm}`,
    method: "delete"
  });
}
/**
 *
 * @param {*} object
 * 查询奖项发布列表
 * mbbm:模板编码
 * jxmc:奖项名称
 * xnd:学年度
 * jxlx:奖项类型
 * ssbm:所属部门
 * pageNum:页码
 * pageSize:页面展示数
 */
export function findJxfb(object) {
  return request({
    url: "/api/xggl/jxfb/findJxfb",
    method: "post",
    data: object
  });
}

//查询全部奖项
export function findJxAll() {
  return request({
    url: "/api/xggl/jxk/findJxAll",
    method: "get"
  });
}

//查询全部模板
export function findMbAll(object) {
  return request({
    url: "/api/xggl/bPjpyMbk/findAll",
    method: "post",
    data: object
  });
}

//新增奖项发布
/**
 *
 * @param {*} object
 * xnd //学年度
  jxBm //奖项编码
  jxmc //奖项名称
  mbbm //模板编码
  jxly //
  jxlx //奖项类型
  ssbm //所属部门
  jlrs //奖励人数
  date //
  pjkssj //评奖开始时间
  pjjssj //评奖结束时间
  fwdx //服务对象
  fbzt //发布状态  0:保存 1:发布
  pjfw: '全校', //评奖范围
  pjfwsj //评奖范围数据
  fpfs //分配方式  0：比例  1：名额
  fpfsList //分配方式数据
 */
export function saveJxfb(object) {
  return request({
    url: "/api/xggl/jxfb/saveJxfb",
    method: "post",
    data: object
  });
}
export function updateJxfb(object) {
  return request({
    url: "/api/xggl/jxfb/updateJxfb",
    method: "post",
    data: object
  });
}

//查询奖项发布详情
export function findJxfbxq(bm) {
  return request({
    url: `/api/xggl/jxfb/findJxfbxq/${bm}`,
    method: "get"
  });
}

//查询各学院人数
export function findXyrs(xnd) {
  return request({
    url: `/api/xggl/jxfb/findXyrs/${xnd}`,
    method: "get"
  });
}
//查询奖项发布所属部门下拉选
export function findJxfbSsbmDropList() {
  return request({
    url: `/api/xggl/jxfb/findJxfbSsbmDropList`,
    method: "get"
  });
}
//删除奖项发布
export function deleteJxfb(bm) {
  return request({
    url: `/api/xggl/jxfb/deleteJxfb/${bm}`,
    method: "delete"
  });
}
//修改发布状态
export function editFbzt(bm) {
  return request({
    url: `/api/xggl/jxfb/editFbzt/${bm}`,
    method: "post"
  });
}
//保存奖项发布设置
/**
 *
 * @param {*} object
 * jxfbBm:奖项发布编码
 * gjjxjxjgsq: 国家奖学金校级公示期
  xxcjpm: 学习成绩排名
  xxcjzdpm: 学习成绩最低排名
  zhkpcjpm: 综合考评成绩排名
  zhkpcjzdpm: 综合考评成绩最低排名
  jxjqk:奖学金情况
  checked:打勾选项字符串
 */
export function saveJxfbsz(object) {
  return request({
    url: "/api/xggl/jxfb/saveJxfbsz",
    method: "post",
    data: object
  });
}
//导出奖项发布列表
export function jxfbExcelExport(obj) {
  return request({
    url: `/api/xggl/jxfb/excelExport`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//获取奖项等级集合
export function findJxdjs(bm) {
  return request({
    url: `/api/xggl/jxfb/findJxdjs/${bm}`,
    method: "get"
  });
}
//新增模板库
/**
 *
 * @param {*} object
 * mbmc:模板名称
  jxlx:奖项类型
  mb:模板
  ssbmbm:所属部门编码
  ssbmmc:所属部门名称
 */
export function saveBPjpyMbk(object) {
  return request({
    url: "/api/xggl/bPjpyMbk/saveBPjpyMbk",
    method: "post",
    data: object
  });
}
//编辑模板库
export function editBPjpyMbk(object) {
  return request({
    url: "/api/xggl/bPjpyMbk/editBPjpyMbk",
    method: "post",
    data: object
  });
}
//根据编码查询模板库
/**
 *
 * @param {*} object
 * bm
 */
export function findMBKEdit(object) {
  return request({
    url: "/api/xggl/bPjpyMbk/findEdit",
    method: "post",
    data: object
  });
}
//删除奖项库
export function delBPjpyMbk(object) {
  return request({
    url: "/api/xggl/bPjpyMbk/delBPjpyMbk",
    method: "post",
    data: object
  });
}
/**
 * 国家奖学金
 */
//查询过奖列表
export function findGjjxjfbList(object) {
  return request({
    url: "/api/xggl/gjjxj/findGjjxjfbList",
    method: "post",
    data: object
  });
}
//查询国家奖学金申请列表-学生列表
export function findGjjxjsqList(object) {
  return request({
    url: "/api/xggl/gjjxj/findGjjxjsqList",
    method: "post",
    data: object
  });
}
//查询国家奖学金申请列表-专业&年级列表
export function findGjjxjZyNjList(object) {
  return request({
    url: "/api/xggl/gjjxj/findNjZyList",
    method: "post",
    data: object
  });
}
//查询国家奖学金申请列表-学院列表
export function findGjjxjXyList(object) {
  return request({
    url: "/api/xggl/gjjxj/findXyList",
    method: "post",
    data: object
  });
}
//查询用户管理范围内的下拉选数据
export function findManagedDropDownList() {
  return request({
    url: "/api/xggl/pjrygl/findManagedDropDownList",
    method: "get"
  });
}
//通过-驳回-学生列表
export function checkGjjxjsq(object) {
  return request({
    url: "/api/xggl/gjjxj/checkGjjxjsq",
    method: "post",
    data: object
  });
}
//通过-驳回-专业&年级列表
export function checkZyNj(object) {
  return request({
    url: "/api/xggl/gjjxj/checkZyNj",
    method: "post",
    data: object
  });
}
//通过-驳回-学院列表
export function checkXy(object) {
  return request({
    url: "/api/xggl/gjjxj/checkXy",
    method: "post",
    data: object
  });
}
// 上报
export function reportGjjxjsq(object) {
  return request({
    url: "/api/xggl/gjjxj/reportGjjxjsq",
    method: "post",
    data: object
  });
}
// 归档
export function placeOnFile(object) {
  return request({
    url: "/api/xggl/gjjxj/placeOnFile",
    method: "post",
    data: object
  });
}
//修改列表数据的奖项等级
export function editJxdj(object) {
  return request({
    url: "/api/xggl/gjjxj/editJxdj",
    method: "post",
    data: object
  });
}
//国奖公示
export function gjjxjPublicity(object) {
  return request({
    url: "/api/xggl/gjjxj/publicity",
    method: "post",
    data: object
  });
}
//导出国家奖学金列表
export function gjjxjExportGjjxj(obj) {
  return request({
    url: `/api/xggl/gjjxj/exportGjjxj`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//导出国家奖学金申请列表
export function gjjxjExportGjjxjsq(obj) {
  return request({
    url: `/api/xggl/gjjxj/exportGjjxjsq`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//查询国家奖学金申请详情
export function gjjxjFindGjjxjsqxq(bm) {
  return request({
    url: `/api/xggl/gjjxj/findGjjxjsqxq/${bm}`,
    method: "get"
  });
}
/**
 *
 * 命名奖学金
 */
//查询命名奖学金列表
export function findMmjxjfbList(object) {
  return request({
    url: "/api/xggl/mmjxj/findMmjxjfbList",
    method: "post",
    data: object
  });
}
//查询命名奖学金申请列表--学生列表
export function findMmjxjsqList(object) {
  return request({
    url: "/api/xggl/mmjxj/findMmjxjsqList",
    method: "post",
    data: object
  });
}
//查询命名奖学金申请列表---专业&年级
export function findMmjxjNjZyList(object) {
  return request({
    url: "/api/xggl/mmjxj/findNjZyList",
    method: "post",
    data: object
  });
}
//查询命名奖学金申请列表--学院列表
export function mmjxjFindXyList(object) {
  return request({
    url: "/api/xggl/mmjxj/findXyList",
    method: "post",
    data: object
  });
}
//修改列表数据的奖项等级
export function mmjxjEditJxdj(object) {
  return request({
    url: "/api/xggl/mmjxj/editJxdj",
    method: "post",
    data: object
  });
}
//命名奖学金公示
export function mmjxjPublicity(object) {
  return request({
    url: "/api/xggl/mmjxj/publicity",
    method: "post",
    data: object
  });
}
//命名奖学金归档
export function mmjxjPlaceOnFile(object) {
  return request({
    url: "/api/xggl/mmjxj/placeOnFile",
    method: "post",
    data: object
  });
}
//命名奖学金申请上报
export function mmjxjReportMmjxjsq(object) {
  return request({
    url: "/api/xggl/mmjxj/reportMmjxjsq",
    method: "post",
    data: object
  });
}
//命名奖学金申请专业年级审核
export function mmjxjCheckZyNj(object) {
  return request({
    url: "/api/xggl/mmjxj/checkZyNj",
    method: "post",
    data: object
  });
}
//命名奖学金申请学院审核
export function mmjxjCheckXy(object) {
  return request({
    url: "/api/xggl/mmjxj/checkXy",
    method: "post",
    data: object
  });
}
//命名奖学金申请审核--学生列表
export function mmjxjCheckMmjxjsq(object) {
  return request({
    url: "/api/xggl/mmjxj/checkMmjxjsq",
    method: "post",
    data: object
  });
}
//命名奖学金详情
export function mmjxjFindMmjxjsqxq(bm) {
  return request({
    url: `/api/xggl/mmjxj/findMmjxjsqxq/${bm}`,
    method: "get"
  });
}
//导出命名奖学金申请列表
export function mmjxjExcelExport(obj) {
  return request({
    url: `/api/xggl/mmjxj/excelExport`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//导出命名奖学金列表
export function mmjxjExportMmjxj(obj) {
  return request({
    url: `/api/xggl/mmjxj/exportMmjxj`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}

/**
 * 校级奖学金
 */

//查询校级奖学金列表
export function findXjjxjfbList(object) {
  return request({
    url: "/api/xggl/xjpb/findXjjxjfbList",
    method: "post",
    data: object
  });
}
//查询辅导员校奖设置
export function findXjszInfo(object) {
  return request({
    url: "/api/xggl/xjszsp/findXjszInfo",
    method: "post",
    data: object
  });
}
//校级设置-暂存
export function xjszspTemprary(object) {
  return request({
    url: "/api/xggl/xjszsp/temporary",
    method: "post",
    data: object
  });
}
//校级设置学办主任提交
export function xjszspSubmitTemporary(object) {
  return request({
    url: "/api/xggl/xjszsp/submitTemporary",
    method: "post",
    data: object
  });
}
//查询副院长校奖设置列表
export function xjszspFindXjszFyz(jxfbBm) {
  return request({
    url: `/api/xggl/xjszsp/findXjszFyz?jxfbBm=${jxfbBm}`,
    method: "get"
  });
}
//查询学生管理科校奖设置列表
export function xjszspFindXjszXsglk(jxfbBm) {
  return request({
    url: `/api/xggl/xjszsp/findXjszXsglk?jxfbBm=${jxfbBm}`,
    method: "get"
  });
}
//校奖设置年级审核
export function xjszspCheckNj(object) {
  return request({
    url: "/api/xggl/xjszsp/checkNj",
    method: "post",
    data: object
  });
}
//校级奖学金归档
export function xjpbPlaceOnFile(object) {
  return request({
    url: "/api/xggl/xjpb/placeOnFile",
    method: "post",
    data: object
  });
}
//校奖设置学院审核
export function xjszspCheckXy(object) {
  return request({
    url: "/api/xggl/xjszsp/checkXy",
    method: "post",
    data: object
  });
}

//查询校奖评比人员列表
export function findXjpbList(object) {
  return request({
    url: "/api/xggl/xjpb/findXjpbList",
    method: "post",
    data: object
  });
}
//查询校奖评比学院列表
export function xjpbFindXyList(object) {
  return request({
    url: "/api/xggl/xjpb/findXyList",
    method: "post",
    data: object
  });
}
//查询校奖评比年级专业列表
export function xjpbFindNjZyList(object) {
  return request({
    url: "/api/xggl/xjpb/findNjZyList",
    method: "post",
    data: object
  });
}
//校奖评比奖项重拍
export function xjpbResortXjpb(object) {
  return request({
    url: "/api/xggl/xjpb/resortXjpb",
    method: "post",
    data: object
  });
}
//校奖评比申请专业年级审核
export function xjpbCheckZyNj(object) {
  return request({
    url: "/api/xggl/xjpb/checkZyNj",
    method: "post",
    data: object
  });
}
//校奖评比申请学院审核
export function xjpbCheckXy(object) {
  return request({
    url: "/api/xggl/xjpb/checkXy",
    method: "post",
    data: object
  });
}
//校奖评比申请审核--学生列表
export function xjpbCheckXjpb(object) {
  return request({
    url: "/api/xggl/xjpb/checkXjpb",
    method: "post",
    data: object
  });
}
//校级奖学金公示
export function xjpbPublicity(object) {
  return request({
    url: "/api/xggl/xjpb/publicity",
    method: "post",
    data: object
  });
}
//校级奖学金申请上报
export function xjpbReportXjjxjsq(object) {
  return request({
    url: "/api/xggl/xjpb/reportXjpb",
    method: "post",
    data: object
  });
}
//导出校级奖学金申请列表
export function xjpbExcelExport(obj) {
  return request({
    url: `/api/xggl/xjpb/excelExport`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//导出校级奖学金列表
export function xjpbExportXjjxj(obj) {
  return request({
    url: `/api/xggl/xjpb/exportXjjxj`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//修改列表数据的奖项等级
export function xjpbEditJxdj(object) {
  return request({
    url: "/api/xggl/xjpb/editJxdj",
    method: "post",
    data: object
  });
}
//校奖设置年级提交（学院）
export function xjszspSubmitNj(object) {
  return request({
    url: "/api/xggl/xjszsp/submitNj",
    method: "post",
    data: object
  });
}
//查询学生管理科校奖设置列表
export function xjszspFindXjszXq(bm) {
  return request({
    url: `/api/xggl/xjszsp/findXjszXq/${bm}`,
    method: "get"
  });
}
/**
 * 个人评优
 */
//查询个人评优列表
export function findGrpyfbList(object) {
  return request({
    url: "/api/xggl/grpy/findGrpyfbList",
    method: "post",
    data: object
  });
}
// 个人评优归档
export function grpyPlaceOnFile(object) {
  return request({
    url: "/api/xggl/grpy/placeOnFile",
    method: "post",
    data: object
  });
}
//查询个人评优申请列表--学生列表
export function findGrpysqList(object) {
  return request({
    url: "/api/xggl/grpy/findGrpysqList",
    method: "post",
    data: object
  });
}
//查询个人评优年级专业列表--年级专业列表
export function grpyFindNjZyList(object) {
  return request({
    url: "/api/xggl/grpy/findNjZyList",
    method: "post",
    data: object
  });
}
//查询个人评优学院列表--学院列表
export function grpyFindXyList(object) {
  return request({
    url: "/api/xggl/grpy/findXyList",
    method: "post",
    data: object
  });
}
//个人评优申请审核--学生列表
export function grpyCheckGrpysq(object) {
  return request({
    url: "/api/xggl/grpy/checkGrpysq",
    method: "post",
    data: object
  });
}
//个人评优申请学院审核--学院
export function grpyCheckXy(object) {
  return request({
    url: "/api/xggl/grpy/checkXy",
    method: "post",
    data: object
  });
}
//个人评优申请学院审核--专业年级
export function grpyCheckZyNj(object) {
  return request({
    url: "/api/xggl/grpy/checkZyNj",
    method: "post",
    data: object
  });
}
//个人评优申请上报
export function grpyReportGrpysq(object) {
  return request({
    url: "/api/xggl/grpy/reportGrpysq",
    method: "post",
    data: object
  });
}
//个人评优公示
export function grpyPublicity(object) {
  return request({
    url: "/api/xggl/grpy/publicity",
    method: "post",
    data: object
  });
}
//导出个人评优列表
export function grpyExportGrpy(obj) {
  return request({
    url: `/api/xggl/grpy/exportGrpy`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//导出个人评优申请列表
export function grpyExcelExport(obj) {
  return request({
    url: `/api/xggl/grpy/excelExport`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//查询个人评优申请详情
export function grpyFindGrpysqxq(bm) {
  return request({
    url: `/api/xggl/grpy/findGrpysqxq/${bm}`,
    method: "get"
  });
}
// 评奖评优申请部分
// 悦居寝室
// 首页信息查询
export function findJxfbbm() {
  return request({
    url: "/api/xggl/bYjqs/findJxfbbm",
    method: "post"
  });
}
// 表单页头部数据
export function findXsjbxx(object) {
  return request({
    url: "/api/xggl/bYjqs/findXsjbxx",
    method: "post",
    data: object
  });
}
// 表单申请
export function saveBYjqs(object) {
  return request({
    url: "/api/xggl/bYjqs/saveBYjqs",
    method: "post",
    data: object
  });
}

//获取全部专业
export function fwzxfwzxBFxjlfindZy(object) {
  return request({
    url: "/api/fwzx/fwzxBFxjl/findZy",
    method: "post",
    data: object
  });
}
//获取全部年级
export function tyrznjfindNjs(object) {
  return request({
    url: "/api/tyrz/nj/findNjs",
    method: "post",
    data: object
  });
}
//根据专业查询年级下拉选
export function pjryglFindNjDropList(bm) {
  return request({
    url: `/api/xggl/pjrygl/findNjDropList/${bm}`,
    method: "get"
  });
}
//根据专业编码和年级编码查询班级下拉选
export function pjryglFindBjDropList(zybm, njbm) {
  return request({
    url: `/api/xggl/pjrygl/findBjDropList/${zybm}/${njbm}`,
    method: "get"
  });
}
//下载公示模板
export function jxkExportGsTemplate(id) {
  return request({
    url: `/api/xggl/jxk/exportGsTemplate?id=${id}`,
    method: "get",
    responseType: "blob"
  });
}

//  评委列表
export function xjbjtbbGetPwList() {
  return request({
    url: "/api/xggl/xjbjtbb/getPwList",
    method: "get"
  });
}

//  岗位教工关联树
export function gwjgTree(object) {
  return request({
    url: "/api/sxjy/zzjg/gwjg/tree",
    method: "post",
    data: object
  });
}
//保存评委
export function xjbjtbbSavePw(object) {
  return request({
    url: "/api/xggl/xjbjtbb/savePw",
    method: "post",
    data: object
  });
}
//查询学生管理科列表
export function xjbjtbbFindXsglkXjbjtbbList(object) {
  return request({
    url: "/api/xggl/xjbjtbb/findXsglkXjbjtbbList",
    method: "post",
    data: object
  });
}
//评委评分
export function xjbjtbbSavePf(object) {
  return request({
    url: "/api/xggl/xjbjtbb/savePf",
    method: "post",
    data: object
  });
}
//修改系统外评委评分
export function xjbjtbbSaveXtwPwPf(pwbm, object) {
  return request({
    url: `/api/xggl/xjbjtbb/saveXtwPwPf/${pwbm}`,
    method: "post",
    data: object
  });
}
//查询评委评分
export function xjbjtbbGetPwPf(bm, pwbm) {
  return request({
    url: `/api/xggl/xjbjtbb/getPwPf/${bm}/${pwbm}`,
    method: "get"
  });
}
//导出候选班集体导入模板
export function xjbjtbbExportTemplate(obj) {
  return request({
    url: "/api/xggl/xjbjtbb/exportTemplate",
    method: "get",
    data: obj,
    responseType: "blob"
  });
}
//导入候选班集体
export function xjbjtbbImportHxbjt(obj) {
  return request({
    url: `/api/xggl/xjbjtbb/importHxbjt`,
    method: "post",
    data: obj,
    responseType: "blob"
  });
}
//查询评委身份先进班级体标兵列表
export function xjbjtbbFindPwXjbjtbbList(object) {
  return request({
    url: "/api/xggl/xjbjtbb/findPwXjbjtbbList",
    method: "post",
    data: object
  });
}
//查询评委评分-评分组
export function xjbjtbbGetPf(bm) {
  return request({
    url: `/api/xggl/xjbjtbb/getPf/${bm}`,
    method: "get"
  });
}

//查询该人员是否具有审批权限
export function gwGetSfkysp() {
  return request({
    url: `/api/tyrz/gw/getSfkysp`,
    method: "get"
  });
}
// 获取所有系统消息
export function grXtxxList(object) {
  return request({
    url: `/api/tytx/grtz/grXtxxList`,
    method: 'get',
  })
}
// 系统设置查询
export function findXtsz(object) {
  return request({
    url: '/api/tyrz/xtsz/findXtsz',
    method: 'get',
    params: object
  })
}
// 获取全部字典值 key: value
export function findTypeAndCodeAllList(object) {
  return request({
    url: '/api/dict/code/findTypeAndCodeAllList',
    method: 'get'
  })
}
// 根据应用编码获取菜单树不包含应用节点
export function findCdTreeListByYhBm(object) {
  return request({
    url: '/api/tyrz/cd/findCdTreeListByYhBm',
    method: 'post',
    data: object
  })
}
// 根据账号查询用户头像，真实姓名（提供登录）
export function findYhByYhm(object) {
  return request({
    url: '/api/yhgl/jgjcxx/findYhByYhm',
    method: 'post',
    data: object
  })
}
// 查询用户是否认证
export function authenticationQuery(object) {
  return request({
    url: '/api/tyrz/zh/authenticationQuery',
    method: 'post',
    data: object
  })
}
// 获取门户应用列表
export function findGrYys(object) {
  return request({
    url: `/api/tyrz/yy/findGrYys/${object}`,
    method: 'get',
  })
}
