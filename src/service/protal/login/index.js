import Api from '@/api/index'

const loginIndex = {
  actions: {
    userLogin({commit}, object) {
      // TODO 通过 state 把 response 赋给 store层
      return new Promise((resolve, reject) => {
        Api.userNameLogin(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    sendActivateSms({commit}, object) {
      // TODO 通过 state 把 response 赋给 store层
      return new Promise((resolve, reject) => {
        Api.sendActivateSms(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    saveYhActivate({commit}, object) {
      // TODO 通过 state 把 response 赋给 store层
      return new Promise((resolve, reject) => {
        Api.saveYhActivate(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    authenticationQuery({commit}, object) {
      // TODO 通过 state 把 response 赋给 store层
      return new Promise((resolve, reject) => {
        Api.authenticationQuery(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
  }
}

export default loginIndex
