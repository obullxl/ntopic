/**
 * 通用(Common)、核心(Core) 工具类
 */

const CUtil = require('./cutil');

/**
 * 明文字符串生成MD5摘要文本
 */
console.log('=========md5==========');
console.log('md5', '1', CUtil.md5('1'));

/**
 * 字符串去掉前后空格
 */
console.log('=========trim==========');
console.log(CUtil.trim(null));
// console.log(CUtil.trim([3]));  // Error
console.log(typeof('   3   '));
console.log(CUtil.trim('   3   '));

/**
 * 字符串去掉前后空格-对于NULL转换为空格
 */
console.log('=========trimToEmpty==========');
console.log(CUtil.trimToEmpty(null));
console.log(CUtil.trimToEmpty('   3   '));

/**
 * 检测对象是否为空
 *
 * console.log(isEmptyObject());           //true
 * console.log(isEmptyObject({}));         //true
 * console.log(isEmptyObject(null));       //true
 * console.log(isEmptyObject(23));         //true
 * console.log(isEmptyObject({"te": 2}));  //false
 */
console.log('=========isEmptyObject==========');
console.log(CUtil.isEmptyObject());
console.log(CUtil.isEmptyObject({}));
console.log(CUtil.isEmptyObject(null));
console.log(CUtil.isEmptyObject('   3   '));
console.log(CUtil.isEmptyObject(23));
console.log(CUtil.isEmptyObject({"te": 2}));

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
console.log('=========isEmptyArray==========');
console.log(CUtil.isEmptyArray());
console.log(CUtil.isEmptyArray({}));
console.log([].length);
console.log(CUtil.isEmptyArray([]));
console.log(CUtil.isEmptyArray(null));
console.log(CUtil.isEmptyArray('   3   '));
console.log(CUtil.isEmptyArray(23));
console.log(CUtil.isEmptyArray([1]));
console.log(CUtil.isEmptyArray(['1']));
