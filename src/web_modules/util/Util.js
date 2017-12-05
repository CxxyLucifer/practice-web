/**
 * Created by liuhui on 2016/8/24.
 */

class Util {
  static insertScript(url, callback) {
    var oScript = document.createElement("script");
    oScript.src = url;
    oScript.type = "text/javascript";
    oScript.async = false;
    if (typeof callback === "function")
      oScript.onload = function () {
        callback();
      };
    document.body.appendChild(oScript);
  }

  static getDate(AddDayCount) {
    let dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;//获取当前月份的日期
    let d = dd.getDate();
    return y + "-" + (m >= 10 ? m : ("0" + m)) + "-" + (d >= 10 ? d : ("0" + d));
  }

  static isEmpty(obj) {
    if (!obj) {
      return true;
    } else {
      switch (typeof obj) {
        case "number":
          return false;
        case "string":
          return !obj.length;
        case "symbol":
          return false;
        case "object":
          switch (Object.prototype.toString.call(obj)) {
            case "[object Object]":
              return !Object.getOwnPropertyNames(obj).length;
            case "[object Array]":
              return !obj.length;
            default:
              return true;
          }
          break;
        default:
          return true;
      }
    }
    return true;
  }

  static isNotEmpty(obj) {
    return !this.isEmpty(obj);
  }

  static filterCode(addresssStr) {
    if (!this.isEmpty(addresssStr) && addresssStr.indexOf("-") > -1) {
      return addresssStr.split("-")[1];
    } else {
      return addresssStr;
    }
  }

  static ReplaceAll(str, sptr, sptr1) {
    while (str.indexOf(sptr) >= 0) {
      str = str.replace(sptr, sptr1);
    }
    return str;
  }
}
module.exports = Util;