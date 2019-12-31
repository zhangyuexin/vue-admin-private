import Api from '@/api/index'

const protalTeacher = {
  actions: {
    grMhxxList({commit}, object) {
      return new Promise((resolve, reject) => {
        Api.grMhxxList(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    grWdxx({commit}, object) {
      return new Promise((resolve, reject) => {
        Api.grWdxx(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    findMhxxByBm({commit}, object) {
      return new Promise((resolve, reject) => {
        Api.findMhxxByBm(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    ydxx({commit}, object) {
      return new Promise((resolve, reject) => {
        Api.ydxx(object).then(response => {
          // 请求成功回调
          resolve(response)
        }).catch(error => {
          // 请求失败回调
          reject(error)
        })
      })
    },
    pullMhxx({commit}, object) {
      return new Promise((resolve, reject) => {
        Api.pullMhxx(object).then(response => {
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

export default protalTeacher
