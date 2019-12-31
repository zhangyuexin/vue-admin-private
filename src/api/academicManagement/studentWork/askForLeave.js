import request from '@/utils/request'
//学生请假信息
export function getFindStudentls() {
  return request({
    url: `/api/fwzx/xsqj/findXsjcxxAtXsqj`,
    method: 'get'
  })
}
//提交请假信息申请
export function addFindStudentls(obj) {
  return request({
    url: `/api/fwzx/xsqj/saveXsqjForm`,
    method: 'post',
    data: obj
  })
}
// 学生管理 请假信息查询 教工
export function findXsqjTableListJG(object) {
  return request({
    url: '/api/fwzx/xsqj/findXsqjTableListJG',
    method: 'post',
    data: object
  })
}

// 学生管理 请假信息查询 学生
export function findXsqjTableListXS(object) {
  return request({
    url: '/api/fwzx/xsqj/findXsqjTableListXS',
    method: 'post',
    data: object
  })
}

// 学生管理 请假驳回 信息详情
export function findXsqjDetailByBm(object) {
  return request({
    url: `/api/fwzx/xsqj/findXsqjDetailByBm/${ object}`,
    method: 'get',
  })
}

// 学生管理 请假驳回 信息详情
export function reportingXsqjForm(object) {
  return request({
    url: '/api/fwzx/xsqj/reportingXsqjForm',
    method: 'post',
    data: object
  })
}

// 学生管理 学期注册列表
export function findXnzcListByAll(object) {
  return request({
    url: '/api/tyrz/xnzc/findXnzcListByAll',
    method: 'post',
    data: object
  })
}


// 学生管理 学期 启动注册
export function startXnzcData(object) {
  return request({
    url: '/api/tyrz/xnzc/startXnzcData',
    method: 'post',
    data: object
  })
}

// 学生管理 学期 一键注册
export function yjzcSetData(object) {
  return request({
    url: '/api/tyrz/xnzc/yjzcSetData',
    method: 'post',
    data: object
  })
}

// 学生管理 学期 注册
export function chackSetData(object) {
  return request({
    url: '/api/tyrz/xnzc/chackSetData',
    method: 'post',
    data: object
  })
}

// 学生管理 学期 注册导出
export function findXnzcXgExcel(object) {
  return request({
    url: '/api/tyrz/xnzc/findXnzcExcel',
    method: 'post',
    data: object,
    responseType: "blob"
  })
}


// 学生管理 当前学期
export function findDqXgXqXnd(object) {
  return request({
    url: '/api/fwzx/lxtj/findXqXnd',
    method: 'post',
    data: object,
  })
}



