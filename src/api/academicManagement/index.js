import request from '@/utils/request'
/*学生管理 start*/
//学生信息查询
export function getXszhxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getXszhxx',
    method: 'post',
    data: object
  })
}
// 导出
export function dcXszhxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/dcXszhxx`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 设置住宿
export function szzxxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/szzxxx',
    method: 'post',
    data: object
  })
}
// 学生一张表
// 自然详细信息 旧
// export function findListByMap(object) {
//   return request({
//     url: '/api/xggl/yhglBXsjcxx/findListByMap',
//     method: 'post',
//     data: object
//   })
// }
// 自然详细信息 新
export function findListByMap(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getXsjcxx',
    method: 'post',
    data: object
  })
}
// 自然详细信息 编辑
export function updateByMap(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/updateByMap',
    method: 'post',
    data: object
  })
}
// 重置
export function czxsxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/czxsxx/${object.xsBm}`,
    method: 'get'
  })
}
// 通过 驳回
export function spxsxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/spxsxx',
    method: 'post',
    data: object
  })
}
// 政治面貌
// 政治面貌查询
export function xgFindList(object) {
  return request({
    url: '/api/xggl/tyrzBZzmmsq/findList',
    method: 'post',
    data: object
  })
}
// 政治面貌申请
export function xgInsertList(object) {
  return request({
    url: '/api/xggl/tyrzBZzmmsq/insertList',
    method: 'post',
    data: object
  })
}
// 政治面貌 编辑 删除 通过 驳回
export function zzPpdateByMap(object) {
  return request({
    url: '/api/xggl/tyrzBZzmmsq/updateByMap',
    method: 'post',
    data: object
  })
}
// 学籍信息
export function getXjxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getXjxx',
    method: 'post',
    data: object
  })
}
// 学生信息
// 成绩信息头部
export function getCjtb(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getCjtb`,
    method: 'post',
    data: object
  })
}
// 成绩信息
export function getGrCjxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getGrCjxx`,
    method: 'post',
    data: object
  })
}
// 处分信息
export function getCfxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getCfxx`,
    method: 'post',
    data: object
  })
}
// 请假信息
export function getQjxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getQjxx`,
    method: 'post',
    data: object
  })
}
// 保险
export function getBxxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getBxxx`,
    method: 'post',
    data: object
  })
}
// 社会工作
export function getShxx(object) {
  return request({
    url: `/api/xggl/tyrzBShgz/findList`,
    method: 'post',
    data: object
  })
}
// 社会工作申请
export function shInsertList(object) {
  return request({
    url: `/api/xggl/tyrzBShgz/insertList`,
    method: 'post',
    data: object
  })
}
// 社会工作编辑 删除 通过 驳回
export function shUpdateByMap(object) {
  return request({
    url: `/api/xggl/tyrzBShgz/updateByMap`,
    method: 'post',
    data: object
  })
}
// 住宿信息
export function queryXszsxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/queryXszsxx`,
    method: 'post',
    data: object
  })
}
// 资助信息
// info
export function getZzxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getZzxx/${object.xsBm}`,
    method: 'get'
  })
}
// 贷款
export function getXsDk(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXsDk/${object.xsBm}`,
    method: 'get'
  })
}
// 学生基层就业补偿代偿
export function getXsJcjyBcdc(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXsJcjyBcdc/${object.xsBm}`,
    method: 'get'
  })
}
// 学生应征入伍代偿补偿
export function getXsYzrwBcdc(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXsYzrwBcdc/${object.xsBm}`,
    method: 'get'
  })
}
// 学生应征入伍代偿补偿
export function getXsTyfxBcdc(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXsTyfxBcdc/${object.xsBm}`,
    method: 'get'
  })
}
// 补助信息
export function getXsBz(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXsBz/${object.xsBm}`,
    method: 'get'
  })
}
// 心理信息
export function queryXsxlxx(object) {
  return request({
    url: `/api/xggl/bjgl/queryXsxlxx`,
    method: 'post',
    data: object
  })
}
// 心理获取用户名
export function queryBjbmByToken(object) {
  return request({
    url: `/api/xggl/bjgl/queryBjbmByToken`,
    method: 'get'
  })
}
// 就业信息
export function getJyxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getJyxx`,
    method: 'post',
    data: object
  })
}
// 活动信息
export function queryXshdxx(object) {
  return request({
    url: `/api/xggl/bjgl/queryXshdxx`,
    method: 'post',
    data: object
  })
}
// 获奖
export function getHjxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/hjxx`,
    method: 'post',
    data: object
  })
}
//消费信息 info
export function getXfxxTb(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXfxxTb`,
    method: 'post',
    data: object
  })
}
//消费信息
export function getXfxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXfxx`,
    method: 'post',
    data: object
  })
}
// 图书借阅 info
export function getTsjyTb(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getTsjyTb`,
    method: 'post',
    data: object
  })
}
// 图书借阅
export function getTsjy(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getTsjy`,
    method: 'post',
    data: object
  })
}
// 导师心语
export function queryXsDsxy(object) {
  return request({
    url: `/api/xggl/bjgl/queryXsDsxy`,
    method: 'post',
    data: object
  })
}
//获取学年度
export function xgGetXnd() {
  return request({
    url: `/api/xggl/tyrzBShgz/getXnd`,
    method: 'get'
  })
}
// 根据学年度 获取学期
export function getXqByXndBm(object) {
  return request({
    url: `/api/xggl/tyrzBShgz/getXqByXndBm/${object}`,
    method: 'get'
  })
}
//获取班级
export function xgGetAllClass(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getAllClass?nj=${object.bm}`,
    method: 'get'
  })
}
/*学生管理 end*/
/*班级管理 start*/
// 班级查询
export function queryBjList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjList',
    method: 'post',
    data: object
  })
}
// 导出班级信息
export function exportBjList(object) {
  return request({
    url: `/api/xggl/bjgl/exportBjList`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 班级一张表
// 班级基础信息
export function queryBjInfo(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjInfo',
    method: 'post',
    data: object
  })
}
// 更新班级宣言
export function updateBjxy(object) {
  return request({
    url: '/api/xggl/bjgl/updateBjxy',
    method: 'post',
    data: object
  })
}
// 更新图片
export function bjImgUpload(object) {
  return request({
    url: '/api/xggl/bjgl/bjImgUpload',
    method: 'post',
    data: object
  })
}
//班委信息
export function queryBjbwxxList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjbwxxList',
    method: 'post',
    data: object
  })
}
// 选择学生
export function queryBjXsList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjXsList',
    method: 'post',
    data: object
  })
}
// 班委新建
export function insertBjbw(object) {
  return request({
    url: '/api/xggl/bjgl/insertBjbw',
    method: 'post',
    data: object
  })
}
// 班委编辑
export function updateBjbw(object) {
  return request({
    url: '/api/xggl/bjgl/updateBjbw',
    method: 'post',
    data: object
  })
}
// 班委删除
export function deleteBjbw(object) {
  return request({
    url: '/api/xggl/bjgl/deleteBjbw',
    method: 'post',
    data: object
  })
}
//学生信息
export function queryBjxsxxList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjxsxxList',
    method: 'post',
    data: object
  })
}
// 宿舍信息
export function querySsxxList(object) {
  return request({
    url: '/api/xggl/bjgl/querySsxxList',
    method: 'post',
    data: object
  })
}
// 成绩信息
export function queryBjCjList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjCjList',
    method: 'post',
    data: object
  })
}
// 挂科信息
export function queryBjgkList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjgkList',
    method: 'post',
    data: object
  })
}
// 挂科人员
export function queryBjgkry(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjgkry',
    method: 'post',
    data: object
  })
}
// 宿舍人数信息
export function getSsxxBj(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getSsxxBj/${object.fjbm}/${object.bjbm}`,
    method: 'get'
  })
}
// 班级处分情况
export function queryBjcfList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjcfList',
    method: 'post',
    data: object
  })
}
// 处分人数详细
export function queryBjcfInfo(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjcfInfo',
    method: 'post',
    data: object
  })
}
// 社会工作
export function queryShgzList(object) {
  return request({
    url: '/api/xggl/bjgl/queryShgzList',
    method: 'post',
    data: object
  })
}
// 班级活动信息
export function queryBjhdxxList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjhdxxList',
    method: 'post',
    data: object
  })
}
// 班级活动
// 班级活动列表 教师
export function queryBjhdJsList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjhdJsList',
    method: 'post',
    data: object
  })
}
// 班级活动列表 学生
export function queryBjhdList(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjhdList',
    method: 'post',
    data: object
  })
}
// 班级活动审核导出
export function exportBjhdshList(object) {
  return request({
    url: `/api/xggl/bjgl/exportBjhdshList`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 班级活动导出
export function exportBjhdList(object) {
  return request({
    url: `/api/xggl/bjgl/exportBjhdList`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 班级活动 新建
export function bjhdsb(object) {
  return request({
    url: '/api/xggl/bjgl/bjhdsb',
    method: 'post',
    data: object
  })
}
// 班级活动 编辑
export function bjhdUpdate(object) {
  return request({
    url: '/api/xggl/bjgl/bjhdUpdate',
    method: 'post',
    data: object
  })
}
// 班级活动 删除
export function deleteBjhd(object) {
  return request({
    url: `/api/xggl/bjgl/deleteBjhd/${object}`,
    method: 'get'
  })
}
// 班级活动 通过
export function passBjhd(object) {
  return request({
    url: `/api/xggl/bjgl/passBjhd/${object}`,
    method: 'get'
  })
}
// 班级活动 驳回
export function refuseBjhd(object) {
  return request({
    url: `/api/xggl/bjgl/refuseBjhd/${object}`,
    method: 'get'
  })
}
// 导师心语
export function queryBjDsxyTb(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjDsxyTb',
    method: 'post',
    data: object
  })
}
export function queryBjDsxy(object) {
  return request({
    url: '/api/xggl/bjgl/queryBjDsxy',
    method: 'post',
    data: object
  })
}
//班级展示 管理
// 班级展示列表
export function bjzsList(object) {
  return request({
    url: '/api/xggl/xgglBBjzs/bjzsList',
    method: 'post',
    data: object
  })
}
// 班级展示 新建 存草稿
export function saveDraftsBjzs(object) {
  return request({
    url: '/api/xggl/xgglBBjzs/saveDraftsBjzs',
    method: 'post',
    data: object
  })
}
// 班级展示 新建 发布
export function saveBjzs(object) {
  return request({
    url: '/api/xggl/xgglBBjzs/saveBjzs',
    method: 'post',
    data: object
  })
}
// 班级展示 发布
export function publishBjzs(object) {
  return request({
    url: `/api/xggl/xgglBBjzs/publishBjzs/${object}`,
    method: 'get'
  })
}
// 班级展示 撤销
export function revocationBjzs(object) {
  return request({
    url: `/api/xggl/xgglBBjzs/revocationBjzs/${object}`,
    method: 'get'
  })
}
// 班级展示 删除
export function deleteBjzs(object) {
  return request({
    url: '/api/xggl/xgglBBjzs/deleteBjzs',
    method: 'post',
    data: object
  })
}
// 班级展示 编辑
export function updateBjzs(object) {
  return request({
    url: '/api/xggl/xgglBBjzs/updateBjzs',
    method: 'post',
    data: object
  })
}
// 班委查询
// 职位
export function queryZwList(object) {
  return request({
    url: `/api/xggl/bjgl/queryZwList`,
    method: 'get'
  })
}
// 班委查询 table
export function querybwxxFdyList(object) {
  return request({
    url: '/api/xggl/bjgl/querybwxxFdyList',
    method: 'post',
    data: object
  })
}
// 班委导出
export function exportBwxxFdyList(object) {
  return request({
    url: `/api/xggl/bjgl/exportBwxxFdyList`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
/*班级管理 end*/

/*宿舍管理 start*/
// 宿舍信息查询
export function getAllSsxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getAllSsxx',
    method: 'post',
    data: object
  })
}
// 导出
export function dcAllSsxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/dcAllSsxx`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 宿舍头部info
export function getSsjcxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getSsjcxx/${object.bm}`,
    method: 'get'
  })
}
// 宿舍基础信息
export function getSsxx(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getSsxx/${object.bm}`,
    method: 'get'
  })
}
// 设置舍长
export function szsz(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/szsz',
    method: 'post',
    data: object
  })
}
// 处分情况
export function getSsCfxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getSsCfxx',
    method: 'post',
    data: object
  })
}
// 成绩头部
export function getSsCjtb(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getSsCjtb',
    method: 'post',
    data: object
  })
}
// 挂科人数头部
export function getGktb(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getGktb',
    method: 'post',
    data: object
  })
}
// 挂科人数
export function getGkry(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getGkry',
    method: 'post',
    data: object
  })
}
// 处分人数
export function getSsCfryxx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getSsCfryxx',
    method: 'post',
    data: object
  })
}
// 卫生情况
export function wsFindList(object) {
  return request({
    url: '/api/xggl/tyrzGlSsPf/findList',
    method: 'post',
    data: object
  })
}
// 导出卫生情况
export function dcPfxx(object) {
  return request({
    url: `/api/xggl/tyrzGlSsPf/dcPfxx`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 评分查询
export function getPfxq(object) {
  return request({
    url: '/api/xggl/tyrzGlSsPf/getPfxq',
    method: 'post',
    data: object
  })
}
// 导出详情
export function dcPfxq(object) {
  return request({
    url: `/api/xggl/tyrzGlSsPf/dcPfxq`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 宿舍人员分配管理
// 所在校区
export function xgGetXq(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getXq`,
    method: 'get'
  })
}
// 导出
export function dcryfp(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/dcryfp`,
    method: 'POST',
    data: object,
    responseType: 'blob'
  })
}
// 宿舍楼
export function getJzw(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getJzw/${object.bm}`,
    method: 'get'
  })
}
// 宿舍楼层
export function getLc(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getLc/${object.bm}`,
    method: 'get'
  })
}
// 查询列表
export function getryfp(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getryfp',
    method: 'post',
    data: object
  })
}
// 宿舍分配树
export function getSsTree(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getSsTree/${object}`,
    method: 'get'
  })
}
// 获取剩余床位
export function getSscwTree(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getSyCwh/${object}`,
    method: 'get'
  })
}
// 新建床位
export function insertCwXx(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/insertCwXx',
    method: 'post',
    data: object
  })
}
// 移除床位
export function yccw(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/yccw',
    method: 'post',
    data: object
  })
}
// 打印
export function dycq(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/dycq/${object}`,
    method: 'get'
  })
}
/*宿舍管理 end*/

