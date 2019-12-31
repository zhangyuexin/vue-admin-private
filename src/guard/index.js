import {setStore, getStore, removeStore} from '@/utils/store'
import router from '../router/index'
import {getToken} from '@/utils/auth'
import {setTheme, setButtonResources,getHashParameters,getHashParameter} from '@/utils/util'
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
    if (getToken()) {
      next()
    } else {
      console.log(meta)
      if (meta.isAuth === false) {
        next()
      } else {
        if (window.location.href.indexOf('/qrcodeRegister')!=-1){
          // console.log(window.location.href,getHashParameter('hdbm'),'window.location.href1112223333 ')
          setStore({name: 'qrcodeRegister', content: {
                type:true,
                hdbm:getHashParameter('hdbm')
            }})
        }
        next('/')
      }
    }
  }
)

router.afterEach(() => {

});
