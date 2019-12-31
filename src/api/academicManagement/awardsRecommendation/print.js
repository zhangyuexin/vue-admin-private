import request from '@/utils/request'
//快递单模板
export function findMbglByMbBs(str) {
  return request({
    url: `/api/xggl/dymb/findMbglByMbBs/${str}`,
    method: 'get'
  })
}
//保存快递单模板
export function saveMbgl(object) {
  return request({
    url: `/api/xggl/dymb/saveMbgl`,
    method: 'post',
    data: object
  })
}
//保存快递单模板
export function resetMbgl(object) {
  return request({
    url: `/api/xggl/dymb/resetMbgl`,
    method: 'post',
    data: object
  })
}