/*common*/
// 权限
export function queryJurisdiction(object) {
  return request({
    url: `/api/xggl/bjgl/queryJurisdiction`,
    method: 'get'
  })
}
// 是否是辅导员
export function queryUserIsBjFdy(object) {
  return request({
    url: '/api/xggl/bjgl/queryUserIsBjFdy',
    method: 'post',
    data: object
  })
}
// 组织机构 宿舍 1 班级 2 学生 3
export function xgZzjgTree(object) {
  return request({
    url: `/api/xggl/yhglBXsjcxx/getZzjgTree/${object}`,
    method: 'get'
  })
}

// 获取所有年级
export function xgFindNjs(object) {
  return request({
    url: '/api/tyrz/nj/findNjs',
    method: 'post',
    data: object
  })
}
// 获取学生信息
export function getUsrMseeage() {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getUsrMseeage',
    method: 'get'
  })
}
// 行政区列表
export function xzqList(object) {
  return request({
    url: '/api/xggl/yhglBXsjcxx/getXzq',
    method: 'get'
  })
}

//市
export function xgglBXzqbmCs(object) {
  return request({
    url: `/api/xsgl/xsglBXzqbm/cs/${object}`,
    method: 'get'
  })
}

// 学院
export function cxFdyXy() {
  return request({
    url: `/api/xggl/yhglBXsjcxx/cxFdyXy`,
    method: 'get'
  })
}
