
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}


 export function isEmail3(s) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(s)
}

 /**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(s)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 大小写字母数字*/
export function validateAlphabetsAndNum(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

/* 微信格式校验*/
export function isWeChat(str) {
  const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
  return reg.test(str)
}

export function validateChinese(str) {
  const reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){1,20}$/
  return reg.test(str)
}
export function validateChineseOrEn(str) {
  const reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){1,10}$/
  return reg.test(str)
}

/*验证pad还是pc*/
export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  let flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 判断身份证号码
 */
export function cardid(code) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(code)
}
/**
 * 判断邮编
 */
export function zipCode(code) {
  let reg = /^[0-9]{6}$/;
  return reg.test(code)
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  let list = [];
  let result = true;
  let msg = '';
  var isPhone = /^0\d{2,3}-?\d{7,8}$/;
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确';
      } else {
        result = false;
      }
    } else {
      msg = '手机号码长度不为11位';
    }
  } else {
    msg = '手机号码不能为空';
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断姓名是否正确
 */
export function validatename(name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(name)) return false;
  return true;
}

/**
 /**
 * 判断姓名
 */
export function validatename2(name) {
  var regName = /^[\u4e00-\u9fa5\.A-Za-z0-9]{2,50}$/
  if (!regName.test(name)) return false;
  return true;
}

/**
 * 判断是否为整数
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}

/**
 * 判断是否为小数
 */
export function validatenumord(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
//是数字，且不能是负数
export function validateNums(sum){
  return  /^([1-9][\d]{0,8}|0)(\.[\d]{1,2})?$/.test(sum);
}
//是数字，且不能是负数
export function validateNumOne(sum){
  return  /^([1-9][\d]{0,7}|0)(\.[\d]{1,1})?$/.test(sum);
}
/**
 * 判断是否为数字
 */
export function validatenumber(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}
export function validatenumberZ(str) {
  const reg = /^[1-9]+$/
  return reg.test(str)
}

export function isTEL(str) {
  const reg = /^0\d{2,3}-?\d{7,8}$/;
  return reg.test(str)
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}

export function isBirthday(value) {
  let time = (new Date()).valueOf()
  let valueTime = (new Date(value)).valueOf()
  console.log(time)
  console.log(valueTime)
  console.log(value)
  console.log(valueTime <= time)
  return valueTime <= time
}

export function isPassword(str) {
  const reg = /^[a-zA-Z0-9_-]{6,18}$/
  return reg.test(str)
}
export function isPassword2(str) {
  const reg = /^[a-zA-Z0-9_-]{2,18}$/
  return reg.test(str)
}

export function isChinese(str) {
  const reg = /.*[\u4e00-\u9fa5]+.*$/
  return reg.test(str)
}

