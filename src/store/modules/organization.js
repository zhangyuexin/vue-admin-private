const organization = {
  state: {
    isAddDepartment: false,
    isDelDepartment: false,
    isEditDepartment: false,
    isSavePost: false,
    isDelSuccess: false,
    isChange: false,
    isSearch: false,
    searchListSum: 0,
    isEnable: true,
    isDisable: false
  },
  mutations: {
    SET_ADD_DEPARTMENT: (state, action) => {
      state.isAddDepartment = !state.isAddDepartment
    },
    SET_DEL_DEPARTMENT: (state, action) => {
      state.isDelDepartment = !state.isDelDepartment
    },
    SET_EDIT_DEPARTMENT: (state, action) => {
      state.isEditDepartment = !state.isEditDepartment
    },
    SET_SAVE_POST: (state, action) => {
      state.isSavePost = !state.isSavePost
    },
    SET_DEL_SUCCESS: (state, action) => {
      state.isDelSuccess = !state.isDelSuccess
    },
    SET_IS_CHANGE: (state, action) => {
      state.isChange = !state.isChange
    },
    SET_SEARCH: (state) => {
      state.isSearch = !state.isSearch
    },
    SET_LIST_SUM: (state, sum) => {
      state.searchListSum = sum
    },
    SET_IS_ENABLE: (state, isBoolean) => {
      state.isEnable = typeof(isBoolean) == 'boolean' ? isBoolean : state.isEnable
    },
    SET_IS_DISABLE: (state, isBoolean) => {
      state.isDisable = typeof(isBoolean) == 'boolean' ? isBoolean : state.isDisable
    }
  }
}

export default organization
