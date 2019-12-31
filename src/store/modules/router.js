/*
* Vuex store 实例的根 state 对象
*/
const user = {
  state: {
    routerList: []
  },
  mutations: {
    SET_ROUTER_LIST: (state, data) => {
      state.routerList = data
    }
  }
}

export default user


