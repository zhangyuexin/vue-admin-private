const dailys = {
  state: {
    websignObj: null,
    websignIsShow:0,
  },
  mutations: {
    SET_WEBSIGNOBJ: (state, action) => {
      console.log(state,action,'难')
      state.websignObj = action;
    },
    SET_WEBSIGNISSHOW: (state, action) => {
      state.websignIsShow = action;
    }
  }
}
export default dailys
