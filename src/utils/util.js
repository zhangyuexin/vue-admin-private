import Store from '@/store/index'

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};

export function getHashParameters() {
  var arr = (location.hash || '').split('?')[1].split('&')
  var params = {}
  for (var i = 0; i < arr.length; i++) {
    var data = arr[i].split('=')
    if (data.length === 2) {
      params[data[0]] = data[1]
    }
  }
  return params
}
export function getHashParameter(key) {
  var params = getHashParameters()
  return params[key]
}

/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement || false;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};

/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true;
  Object.keys(a).forEach(ele => {
    const type = typeof(a[ele]);
    if (a.value == b.value) {
      result = true;
    } else if (type === 'string' && a[ele] !== b[ele]) {
      result = false;
    } else if (type === 'object' && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) {
      result = false;
    }
  })
  return result;
}

/**
 * 设置主题
 */
export const setTheme = (theme, old) => {
  // console.log('setTheme', theme, old)
  // 全局绿色按钮
  // let operationGreens = document.getElementsByClassName('operation_green')
  // if (operationGreens.length) {
  //   for (let i = 0; i < operationGreens.length; i++) {
  //     operationGreens[i].style.backgroundColor = theme
  //     operationGreens[i].style.borderColor = theme
  //   }
  // }
}


/**
 * 获取按钮资源
 */
export const setButtonResources = (path) => {
  if (Store.getters.sidebarList != undefined && Store.getters.sidebarList.length > 0) {
    Store.getters.sidebarList.forEach(value => {
      if (value.href == path && value.type == 'menu') {
        Store.commit("SET_CURRENT_PAGE_PERMISSIONS", value.buttons)
      } else if (value.children.length != 0 && value.type == 'dirt') {
        value.children.forEach(val => {
          if (val.href == path && val.type == 'menu') {
            Store.commit("SET_CURRENT_PAGE_PERMISSIONS", val.buttons)
          }
        })
      }
    })
  }
};


/**
 * 导出Excel
 * data二进制流信息
 * 文件名称 扩展名为 .xlsx
 */
export const exportExcel = (data, fileName) => {
  let blob = new Blob([data]);
  if ("download" in document.createElement("a")) {     // 非IE下载
    let elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
};


/**
 * 时间格式转换
 * fmt:yyyy年MM月dd日
 * date:时间格式对象
 * */
export const dateFtt = (fmt, date) => {
  const o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export const parseParams = (data) => {
  try {
    let tempArr = []
    for (let i in data) {
      let key = encodeURIComponent(i)
      let value = encodeURIComponent(data[i])
      tempArr.push(key + '=' + value)
    }
    let urlParamsStr = tempArr.join('&')
    return urlParamsStr
  } catch (err) {
    return ''
  }
}

// 获取浏览器内核
export const btnlogin = () => {
  if (navigator.userAgent.indexOf("MSIE") > 0) {                                 // MSIE内核
    return "MSIE";
  }
  if (navigator.userAgent.indexOf("Firefox") > 0) {                                 // Firefox内核
    return "Firefox";
  }
  if (navigator.userAgent.indexOf("Opera") > 0) {                                  // Opera内核
    return "Opera";
  }
  if (navigator.userAgent.indexOf("Safari") > 0) {                                  // Safari内核
    return "Safari";
  }
  if (navigator.userAgent.indexOf("Camino") > 0) {                                  // Camino内核
    return "Camino";
  }
  if (navigator.userAgent.indexOf("Gecko") > 0) {                                    // Gecko内核
    return "Gecko";
  }
  return ''
}

export const CheckImgExists = (imgurl) => {
  let ImgObj = new Image(); //判断图片是否存在
  // console.log(ImgObj,'图片')
  ImgObj.src = imgurl;
  //存在图片
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true;
  } else {
    return false;
  }
}
