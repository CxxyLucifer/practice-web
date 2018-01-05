/**
 */
import qmUtil from "./Util"

function Validator() {
}


/**
 *  判断是不是email
 *
 * @param param (email: true|false)
 * @param value (校验的值)
 * @returns {boolean|*}
 */
Validator.prototype.email = function (param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        //pass = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)||!value;
        // pass = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value) || !value;
        //保持与api端一致
        pass = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(value) || !value;

        pass = pass && value.length <= 30
    }

    return pass;
};


/**
 * 判断是不是url
 *
 * @param param(url:true|false)
 * @param value
 * @returns {boolean|*}
 */
Validator.prototype.url = function url(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }

    return pass;
};


/**
 *  校验是不是日期
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.date = function (param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = !/Invalid|NaN/.test(new Date(value).toString());
    }

    return pass;
};


/**
 * 标准长度
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.formatLength = function formatLength(param, value) {
    return value.length == param;
};


/**
 * 判断是不是ISO的日期格式
 *
 * @param param
 * @param value
 * @returns {boolean|*}
 */
Validator.prototype.dataISO = function dataISO(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
    }

    return pass;
};


/**
 * 组织机构代码校验
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.orgCode = function orgCode(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {

        var ws = [3, 7, 9, 10, 5, 8, 4, 2];
        var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var reg = /^([0-9A-Z]){9}$/;
        if (!reg.test(value)) {
            return false;
        }
        var sum = 0;
        for (var i = 0; i < 8; i++) {
            sum += str.indexOf(value.charAt(i)) * ws[i];
        }
        var C9 = 11 - (sum % 11);
        if (C9 == 11) {
            C9 = '0';
        } else if (C9 == 10) {
            C9 = 'X'
        }

        if (value.charAt(8) != C9) {
            return false;
        }
        return true;
    }
    return pass;
};


/**
 * 判断是不是数字带小数点
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.number = function number(param, value) {
    var result = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        result = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    }

    return result;
};

/**
 * 判断是不是数字最多两位小数
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.number2point = function number(param, value) {
    var result = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        result = /^[0-9]+(.[0-9]{1,2})?$/.test(value);
    }

    return result;
};


/**
 * 校验是不是数字不带小数点
 *
 * @param param
 * @param value
 * @returns {boolean|*}
 */
Validator.prototype.digits = function digits(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /^\d+$/.test(value) || !value;
    }

    return pass;
};


/**
 * 校验必须项
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.required = function required(param, value) {
    var pass = true;

    if (param === true) {
        if (typeof value == 'string') {
            return value.trim().length > 0;
        } else {
            return !!value;
        }

    }
    if (typeof param == 'function') {
        if (param(value, (this.store.data('form') || this.store.data()).toJS())) {
            if (typeof value == 'string') {
                return value.trim().length > 0;
            } else {
                return !!value;
            }
        }
    }
    return pass;
};


/**
 * 身份证号码
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.cardNo = function cardNo(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        var len = value.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
        else {
            return false;
        }
        var a = value.match(re);
        if (a != null) {
            if (len == 15) {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4]
                    && D.getDate() == a[5];
            } else {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4]
                    && D.getDate() == a[5];
            }
            if (!B) {
                return false;
            }
        } else {
            return false;
        }
    }

    return pass;
};


/**
 * 验证QQ号码
 * @param param
 * @param value
 * @returns {boolean|*}
 */
Validator.prototype.qq = function qq(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {

        pass = this.positiveInteger([5, 12], value);
    }

    return pass;
};


/**
 * 手机号码
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.mobile = function mobile(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        var length = value.length;
        var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        pass = (length == 11 && reg.test(value)) || !value;
    }

    return pass;
};

/**
 * 电话号码
 * @param param
 * @param value
 * @returns {boolean|*}
 */
