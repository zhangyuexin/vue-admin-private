import Router from '@/router'
import {setStore, getStore, removeStore} from '@/utils/store'
import {isObjectValueEqual} from '@/utils/util'

const tagObj = {
  label: '首页', //标题名称
  value: '/welcome/welcome', //标题的路径
  params: '', //标题的路径参数
  query: '', //标题的参数
}

//处理首个标签
function setFistTag(list) {
  if (list.length == 1) {
    list[0].close = false
  } else {
    list.some(a => {
      if (a.label !== '首页') {
        a.close = true
      }
    })
  }
}

const tag = {
  state: {
    tagList: getStore({name: 'tagList', type: 'session'}) || [],
    tag: getStore({name: 'tag', type: 'session'}) || tagObj,
  },
  mutations: {
    ADD_TAG: (state, action) => {
      // console.log(action,"问你一声敢不敢")
      // console.log(state,"不敢不敢就不敢")
      if (action !== undefined) {
        state.tag = action;
        setStore({name: 'tag', content: state.tag, type: 'session'})
        if (state.tagList.some(ele => isObjectValueEqual(ele, action))) return
        state.tagList.push(action)
        setFistTag(state.tagList);
        setStore({name: 'tagList', content: state.tagList, type: 'session'})
      }
    },
    SET_TAG: (state, action) => {
      state.tag = action;
      setStore({name: 'tag', content: state.tag, type: 'session'})
    },
    DEL_TAG: (state, action) => {
      state.tagList = state.tagList.filter(item => {
        if (typeof(action) === 'object') {
          let a = Object.assign({}, item);
          let b = Object.assign({}, action);
          delete a.close;
          delete b.__ob__;
          return !isObjectValueEqual(a, b)
        } else {
          return item.value !== action
        }
      })
      setFistTag(state.tagList);
      setStore({name: 'tagList', content: state.tagList, type: 'session'})
    },
    DEL_ALL_TAG: (state) => {
      state.tag = tagObj;
      setStore({name: 'tag', content: tagObj, type: 'session'})
      state.tagList = [tagObj];
      removeStore({name: 'tagList'});
      setStore({name: 'tagList', content: state.tagList, type: 'session'});
      Router.push(tagObj.value)
    },
    DEL_TAG_OTHER: (state) => {
      state.tagList = state.tagList.filter(item => (item.value === state.tag.value  || item.value === '/welcome/welcome' ))
      setFistTag(state.tagList);
      setStore({name: 'tagList', content: state.tagList, type: 'session'})
    },
  }
}

export default tag


