/**
 * @description 对象拓展工具类
 */


/**
 * 空对象判断
 */
const isEmptyObject = (obj = {}) => {
  return typeof obj == 'object' && Object.keys(obj).length === 0;
};
exports.isEmptyObject = isEmptyObject;


/**
 * component props 拆分props
 * @param {object} obj props
 * @param {object} parts props container
 */
const splitObject = (obj, parts) => {
  let extra = {};
  let orign = {};
  Object.keys(obj).forEach((v) => {
    parts.indexOf(v) !== -1 ? extra[v] = obj[v] : orign[v] = obj[v];
  });
  return [extra, orign];
}
exports.splitObject = splitObject;

/**
 * 对象包装
 * @param {object} obj  {_hash:0937343,id:001001}
 * @param {Array} parts ['_hash', ''], ['id:pid', 0], ['bn', 999],
 * @return {object} result {_hash:0937343,pid:001001,bn:999}
 */
const collectObject = (obj, parts) => {
  let result = {};
  let orign = Object.keys(obj);
  parts.forEach((v, k) => {
    let [name, defaultValue] = v || [];
    let oldName = '', newName = '';
    if (name.indexOf(':') !== -1) {
      [oldName, newName] = name.split(':');
    } else {
      [oldName, newName] = [name, name];
    }
    if (orign.indexOf(oldName) !== -1) {
      result[newName] = obj[oldName];
    } else {
      result[newName] = defaultValue;
    }
  });
  return result;
}
exports.collectObject = collectObject;