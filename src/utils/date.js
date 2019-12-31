/* 时间转日期 */
export function dateFormat(date) {
  let time = new Date(date)
  let Y = time.getFullYear() + '-';
  let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
  let D = time.getDate() + ' ';
  let h = (time.getHours() < 10) ? '0' + time.getHours() + ':' : time.getHours() + ':';
  let m = (time.getMinutes() < 10) ? '0' + time.getMinutes() + ':' : time.getMinutes() + ':';
  let s = (time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds();
  return Y + M + D + h + m + s
}

export function timeStamp(date) {
  let time = new Date(date)
  return time.valueOf()
}

export function getYyMmDdTimeStamp(date) {
  let time = new Date(date)
  let Y = time.getFullYear() + '-';
  let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
  let D = time.getDate() + ' ';
  return new Date(Y + M + D).valueOf()
}

export function curDateTime() {
    let d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var date = d.getDate();
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ms = d.getMilliseconds();
    var curDateTime = year;
    if(month>9)
      curDateTime = curDateTime +"-"+month;
    else
      curDateTime = curDateTime +"-0"+month;
    if(date>9)
      curDateTime = curDateTime +"-"+date;
    else
      curDateTime = curDateTime +"-0"+date;
    if(hours>9)
      curDateTime = curDateTime +" "+hours;
    else
      curDateTime = curDateTime +" 0"+hours;
    if(minutes>9)
      curDateTime = curDateTime +":"+minutes;
    else
      curDateTime = curDateTime +":0"+minutes;
    if(seconds>9)
      curDateTime = curDateTime +":"+seconds;
    else
      curDateTime = curDateTime +":0"+seconds;
    return curDateTime
}
