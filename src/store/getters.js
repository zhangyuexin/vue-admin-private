// 公共参数
export const common = state => state.common
// 是否全屏
export const isFullScren = state => state.common.isFullScren
// 左侧菜单
export const sidebarList = state => state.common.sidebarList
// 顶部菜单
export const topMenuList = state => state.common.topMenuList
// 全部字典
export const dict = state => state.common.dict
// 顶部菜单选择的ID
export const activeIndex = state => state.common.activeIndex
// 左侧导航默认选中
export const defaultActive = state => state.common.defaultActive
// 左侧导航默认跳转路径
export const defaultActivePath = state => state.common.defaultActivePath
// 左侧导航标签行显隐
export const navigationAndTagsShow = state => state.common.navigationAndTagsShow
// 主题颜色
export const theme = state => state.common.theme
// 全局loading
export const globalLoading = state => state.common.globalLoading
// 局部loading
export const partLoading = state => state.common.partLoading
// 左侧菜单折叠状态
export const isCollapse = state => state.common.isCollapse
//保存左侧tree中点击不同节点时切换的parentId
export const currentId = state => state.common.currentId
//判断当前单选树选择的是否为根节点
export const selectedRootId = state => state.common.selectedRootId
// 顶部标题
export const topTitle = state => state.common.topTitle
// 页脚信息
export const footerTitle = state => state.common.footerTitle
// tagList
export const tagList = state => state.tag.tagList
// tag
export const tag = state => state.tag.tag
// 用户验证信息
export const userData = state => state.user.userData
// 用户信息
export const userInfo = state => state.user.userInfo
// 岗位信息
export const gwInfo = state => state.user.gwInfo
// 岗位列表
export const gwList = state => state.user.gwList
// 用户上传头像请求头
export const tyrzUploadPortraitHeaders = state => state.user.tyrzUploadPortraitHeaders
//是否成功删除角色管理-角色信息
export const deleteRole = state => state.roles.deleteRole
//资助中心-勤工助学岗位查询弹窗参数
export const dailys = state => state.dailys
// 选直属中部门以及岗位
export const selectedList = state => state.jobs.selectedList
// 选非直属中部门以及岗位
export const fselectedList = state => state.jobs.fselectedList
//判断页面是否清空
export const isDelAllPost = state => state.jobs.isDelAllPost
// 当前删除的部门id
export const currentDelId = state => state.jobs.currentDelId
//资助中心-用人单位
export const companyList = state => state.jobs.companyList
//资助中心-临时困补设置
export const lskbSet = state => state.jobs.lskbSet
// 路由验证数据
export const routerList = state => state.router.routerList
// 组件
export const certification = state => state.user.certification
// 页面按钮资源验证数据
export const currentPagePermissions = state => state.directive.currentPagePermissions

/**
 * 组织机构模块
 * @param state
 * @returns {{state: {isAddDepartment: boolean, isDelDepartment: boolean, isEditDepartment: boolean, isSavePost: boolean, isDelSuccess: boolean, isChange: boolean, isSearch: boolean, searchListSum: number}, mutations: {SET_ADD_DEPARTMENT: organization.mutations.SET_ADD_DEPARTMENT, SET_DEL_DEPARTMENT: organization.mutations.SET_DEL_DEPARTMENT, SET_EDIT_DEPARTMENT: organization.mutations.SET_EDIT_DEPARTMENT, SET_SAVE_POST: organization.mutations.SET_SAVE_POST, SET_DEL_SUCCESS: organization.mutations.SET_DEL_SUCCESS, SET_IS_CHANGE: organization.mutations.SET_IS_CHANGE, SET_SEARCH: organization.mutations.SET_SEARCH, SET_LIST_SUM: organization.mutations.SET_LIST_SUM}}|string}
 */
export const organization = state => state.organization
//是否添加成功组织机构数据
export const isAddDepartment = state => state.organization.isAddDepartment
//是否成功删除组织机构数据
export const isDelDepartment = state => state.organization.isDelDepartment
//是否成功编辑部门信息
export const isEditDepartment = state => state.organization.isEditDepartment
//是否成功新建岗位
export const isSavePost = state => state.organization.isSavePost
//是否成功删除表格中的tr
export const isDelSuccess = state => state.organization.isDelSuccess
//判断是否改变了状态
export const isChange = state => state.organization.isChange
//查询列表时改变状态
export const isSearch = state => state.organization.isSearch
//保存查询后的table剩余条数
export const searchListSum = state => state.organization.searchListSum
//判断当前是否为启用状态
export const isEnable = state => state.organization.isEnable
//从树节点中获取是否停用的状态
export const isDisable = state => state.organization.isDisable
