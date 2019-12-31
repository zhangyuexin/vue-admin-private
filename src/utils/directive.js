import Vue from 'vue'
import Store from '@/store/index'

/*
 * 自定义指令
 * bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
 * inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
 * update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
 * componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 * unbind：只调用一次，指令与元素解绑时调用。
 */

// 自定义按钮权限过滤指令
Vue.directive('has', {
  inserted: (el, binding) => {
    // 删除按钮
    if (Vue.prototype.$_has(binding)) {
      el.parentNode.removeChild(el)
    }
  }
})

// 权限检查方法
Vue.prototype.$_has = function (binding) {
  let isExist = true
  let buttons = Store.getters.currentPagePermissions
  let identity = Store.getters.userInfo.identity
  if (identity == 'GM') {
    return false
  }
  if (buttons != null && buttons.length > 0) {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].ymbs == binding.value) {
        isExist = false
      }
    }
  }
  return isExist
}
