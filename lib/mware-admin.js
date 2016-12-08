/**
 * 管理员中间件
 */

var log = require("./log");

/**
 * 登录拦截中间件
 */
module.exports = function() {
	return function(request, response, next) {
		// log.info("中间件：" + require('util').inspect(request.originalUrl));
		// log.info("会话信息：" + require('util').inspect(request.session));

		if(!(request.session.admin)) {
			request.session.lastpage = request.originalUrl;
			response.redirect("/login.html");
		}

		// 下一个中间件
		next();
	}
};
