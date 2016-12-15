/**
 * 通用(Common)、核心(Core) 工具类
 */

/**
 * 明文字符串生成MD5摘要文本
 */
exports.md5 = function (text) {
    return require('crypto').createHash('md5').update(text).digest('hex');
};

/**
 * 字符串去掉前后空格
 */
exports.trim = function (text) {
    if (!text) {
        return text;
    }

    if (typeof(text) !== 'string') {
        throw Error('trim操作只适用于字符串-' + require('util').inspect(text));
    }

    return text.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 字符串去掉前后空格-对于NULL转换为空格
 */
exports.trimToEmpty = function (text) {
    if (!text) {
        return '';
    }

    const trim = this.trim(text);
    if (trim) {
        return trim;
    }

    return '';
};

/**
 * 检测对象是否为空
 *
 * console.log(isEmptyObject());           //true
 * console.log(isEmptyObject({}));         //true
 * console.log(isEmptyObject(null));       //true
 * console.log(isEmptyObject(23));         //true
 * console.log(isEmptyObject({"te": 2}));  //false
 */
exports.isEmptyObject = function (object) {
    if (typeof(object) === "object") {
        if (Object.prototype.toString.call(object) === '[object Object]') {
            var t;
            for (t in object) {
                // 非空
                return false;
            }
        }
    }

    // 空对象
    return true;
};

/**
 * 检测数组是否为空
 *
 * console.log(isEmptyArray());           //true
 * console.log(isEmptyArray({}));         //true
 * console.log(isEmptyArray([]));         //true
 * console.log(isEmptyArray(null));       //true
 * console.log(isEmptyArray(23));         //true
 * console.log(isEmptyArray([1]));        //false
 * console.log(isEmptyArray(['1']));      //false
 */
exports.isEmptyArray = function (array) {
    if (typeof(array) === "object") {
        if (Object.prototype.toString.call(array) === '[object Array]') {
            return array.length <= 0;
        }
    }

    // 空数组
    return true;
};
