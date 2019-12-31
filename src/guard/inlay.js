import {setStore, getStore, removeStore} from '@/utils/store'
import router from '../router/inlay'
import {getToken} from '@/utils/auth'
import {setTheme, setButtonResources} from '@/utils/util'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  // 设置顶部标题
  store.state.common.heightTitle = to.name
  // set页面按钮
  setButtonResources(to.path)
  // Token 校验验证
  setTheme(getStore({name: 'theme'}))
  // 默认跳转页面
  // let defaultActivePath = getStore({name: 'defaultActivePath', type: 'session'})
  let identity = store.state.user.userInfo.identity
  let path = (identity == 'JG' || identity == 'GM') ? '/portalTeacher' : '/portalStudent'
  let pathArray = ['/', '/home', '/getPassword', '/qrcodeRegister', path]
  if (pathArray.indexOf(to.path) != -1) {

    if (getToken()) {
      //如果cookie不存在，就显示弹窗
      // console.log('111111111111')
      // if(!store.state.user.certification){
      //   store.commit('SET_CERTIFICATION', true)
      // }
      next()
    } else {
      if (meta.isAuth === false) {
        next()
      } else {
        if (window.location.href.indexOf('/qrcodeRegister')!=-1){
          setStore({name: 'qrcodeRegister', content: true})
        }
        next('/')
      }
    }
  } else {
    next((getToken()) ? path : '/')
  }
})

router.afterEach(() => {

});
