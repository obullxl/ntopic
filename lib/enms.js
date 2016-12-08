/**
 * 系统代码模块
 */
var log = require('./log');

/**
 * 主题类型枚举
 */
var topicCatgEnums = [{
	'key': 'blog',
	'value': '博客'
}, {
	'key': 'album',
	'value': '美图'
}, {
	'key': 'news',
	'value': '资讯'
}, {
	'key': 'misc',
	'value': '杂谈'
}];

/**
 * 所有枚举对象
 */
exports.topicCatgEnums = function() {
	return topicCatgEnums;
};

/**
 * 所有枚举代码
 */
exports.topicCatgCodes = function() {
	var codes = [];

	topicCatgEnums.forEach(function(enm) {
		codes.push(enm.key);
	});

	return codes;
};

/**
 * 获取枚举值
 */
exports.topicCatgValue = function(catg) {
	var value = 'UNKOWN';
	topicCatgEnums.forEach(function(enm) {
		if(enm.key === catg) {
			value = enm.value;
		}
	});

	return value;
};
