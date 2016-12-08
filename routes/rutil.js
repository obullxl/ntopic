/**
 * 路由工具类
 */

var config = require('../config');
var enms = require('../lib/enms');
var dateformat = require('dateformat');

/**
 * 公用数据
 */
exports.data = function(request) {
	return {
		url: request.path,
		vpage: '',
		catg: '',
		title: '',
		config: config,
		static_host: config.static_host,
		breadcrumbs: [{
			label: "管理后台",
			href: "/admin/topic-manage.html"
		}, {
			label: "主题管理",
			href: "/admin/topic-manage.html"
		}, {
			label: '创建主题'
		}],
		catgs: enms.topicCatgEnums(),
		catgValue: function(catg) {
			return enms.topicCatgValue(catg);
		},
		topicCatgCodes: enms.topicCatgCodes(),
		md5: function(text) {
			return require('crypto').createHash('md5').update(text).digest('hex');
		},
		dateFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd");
		},
		datetimeFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd hh:mm:ss");
		}
	};
};

/**
 * 前台数据
 */
exports.front_data = function(request) {
	return {
		url: request.path,
		title: '最新 Java/Node.js/Spring/MySQL/数据库 技术博客',
		config: config,
		static_host: config.static_host,
		catgValue: function(catg) {
			return enms.topicCatgValue(catg);
		},
		topicCatgCodes: enms.topicCatgCodes(),
		md5: function(text) {
			return require('crypto').createHash('md5').update(text).digest('hex');
		},
		dateFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd");
		},
		datetimeFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd hh:mm:ss");
		}
	};
};

exports.album_data = function(request) {
	return {
		url: request.path,
		vpage: '',
		catg: '',
		title: '',
		config: config,
		static_host: config.static_host,
		breadcrumbs: [{
			label: "管理后台",
			href: "/admin/topic-manage.html"
		}, {
			label: "相册管理",
			href: "/admin/topic-manage.html?t=album"
		}, {
			label: '创建相册'
		}],
		catgs: enms.topicCatgEnums(),
		catgValue: function(catg) {
			return enms.topicCatgValue(catg);
		},
		topicCatgCodes: enms.topicCatgCodes(),
		md5: function(text) {
			return require('crypto').createHash('md5').update(text).digest('hex');
		},
		dateFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd");
		},
		datetimeFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd hh:mm:ss");
		}
	};
};

/**
 * 不支持的方法
 */
exports.notSupportMethod = function(request, response) {
	response.writeHead(404, {
		'Content-Type': 'text/html'
	});

	response.end('The request method[' + request.method.toUpperCase() + '] is not supported!');
};
