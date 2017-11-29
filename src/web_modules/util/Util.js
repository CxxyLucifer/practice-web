/**
 * Created by wyz on 2016/8/24.
 */
const HTTP = "https://";

const IMAGE_CFG = {
  SERVER: HTTP + "pic.qianmi.com/qmui/v0.2/img",
  DEFAULT: "01/1febbf4b7e3f7aaec3ef9b5a6ba211b3.jpg"
};

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

  static timeFormat(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  static timeFormat(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }

  static stringToDate(sTime, fmt) {
    //做一个一一对应的hash表
    var minLength = Math.min(sTime.length, fmt.length),
      oTime = { y: "", M: "", d: "" };
    for (var i = 0; i < minLength; i++) {
      oTime[fmt[i]] += sTime[i];
    }
    return new Date(
      parseInt(oTime.y),
      parseInt(oTime.M - 1),
      parseInt(oTime.d)
    );
  }

  static getWeek(date) {
    var a = date.getYear(),
      b = date.getMonth(),
      c = date.getDate();
    var d1 = new Date(a, b, c),
      d2 = new Date(a, 0, 1),
      d = Math.round((d1 - d2) / 86400000);
    return Math.ceil((d + (d2.getDay() + 1 - 1)) / 7);
  }

  //生成一个以a为name b为value的对象数组 以最小的长度为最后的长度
  static o2oAssmble(a, v, renderValue) {
    if (a instanceof Array && v instanceof Array) {
      let arr = [];
      let n = Math.min(a.length, v.length);
      if (typeof renderValue === "function") {
        for (let i = 0; i < n; i++) {
          let o = {};
          o.name = a[i];
          o.value = renderValue(v[i]);
          arr.push(o);
        }
      } else {
        for (let i = 0; i < n; i++) {
          let o = {};
          o.name = a[i];
          o.value = v[i];
          arr.push(o);
        }
      }
      return arr;
    }
    return [];
  }

  static assmble(a, v) {
    let o = {};
    if (a instanceof Array && v instanceof Array) {
      let n = Math.min(a.length, v.length);
      for (let i = 0; i < n; i++) {
        o[a[i]] = v[i];
      }
    }
    return o;
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

  static getImagePath(url, type = "oss", opt = {}) {
    const defaultAvator = HTTP + "pic.qianmi.com/qmui/v0.2/img/avatar-default.png";
    const { width = "50", avatar = false } = opt;
    const defaultImg = avatar ? defaultAvator : `${HTTP}pic.qianmi.com/qmui/app/img/default_square.png`;
    if (!url) {
      /*if (type.includes("avatar")) {
                return defaultAvator
            }
            if()
            return 'img.1000.com/qm-a-img/prod/default.jpeg@50w_50h.png'
            //return IMAGE_CFG.SERVER + '/' + IMAGE_CFG.DEFAULT;*/
      return defaultImg;
    }

    var imageServer = IMAGE_CFG.SERVER;

    if (url.indexOf("http") != -1) {
      //外链
      return url;
    }



    if (url.indexOf("/") != 0) {
      url = "/" + url;
    }

    return imageServer + url;
  }

  static getUrl(path) {
    const head = HTTP;
    if (!path || typeof path !== "string") {
      return "";
    }
    if (path.indexOf("http") != -1) {
      //外链
      return path;
    }
    path = path.replace(/^\/\/|(^\/)/, "");
    return head + path;
  }

  static getAttrsFromAreaData(id, data, deep, attr) {
    let res = [];
    let loop = (id, data, deep) => {
      data.map(v => {
        if (v.value.substr(deep * 2, 2) === id.substr(deep * 2, 2)) {
          res.push(v[attr]);
          if (deep < 3 && v.children instanceof Array) {
            loop(id, v.children, deep + 1);
          }
        }
      });
    };
    loop(id, data, deep);
    return res;
  }

  static getAttrFromAreaData(id, data, attr) {
    let res = "";
    let loop = (id, data) => {
      data.map(v => {
        if (v.value === id) {
          res = v[attr];
          return;
        }
        if (v.children instanceof Array) {
          loop(id, v.children);
        }
      });
    };
    loop(id, data);
    return res;
  }

  static insertAreaData(cb) {
    if (typeof CHINA_REGION !== "undefined") {
      cb(CHINA_REGION);
    } else {
      let url = this.getUrl(
        "pic.qianmi.com/themes/common/region/China_Region_Cascader_Last.js"
      );
      this.insertScript(url, () => {
        cb(CHINA_REGION);
      });
    }
  }

  static getAreaNameByAreaCode(areaCode, cb) {
    this.insertAreaData(() =>
      cb(this.getAttrFromAreaData(areaCode, CHINA_REGION, "label"))
    );
  }

  static getPreFix(obj) {
    if (obj.length > 0) {
      for (var i = 0; i < obj.length; i++) {
        var name = obj[i].name;
        switch (obj[i].level) {
          case 1:
            obj[i].name = name;
            break;
          case 2:
            obj[i].name = "一" + name;
            break;
          case 3:
            obj[i].name = "一一" + name;
            break;
          default:
            obj[i].name = name;
        }
      }
    }
    return obj;
  }

  static deepCopy(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      console && console.log("深拷贝出错", obj);
    }
  }

  static filterCode(addresssStr) {
    if (!this.isEmpty(addresssStr) && addresssStr.indexOf("-") > -1) {
      return addresssStr.split("-")[1];
    } else {
      return addresssStr;
    }
  }

  static getRoleFromSrc(props) {
    return props.location.pathname.split("/")[2];
  }

  static filterCode(addresssStr) {
    if (!this.isEmpty(addresssStr) && addresssStr.indexOf("-") > -1) {
      return addresssStr.split("-")[1];
    } else {
      return addresssStr;
    }
  }

  static filterDate(dateStr) {
    return dateStr.replace("/", "").replace("/", "");
  }
}
module.exports = Util;