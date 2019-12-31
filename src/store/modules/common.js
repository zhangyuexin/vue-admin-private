import {setStore, getStore, removeStore} from '@/utils/store'
import Vue from 'vue'
let mengId; //门户进入选中菜单
//处理首个标签
function setFistTag(list) {
  if (list.length == 1) {
    list[0].close = false;
  } else {
    list.some(a => {
      a.close = true
    })
  }
}

const user = {
  state: {
    // 顶部导航选中的Id
    isFullScren: false,
    isCollapse: false,
    theme: getStore({name: 'theme'}),
    heightTitle: '测试标题',
    sidebarList: getStore({name: 'sidebarList', type: 'session'}),
    currentId: '',
    globalLoading: false,
    topMenuList: getStore({name: 'menu', type: 'session'}),
    activeIndex: getStore({name: 'activeIndex', type: 'session'}),
    defaultActive: getStore({name: 'defaultActive', type: 'session'}),
    defaultActivePath: getStore({name: 'defaultActivePath', type: 'session'}),
    dict: getStore({name: 'dictionary', type: 'session'}),
    partLoading: false,
    selectedRootId: '',
    topTitle: getStore({name: 'topTitle', type: 'session'}) || '统一授权与认证中心',
    navigationAndTagsShow: getStore({name: 'navigationAndTagsShow', type: 'session'}) || true,
    footerTitle: getStore({
      name: 'footerTitle',
      type: 'session'
    }) || getStore({name: 'footerTitle'}) || '沈阳东深科技有限公司 @neunb-2018',
    formMakingList: {}
  },
  mutations: {
    SET_FULLSCREN: (state, action) => {
      state.isFullScren = !state.isFullScren;
    },
    SET_GLOBAL_LOADING: (state, status) => {
      state.globalLoading = status;
    },
    SET_PART_LOADING: (state, action) => {
      if (state.partLoading == true) {
        setTimeout(() => {
          state.partLoading = !state.partLoading;
        }, 500)
      } else {
        state.partLoading = !state.partLoading;
      }
    },
    SET_TOP_MENU_LIST: (state, menuList) => {
      state.topMenuList = menuList;
      setStore({name: 'menu', content: menuList, type: 'session'})
    },
    SET_ACTIVE_INDEX: (state, index) => {
      // console.log(state,'菜单state调试')
      // console.log(index,'菜单index调试')
      setStore({name: 'activeIndex', content: index, type: 'session'})
      state.activeIndex = index;
      // console.log(state.activeIndex,'state.activeIndex')
    },
    SET_DEFAULT_ACTIVE: (state, index) => {
      // 左侧选中菜单
      setStore({name: 'defaultActive', content: index.id, type: 'session'})
      // 左侧选中菜单路径
      setStore({name: 'defaultActivePath', content: index.value, type: 'session'})
      // 切换TAG更新左侧菜单
      state.topMenuList.forEach(value => {
        if (value.id == index.parentId) {
          setStore({name: 'sidebarList', content: value.children, type: 'session'})
          state.sidebarList = value.children
        }
      })
      state.defaultActive = index.id;
      state.defaultActivePath = index.value;
    },
    DEL_DEFAULT_ACTIVE: (state, index) => {
      state.defaultActive = '';
      state.defaultActivePath = '';
    },
    SET_IS_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse;
    },
    SET_THEME: (state, color) => {
      state.theme = color;
      setStore({name: 'theme', content: color})
    },
    SET_SIDEBAR_LIST: (state, list) => {
      setStore({name: 'sidebarList', content: list, type: 'session'})
      // console.log(list,'發廣告')
      state.sidebarList = list
    },
    SET_CURRENT_ID: (state, currentId) => {
      if (currentId) {
        state.currentId = currentId
      }
    },
    SET_DICT: (state, data) => {
      setStore({name: 'dictionary', content: data, type: 'session'});
      // state.dict = data;
      Vue.set(state,'dict',data)
    },
    //判断单选树当前选择的是否为根节点
    SET_SELECTED_ROOT_ID: (state, id) => {
      state.selectedRootId = id
    },
    SET_TOP_TITLE: (state, title) => {
      setStore({name: 'topTitle', content: title, type: 'session'});
      state.topTitle = title
    },
    // 设置页脚信息
    SET_FOOTER_TITLE: (state, title) => {
      setStore({name: 'footerTitle', content: title, type: 'session'});
      setStore({name: 'footerTitle', content: title});
      state.footerTitle = title
    },
    // 显示隐藏顶部导航，左侧导航
    SET_NAVIGATION_AND_RAGS_SHOW: (state, status) => {
      setStore({name: 'navigationAndTagsShow', content: status, type: 'session'});
      state.navigationAndTagsShow = status
    },
    // 自定义表单
    SET_FORM_MAKING: (state, action) => {
      state.formMakingList = action;
    },
    SET_ALL_EMPTY: () => {
      state.isFullScren = false
      state.isCollapse = false
      state.theme = getStore({name: 'theme'})
      state.heightTitle = '测试标题'
      state.sidebarList = getStore({name: 'sidebarList', type: 'session'})
      state.currentId = ''
      state.globalLoading = false
      state.topMenuList = getStore({name: 'menu', type: 'session'})
      state.activeIndex = getStore({name: 'activeIndex', type: 'session'})
      state.defaultActive = getStore({name: 'defaultActive', type: 'session'})
      state.defaultActivePath = getStore({name: 'defaultActivePath', type: 'session'})
      state.dict = getStore({name: 'dictionary', type: 'session'})
      state.partLoading = false
      state.selectedRootId = ''
      state.footerTitle = getStore({name: 'footerTitle', type: 'session'})
    }
  }
}

export default user


