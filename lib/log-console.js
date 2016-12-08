/**
 * 日志模块-控制台输出-文件
 */

exports.trace = function(text) {
	console.log(text);
};

exports.debug = function(text) {
	console.log(text);
};

exports.info = function(text) {
	console.info(text);
};

exports.warn = function(text) {
	console.warn(text);
};

exports.error = function(text) {
	console.error(text);
};

exports.fetal = function(text) {
	console.error(text);
};
