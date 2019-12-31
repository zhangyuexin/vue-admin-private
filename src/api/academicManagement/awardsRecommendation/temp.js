import request from '@/utils/request'

// 悦居寝室
// 寝室审批列表
export function findXsList(object) {
    return request({
      url: '/api/xggl/bYjqs/findYjqsList',
      method: 'post',
      data: object
    })
  }
// 学生列表
export function findTjlist(object) {
    return request({
      url: '/api/xggl/bYjqs/findTjlist',
      method: 'post',
      data: object
    })
  }
// 获奖列表
export function findYjqsjxList(object) {
    return request({
      url: '/api/xggl/bYjqs/findYjqsjxList',
      method: 'post',
      data: object
    })
  }
// 上报
export function reportBYjqs(object) {
    return request({
      url: '/api/xggl/bYjqs/reportBYjqs',
      method: 'post',
      data: object
    })
  }
// 通过
export function checkYjqs(object) {
    return request({
      url: '/api/xggl/bYjqs/checkYjqs',
      method: 'post',
      data: object
    })
  }
// 导出
export function exportYjqs(object) {
    return request({
      url: '/api/xggl/bYjqs/exportYjqs',
      method: 'post',
      data: object,
      responseType: "blob"
    })
  }
// 导出奖项
export function exportYjqsjx(object) {
  return request({
    url: '/api/xggl/bYjqs/exportYjqsjx',
    method: 'post',
    data: object,
    responseType: "blob"
  })
}
// 详情
export function findBYjqs(object) {
  return request({
    url: '/api/xggl/bYjqs/findBYjqs',
    method: 'post',
    data: object
  })
}
// 公示
export function publiYjqs(object) {
  return request({
    url: '/api/xggl/bYjqs/publiYjqs',
    method: 'post',
    data: object
  })
}
// 查询专业年级下拉
export function findBzxx(object) {
  return request({
    url: '/api/xggl/bYjqs/findBzxx',
    method: 'post',
    data: object
  })
}
// 是否是寝室长
export function ifSsz(object) {
  return request({
    url: '/api/xggl/bYjqs/ifSsz',
    method: 'post',
    data: object
  })
}

// 先进班集体
// 获奖列表
export function findXjbjtsList(object) {
    return request({
      url: '/api/xggl/xgglBXjbjt/findXjbjtsList',
      method: 'post',
      data: object
    })
  }
// 查询学院列表
export function findXjbjtXyList(object) {
    return request({
      url: '/api/xggl/xgglBXjbjt/findXyList',
      method: 'post',
      data: object
    })
  }
// 查询年级专业列表
export function findNjZyList(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/findNjZyList',
    method: 'post',
    data: object
  })
}
// 申请列表
export function findXjbjt(object) {
    return request({
      url: '/api/xggl/xgglBXjbjt/findXjbjt',
      method: 'post',
      data: object
    })
  }
// 导出
export function excelExportXjbjt(object) {
    return request({
      url: '/api/xggl/xgglBXjbjt/excelExport',
      method: 'post',
      data: object,
      responseType: "blob"
    })
  }
// 导出奖项列表
export function exportXjbjt(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/exportXjbjt',
    method: 'post',
    data: object,
    responseType: "blob"
  })
}
// 导出年级专业奖项列表
export function exportXjbjtExcelNjZyList(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/excelNjZyList',
    method: 'post',
    data: object,
    responseType: "blob"
  })
}
// 导出年级专业奖项列表
export function exportXjbjtExcelXyList(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/excelXyList',
    method: 'post',
    data: object,
    responseType: "blob"
  })
}
// 通过驳回
export function checkXjbjt(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/checkXjbjt',
    method: 'post',
    data: object
  })
}
// 年级专业通过驳回
export function checkXjbjtZyNj(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/checkZyNj',
    method: 'post',
    data: object
  })
}
// 学院通过驳回
export function checkXjbjtXy(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/checkXy',
    method: 'post',
    data: object
  })
}
// 上报
export function reportXjbjt(object) {
    return request({
      url: '/api/xggl/xgglBXjbjt/reportXjbjt',
      method: 'post',
      data: object
    })
  }
// 详情
export function selectXjbjt(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/selectXjbjt',
    method: 'post',
    data: object
  })
}
// 公示
export function xjbjtPublicity(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/publicity',
    method: 'post',
    data: object
  })
}
// 归档
export function xjbjtPlaceOnFile(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/placeOnFile',
    method: 'post',
    data: object
  })
}

// 学生端申请部分接口
// 查询学生申请信息
export function findXssqxx(xh,xnd) {
  return request({
    url: `/api/xggl/pjrygl/findXssqxx/${xh}/${xnd}`,
    method: 'get'
  })
}
// 先进班集体查询学生信息
export function findXsjbxx1(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/findXsjbxx',
    method: 'post',
    data: object
  })
}
// 先进班集体查询学生获奖信息
export function findHjqk() {
  return request({
    url: '/api/xggl/xgglBXjbjt/findHjqk',
    method: 'post',
  })
}
// 先进班集体查询学生奖学金信息
export function findJxjhjrc() {
  return request({
    url: '/api/xggl/xgglBXjbjt/findJxjhjrc',
    method: 'post',
  })
}
// 先进班集体查询活动信息
export function findBjhd(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/findBjhd',
    method: 'post',
    data: object
  })
}
// 先进班集体流程图页
export function findJxdl() {
  return request({
    url: '/api/xggl/xgglBXjbjt/findJxfbbm',
    method: 'post',
  })
}
// 国奖和个人评优部分流程图页
export function findJxfbByMbbs(mbbs) {
  return request({
    url: `/api/xggl/jxfb/findJxfbByMbbs/${mbbs}`,
    method: 'get',
  })
}
// 国奖申请
export function submitGjjxjsq(object) {
  return request({
    url: '/api/xggl/gjjxj/submitGjjxjsq',
    method: 'post',
    data: object
  })
}
// 优秀学生干部申请
export function submitYxxsgbsq(object) {
  return request({
    url: '/api/xggl/grpy/submitYxxsgbsq',
    method: 'post',
    data: object
  })
}
// 优秀学生标兵申请
export function submitYxxsbbsq(object) {
  return request({
    url: '/api/xggl/grpy/submitYxxsbbsq',
    method: 'post',
    data: object
  })
}
// 优秀学生申请
export function submitYxxssq(object) {
  return request({
    url: '/api/xggl/grpy/submitYxxssq',
    method: 'post',
    data: object
  })
}
// 学业特长优秀个人申请
export function submitXytcyxgrsq(object) {
  return request({
    url: '/api/xggl/grpy/submitXytcyxgrsq',
    method: 'post',
    data: object
  })
}
// 优秀学生干部标兵申请
export function submitYxxsgbbbsq(object) {
  return request({
    url: '/api/xggl/grpy/submitYxxsgbbbsq',
    method: 'post',
    data: object
  })
}
// 先进班集体申请
export function submitXjbjt(object) {
  return request({
    url: '/api/xggl/xgglBXjbjt/submitXjbjt',
    method: 'post',
    data: object
  })
}
// 命名奖学金申请
export function submitMmjxjsq(object) {
  return request({
    url: '/api/xggl/mmjxj/submitMmjxjsq',
    method: 'post',
    data: object
  })
}