import request from '@/utils/request'

//学工 - 用户信息
export function findXgJxkYhInfo(obj) {
  return request({
    url: `/api/tyrz/jxgl/findYhInfo`,
    method: 'get',
  })
}

//学工 - 用户获奖信息
export function findXgJxkYhPrizeInfo(obj) {
  return request({
    url: `/api/tyrz/hjgl/findYhInfo`,
    method: 'get',
  })
}

// 奖项录入 新建奖项
export function saveJxglDate(obj) {
  return request({
    url: '/api/tyrz/jxgl/saveJxglDate',
    method: 'post',
    data: obj
  })
}

// 奖项录入 查询列表
export function findJxglJxlrList(obj) {
  return request({
    url: '/api/tyrz/jxgl/findJxglList',
    method: 'post',
    data: obj
  })
}

// //奖项录入 删除
export function deleteJxglData(obj) {
  return request({
    url:`/api/tyrz/jxgl/deleteJxglData/${obj}`,
    method: 'get',
  })
}

// 奖项录入 详情回显
export function findJxglData(obj) {
  return request({
    url:`/api/tyrz/jxgl/findJxglData/${obj}`,
    method: 'get',
  })
}

// 奖项录入 修改
export function modifyJxglDate(obj) {
  return request({
    url: '/api/tyrz/jxgl/modifyJxglDate',
    method: 'post',
    data: obj
  })
}
// 奖项审核 通过驳回
export function modifyJxglShzt(obj) {
  return request({
    url: '/api/tyrz/jxgl/modifyJxglShzt',
    method: 'post',
    data: obj
  })
}


// 奖项审核 合并奖项
export function mergeJxglDate(obj) {
  return request({
    url: '/api/tyrz/jxgl/mergeJxglDate',
    method: 'post',
    data: obj
  })
}

// 奖项审核 列表
export function findJxglListAll(obj) {
  return request({
    url: '/api/tyrz/jxgl/findJxglListAll',
    method: 'post',
    data: obj
  })
}

// 获奖情况录入 新建获奖
export function saveHjglDate(obj) {
  return request({
    url: '/api/tyrz/hjgl/saveHjglDate',
    method: 'post',
    data: obj
  })
}

// 获奖情况录入 修改获奖
export function modifyHjglDate(obj) {
  return request({
    url: '/api/tyrz/hjgl/modifyHjglDate',
    method: 'post',
    data: obj
  })
}

// 获奖情况录入 删除获奖
export function deleteHjglDataSituation(obj) {
  return request({
    url: `/api/tyrz/hjgl/deleteHjglData/${obj}`,
    method: 'get',
  })
}

// 获奖情况录入 获奖详情
export function findHjglDataDetails(obj) {
  return request({
    url: `/api/tyrz/hjgl/findHjglData/${obj}`,
    method: 'get',
  })
}

// 获奖情况录入 导出
export function findHjglXgExcel(obj) {
  return request({
    url: '/api/tyrz/hjgl/findHjglExcel',
    method: 'post',
    data: obj,
    responseType: "blob"
  })
}


// 获奖情况录入 查询列表
export function findJxglListSituation(obj) {
  return request({
    url: '/api/tyrz/hjgl/findHjglList',
    method: 'post',
    data: obj
  })
}

// 获奖情况查询 查询列表
export function findJxglListAllPrize(obj) {
  return request({
    url: '/api/tyrz/hjgl/findHjglListAll',
    method: 'post',
    data: obj,
  })
}

//获奖情况审核
export function modifyHjglShztExamine(obj) {
  return request({
    url: '/api/tyrz/hjgl/modifyHjglShzt',
    method: 'post',
    data: obj
  })
}


