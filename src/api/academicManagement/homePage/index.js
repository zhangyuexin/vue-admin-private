import request from '@/utils/request'

//  根据站内信类别查看站内信
export function getYhZnx(object) {
  return request({
    url: '/api/tytx/tytxZnx/getYhZnx',
    method: 'get',
    params: object
  })
}
//  查看站内信详情
export function getYhZnxXq(object) {
  return request({
    url: '/api/tytx/tytxZnx/getYhZnxXq',
    method: 'get',
    params: object,
    type:'resultful'
  })
}
//  批量阅读站内信
export function ydGrZnx(object) {
  return request({
    url: '/api/tytx/tytxZnx/ydGrZnx',
    method: 'post',
    data: object
  })
}
//  查询常用功能列表
export function findCygnlb(object) {
  return request({
    url: '/api/tymh/cygngl/findCygnlb',
    method: 'post',
    data: object
  })
}
//  查询服务列表
export function findFwlb(object) {
  return request({
    url: '/api/tymh/fwgl/findFwlb',
    method: 'post',
    data: object
  })
}
//  修改服务列表
export function updateFwlb(object) {
  return request({
    url: '/api/tymh/fwgl/updateFwlb',
    method: 'post',
    data: object
  })
}

export function findXgxwData(object) {
  return request({
    url: '/api/xggl/xgxw/list',
    method: 'get',
    params: object
  })
}
//  查询常用功能详情
export function findCygnxq(object) {
  return request({
    url: '/api/tymh/cygngl/findCygnxq',
    method: 'post',
    data: object
  })
}
//  查询常用功能详情
export function findTsxsyj(object) {
  return request({
    url: '/api/xggl/sy/findTsxsyj',
    method: 'post',
    data: object
  })
}
