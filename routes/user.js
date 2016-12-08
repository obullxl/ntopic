/**
 * 用户页面模块
 */
var User = require("../models/user");
var log = require("../lib/log");
var dateformat = require('dateformat');

/**
 * Create a user
 */
exports.create = function(request, response) {
	var pathname = url.parse(request.url).pathname;
};

/**
 * 用户管理页面
 */
exports.manage = function(request, response) {
	// log.info("用户登录：" + require('util').inspect(request.method));
	var data = {
		title: '用户管理',
		url: request.path,
		breadcrumbs: [{
			label: "管理后台",
			href: "/admin/user-manage.html"
		}, {
			label: "用户管理",
		}],
		dateFormat: function(date) {
			return dateformat(date, "yyyy-mm-dd hh:MM:ss");
		}
	};

	User.findAll(function(results) {
		data.users = results;
		
		// 返回页面
		response.render('admin/user-manage', data);
	});
};
