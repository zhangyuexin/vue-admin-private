const roles = {
  state: {
    deleteRole: false,
    roleId:""
  },
  mutations: {
    SET_DELETEROLE: (state, action) => {
      state.deleteRole = !state.deleteRole
    },
    SET_ROLE_ID: (state, roleId) => {
      if (roleId) {
        state.roleId = roleId
      }
    },

  }
}

export default roles
