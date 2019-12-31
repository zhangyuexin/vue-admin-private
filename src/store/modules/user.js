import {setStore, getStore, removeStore} from '@/utils/store'
/*
* Vuex store 实例的根 state 对象
*/
const user = {
  state: {
    userData: '',// 用户权限信息
    userInfo: getStore({name: 'userInfo', type: 'session'}) || {
      userName: '',
      header: '',
      identity: ''
    },// 用户信息
    gwInfo: getStore({name: 'gwInfo', type: 'session'}) || {
      bm: '',
      gwmc: '',
      zzjggwmc: '',
    },// 岗位信息
    gwList:getStore({name: 'gwList', type: 'session'}) || [],
    tyrzUploadPortraitHeaders: getStore({name: 'tyrzUploadPortraitHeaders', type: 'session'}),// 图片上传请求头信息
    certification: getStore({name: 'certification', type: 'session'})
  },
  mutations: {
    SET_USER_DATA: (state, data) => {
      state.userData = data;
    },
    SET_UPLOAD_HEADER: (state, data) => {
      setStore({name: 'tyrzUploadPortraitHeaders', content: data, type: 'session'})
      state.tyrzUploadPortraitHeaders = data;
    },
    SET_USER_INFO: (state, data) => {
      setStore({name: 'userInfo', content: data, type: 'session'})
      state.userInfo = data
    },
    SET_CERTIFICATION: (state, data) => {
      setStore({name: 'certification', content: data, type: 'session'})
      state.certification = data
    },
    SET_GW_INFO: (state, data) => {
      setStore({name: 'gwInfo', content: data, type: 'session'})
      state.gwInfo = data
    },
    SET_GW_LIST: (state, data) => {
      setStore({name: 'gwList', content: data, type: 'session'})
      state.gwList = data
    },
  }
}

export default user


