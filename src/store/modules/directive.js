/*
* Vuex store 实例的根 state 对象
*/
const directive = {
  state: {
    currentPagePermissions: null
  },
  mutations: {
    SET_CURRENT_PAGE_PERMISSIONS: (state, data) => {
      state.currentPagePermissions = data
    }
  }
}

export default directive


