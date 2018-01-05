import Cookies from "js-cookie";

/**
 * 设置cookies
 * @require js-cookie
 */
const setCookie = ({ name, value, expires = 1, path, domain, secure }) => {
  let opt = {
    expires: expires
  };
  if (path != undefined) {
    opt['path'] = path;
  }
  if (domain != undefined) {
    opt['domain'] = domain;
  }
  if (secure != undefined) {
    opt['secure'] = secure;
  }
  Cookies.set(name, value, opt);
};

/**
 * 获取cookie
 */
const getCookie = ({ name, domain }) => {
  let opt = {};
  if (domain != undefined) {
    opt['domain'] = domain;
  }
  return Cookies.getJSON(name);
};

/**
 * 获取cookie
 */
const getCookieString = ({ name, domain }) => {
  let opt = {};
  if (domain != undefined) {
    opt['domain'] = domain;
  }
  return Cookies.get(name, opt);
};

/**
 * read all visible cookies
 */
const viewCookies = () => {
  return Cookies.getJSON();
};

/**
 * 移除cookies
 */
const removeCookie = ({ name, path, domain, secure }) => {
  let opt = {};
  if (path != undefined) {
    opt['path'] = path;
  }
  if (domain != undefined) {
    opt['domain'] = domain;
  }
  if (secure != undefined) {
    opt['secure'] = secure;
  }
  Cookies.remove(name, opt);
};

export {
  setCookie, getCookie, getCookieString, viewCookies, removeCookie
}