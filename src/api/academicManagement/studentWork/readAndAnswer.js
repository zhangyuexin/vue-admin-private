import request from '@/utils/request'

//查询阅读问卷设置
export function getWenjuanSz(obj) {
  return request({
    url: `/api/tyrz/tyrzBQzydwjsz/getSz`,
    method: 'get'
  })
}

//保存阅读问卷设置
export function saveWenjuanSz(obj) {
  return request({
    url: '/api/tyrz/tyrzBQzydwjsz/saveSz',
    method: 'post',
    data: obj
  })
}

//查询当前学生是否需强制答题
export function getQzydwjByXs(obj) {
  return request({
    url: `/api/tyrz/tyrzBQzydwjsz/getQzydwjByXs`,
    method: 'get'
  })
}

//查看当前登录人部门(强制阅读)
export function getXgYdSsbm(obj) {
  return request({
    url: `/api/tyrz/tyrzBYdgl/getSsbm`,
    method: 'get'
  })
}

//新增或修改阅读
export function saveXgYdgl(obj) {
  return request({
    url: '/api/tyrz/tyrzBYdgl/saveYdgl',
    method: 'post',
    data: obj
  })
}

//阅读查看列表
export function getYdglList(obj) {
  return request({
    url: '/api/tyrz/tyrzBYdgl/getYdglList',
    method: 'post',
    data: obj
  })
}


//查看明细(强制阅读)
export function getYdgl(obj) {
  return request({
    url: `/api/tyrz/tyrzBYdgl/getYdgl/${obj}`,
    method: 'get'
  })
}

//阅读修改状态
export function updateFbzt(obj) {
  return request({
    url: '/api/tyrz/tyrzBYdgl/updateFbzt',
    method: 'post',
    data: obj
  })
}


//阅读删除
export function deleteScYdgl(obj) {
  return request({
    url: `/api/tyrz/tyrzBYdgl/scYdgl/${obj}`,
    method: 'get'
  })
}


//添加阅读量
export function addYdjl(obj) {
  return request({
    url: `/api/tyrz/tyrzBYdjl/addYdjl/${obj}`,
    method: 'get'
  })
}

//问卷查看列表
export function getWjglList(obj) {
  return request({
    url: '/api/tyrz/tyrzBWjgl/getWjglList',
    method: 'post',
    data: obj
  })
}

//新增或修改问卷
export function saveWjgl(obj) {
  return request({
    url: '/api/tyrz/tyrzBWjgl/saveWjgl',
    method: 'post',
    data: obj
  })
}

//问卷修改状态
export function updateWjglFbzt(obj) {
  return request({
    url: '/api/tyrz/tyrzBWjgl/updateFbzt',
    method: 'post',
    data: obj
  })
}


//查看明细(强制答题)
export function getWjgl(obj) {
  return request({
    url: `/api/tyrz/tyrzBWjgl/getWjgl/${obj}`,
    method: 'get'
  })
}

//问卷删除
export function scWjgl(obj) {
  return request({
    url: `/api/tyrz/tyrzBWjgl/scWjgl/${obj}`,
    method: 'get'
  })
}

