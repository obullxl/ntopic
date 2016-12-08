/**
 * 缓存模块-全局参数,本地起效
 */

global.cache = {};
var cache = global.cache;

exports.get = function(key) {
	return cache[key];
};

exports.set = function(key, obj) {
	cache[key] = obj;
};

exports.exist = function(key) {
	return !(cache[key] === undefined);
};

exports.keySet = function() {
	var keySets = new Array();
	for(key in cache) {
		if(!(typeof (cache[key]) == "function")) {
			keySets.push(key);
		}
	}

	return keySets;
};

exports.remove = function(key) {
	delete cache[key];
};

exports.removeAll = function() {
	for(key in cache) {
		delete cache[key];
	}
};
