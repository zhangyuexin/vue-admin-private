import request from '@/utils/request'
//班级展示

//查询班级展示列表
export function getSsbjzs(params) {
  return request({
    url: `/api/xggl/xgglBBjzs/getSsbjzs`,
    method: 'post',
    data: params
  })
}
//  政策文件分页列表
export function zcwjListPage(object) {
  return request({
    url: '/api/sxjy/sy/zcwj/listPage',
    method: 'post',
    data: object
  })
}
//  政策文件创建
export function zcwjCreate(object) {
  return request({
    url: '/api/sxjy/sy/zcwj/create',
    method: 'post',
    data: object
  })
}
//  政策文件删除
export function zcwjDel(object) {
  return request({
    url: '/api/sxjy/sy/zcwj/del',
    method: 'post',
    data: object
  })
}
//  政策文件更新
export function zcwjUpdate(object) {
  return request({
    url: '/api/sxjy/sy/zcwj/update',
    method: 'post',
    data: object
  })
}
//  政策文件查询详情
export function zcwjFind(object) {
  return request({
    url: '/api/sxjy/sy/zcwj/find',
    method: 'post',
    data: object
  })
}
//  查询岗位信息
export function findGwxx(object) {
  return request({
    url: '/api/tymh/sytj/findGwxx',
    method: 'get',
    params: object
  })
}

//班级点赞
export function bjzsdz(params) {
  return request({
    url: `/api/xggl/xgglBBjzs/bjzsdz/${params}`,
    method: 'get'
  })
}
//取消点赞
export function qxdz(params) {
  return request({
    url: `/api/xggl/xgglBBjzs/qxdz/${params}`,
    method: 'get'
  })
}
