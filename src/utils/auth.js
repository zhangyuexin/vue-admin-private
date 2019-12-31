import {setStore, getStore, removeStore} from '@/utils/store'

// 获取accessToken
export function getToken() {
  let accessToken = Cookies.get('accessToken')
  if (accessToken && accessToken != undefined) {
    return accessToken
  } else if (getStore({name: 'userData'})) {
    return getStore({name: 'userData'}).access_token
  }
}

// 获取accessToken
export function getappliid() {
  return getStore({name: 'applicationId', type: 'session'})
}

// 清空Cookie
export function removeCookies() {
  if (location.href.indexOf('localhost') != -1) {
    Cookies.set('accessToken', '', {expires: -1})
    Cookies.set('userName', '', {expires: -1})
  } else {
    let domain = location.href.split('/')[2]
    domain = '.' + domain.split('.')[1] + '.' + domain.split('.')[2]
    Cookies.set('accessToken', '', {expires: -1, domain: domain})
    Cookies.set('userName', '', {expires: -1, domain: domain})
  }
}
