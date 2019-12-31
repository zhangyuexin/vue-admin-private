const user = {
  state: {
    // 选中的岗位
    selectedList: [],
    //是否清空岗位
    isDelAllPost: false,
    //当前删除部门的id
    currentDelId: '',
    // 选中的岗位
    fselectedList: [],
    //是否清空岗位
    fisDelAllPost: false,
    //当前删除部门的id
    fcurrentDelId: '',
    //资助中心-用人单位
    companyList:'',
    //资助中心-临时困补设置
    lskbSet:''
  },
  mutations: {
    SET_SELECTED_LIST: (state, selectedList) => {
      state.selectedList = selectedList;
    },
    SET_DEL_ALL_POST: (state) => {
      state.isDelAllPost = !state.isDelAllPost
    },
    SET_CURRENT_DEL_ID: (state, currentDelId) => {
      state.currentDelId = currentDelId
    },
    FSET_SELECTED_LIST: (state, fselectedList) => {
      state.fselectedList = fselectedList;
    },
    FSET_DEL_ALL_POST: (state) => {
      state.fisDelAllPost = !state.fisDelAllPost
    },
    FSET_CURRENT_DEL_ID: (state, fcurrentDelId) => {
      state.fcurrentDelId = fcurrentDelId
    },
    COMPANY_LiST: (state, companyList) => {
      state.companyList = companyList
    },
    LSKB_SET: (state, lskbSet) => {
      state.lskbSet = lskbSet
    }
  }
}

export default user


