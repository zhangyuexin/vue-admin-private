import request from '@/utils/request'

export function userNameLogin(object) {
  return request({
    url: '/api/auth/oauth/token',
    method: 'post',
    params: object
  })
}

//正式环境
// export function userNameLogin(object) {
//   return request({
//     url: 'http://219.216.96.219:8802/api/auth/oauth/token',
//     method: 'post',
//     params: object
//   })
// }
//正式环境


// export function sendActivateSms(object) {
//   return request({
//     url: '/api/tytx/sms/sendActivateSms',
//     method: 'get',
//     params: object
//   })
// }
// 保存第一次登录修改手机号的认证信息
// export function saveYhActivate(object) {
//   return request({
//     url: '/api/yhgl/yhActivate/saveYhActivate',
//     method: 'post',
//     params: object
//   })
// }