Validator.prototype.phone = function phone(param, value) {
    var pass = true;
    if (param === true && qmUtil.isNotEmpty(value)) {
        var reg = /^((\d{10,12})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
        pass = reg.test(value);
    }

    return pass;
};


/**
 * 密码强度验证: 密码必须是字符与数字的混合
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.pwdMix = function pwdMix(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        var reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
        pass = reg.test(value);
    }

    return pass;
};


/**
 * 最小值
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.min = function min(param, value) {
    return Number(value) >= Number(param);
};


/**
 * 最大值
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.max = function max(param, value) {
    return Number(value) <= Number(param);
};

/**
 * 最大不超过
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.maxValue = function maxValue(param, value) {
    return Number(value) < Number(param);
};


/**
 * 最小长度
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.minLength = function minLength(param, value) {
    return value.length >= param;
};


/**
 * 最大长度
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.maxLength = function maxLength(param, value) {
    return value.length <= param;
};


/**
 * 在范围内
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.range = function range(param, value) {
    return value >= param[0] && value <= param[1];
};


/**
 *  * 长度在范围之内
 *   *
 *    * @param param
 *     * @param val
 *      * @returns {boolean}
 *       */
Validator.prototype.rangeLength = function rangeLength(param, value) {
    var pass = true;
    if (qmUtil.isNotEmpty(value)) {
        if (typeof value == 'string') {
            pass = ([...value].length >= param[0] && [...value].length <= param[1]);
        }
        else {
            pass = (value.length >= param[0] && value.length <= param[1]);
        }
    }
    return pass;
};


/**
 *  * 验证m~n位名称,不允许包含特殊符号
 *   *
 *    * @param param
 *     * @param val
 *      * @returns {boolean}
 *       */
Validator.prototype.checkName = function checkName(param, value) {
    var pass = true;

    if (qmUtil.isNotEmpty(value)) {
        var flag1 = this.rangeLength(param, value + "");
        var flag3 = this.specialChar(true, value);

        pass = (flag1 && !flag3);
    }
    return pass;
};


/**
 *  * 验证m~n位登录名,不允许纯数字；用户名只能由中文、英文、数字及及"_"、"-"组成
 *   *
 *    * @param param
 *     * @param val
 *      * @returns {boolean}
 *       */
Validator.prototype.loginName = function loginName(param, value) {
    var pass = true;

    if (qmUtil.isNotEmpty(value)) {
        var flag1 = this.rangeLength(param, value);
        var flag2 = this.pureDigital(true, value);
        //var flag3 = this.specialChar(true, value);
        var flag4 = /^[A-Za-z0-9\-_\u4E00-\u9FA5]+$/.test(value);

        pass = flag1 && !flag2 && flag4;
    }
    return pass;
};


/**
 * 验证纯数字,如果是纯数字则返回true , 否则返回false
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.pureDigital = function pureDigital(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /^[0-9]*$/.test(value);
    }

    return pass;
};


/**
 * 验证m~n位正整数,如果是正整数则返回true , 否则返回false
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.positiveInteger = function positiveInteger(param, value) {
    var pass = true;

    if (qmUtil.isNotEmpty(value)) {

        var flag1 = this.rangeLength(param, value);
        var flag2 = /^[0-9]*[1-9][0-9]*$/.test(value);

        pass = (flag1 && flag2);
    }

    return pass;
};


/**
 * 验证特殊字符,如果是则返回true,不是返回false
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.specialChar = function specialChar(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /((?=[\x21-\x7e]+)[^A-Za-z0-9])/.test(value);
    }

    return pass;
};


/**
 * 非法字符
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.forbbidenChar = function forbbidenChar(param, value) {
    var pass = true;

    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /[^&\\、,<>'"]/.test(value);
    }

    return pass;
};


/**
 * 年薪
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.yearPay = function yearPay(param, value) {
    var pass = true;

    if (qmUtil.isNotEmpty(value)) {

        var flag1;
        if ((value + "").indexOf(".") > 0) {
            param[1] = parseInt(param[1]) + 3;
            flag1 = this.rangeLength(param, value + "");
        }
        else {
            flag1 = this.rangeLength(param, value + "");
        }

        var flag2 = /^\d+(\.\d+)?$/.test(value);
        var flag3 = parseFloat(value) > 0 ? true : false;
        pass = (flag1 && flag2 && flag3);
    }

    return pass;
};


/**
 * equal校验
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.equal = function (param, value) {
    return this.data(param) == value;
};

/**
 * 邮编
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.zipCode = function zipCode(param, value) {
    var pass = true;
    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /^[0-9]{6}$/.test(value);
    }
    return pass;
};


/**
 * 手机号码
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.IsMobile = function IsMobile(param, value) {
    var pass = true;
    if (param === true && qmUtil.isNotEmpty(value)) {
        pass = /^((13\d)|14[57]|(15[^4,\D])|(17\d)|(18\d))(\d{8})$/.test(value);
    }
    return pass;
};


/**
 * 固定电话
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.tel = function tel(param, value) {
    var pass = true;
    if (param === true && qmUtil.isNotEmpty(value) && value != "-") {
        pass = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/.test(value);
    }
    return pass;
};

/**
 * requirePrefix
 * 必须要有某个前缀
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.requirePrefix = function requirePrefix(param, value) {
    let reg = new RegExp(`^${param}`);

    return reg.test(value);
};


/**
 * 固定电话或者手机号码
 *
 * @param param
 * @param value
 * @returns {boolean}
 */
Validator.prototype.telOrMobile = function telOrMobile(param, value) {
    var pass = true;
    if (param === true && qmUtil.isNotEmpty(value)) {
        var flag1 = this.mobile(true, value);
        var flag2 = this.tel(true, value);

        pass = (flag1 || flag2);
    }
    return pass;
};


Validator.prototype.pattern = function pattern(param, value) {
    var pass = true;
    if (value) {
        pass = value.match(param)
    }
    return pass;
};

/**
 * rule:{remote:{url:'xxx',valid(res){return !res}}}
 * @param param
 * @param value
 * @param path
 * @returns {boolean}
 */
Validator.prototype.remote = function remote(param, value, path) {
    var _this = this;
    var pass = false;
    if (!value) {
        pass = true;
    }
    if (value && param && param.url && param.valid) {
        _ajax({
            url: param.url.replace('{value}', encodeURIComponent(value)),
            origin: true,
            data: param.data ? (param.data(value) || {}) : {},
            async: false
        }).done(function (json) {
            param.message = function (msg) {
                if (!_this.rules[path].message) {
                    _this.rules[path].message = {};
                }
                _this.rules[path].message['remote'] = msg;
            }
            if (param.valid(json)) {
                pass = true;
            }
        })
    }
    return pass;
};

/**
 *  * 最大字节长度
 *   *
 *    * @param param
 *     * @param val
 *      * @returns {boolean}
 *       */
Validator.prototype.maxByteLength = function rangeLength(param, val) {
    if (isNaN(param)) {
        return false;
    }
    var totalLength = 0;
    var charCode;
    for (var i = 0; i < val.length; i++) {
        charCode = val.charCodeAt(i);
        if (charCode < 0x007f) {
            totalLength++;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
            totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
            totalLength += 3;
        } else {
            totalLength += 4;
        }
    }

    if (totalLength <= parseInt(param)) {
        return true;
    } else {
        return false;
    }
};

export default new Validator();