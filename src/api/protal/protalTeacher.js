import request from '@/utils/request'
// 拉取当前用户所有最新的已发布的信息
// export function pullMhxx(object) {
//   return request({
//     url: `/api/tytx/grtz/pullMhxx`,
//     method: 'get',
//     data: object
//   })
// }
// 获取个人门户信息列表
// export function grMhxxList(object) {
//   return request({
//     url: '/api/tytx/grtz/grMhxxList',
//     method: 'post',
// 	data: object
//   })
// }
// 个人未读信息按发布类型分组统计
export function grWdxx(object) {
  return request({
    url: `/api/tytx/grtz/grWdxx`,
    method: 'get',
    data: object
  })
}

// 根据编码查询一条门户信息
export function ydxx(object) {
  return request({
    url: `/api/tytx/grtz/ydxx/${ object }`,
    method: 'get',
    data: object
  })
}

// 根据编码查询一条门户信息
// export function findMhxxByBm(object) {
//   return request({
//     url: `/api/tytx/mhxx/findMhxxByBm/${ object }`,
//     method: 'get',
//     data: object
//   })
// }


