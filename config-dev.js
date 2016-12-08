#!/bin/env node

/**
 * 应用配置信息
 */
module.exports = {
	/* 端口 */
	'app_port': process.env.APP_PORT,

	/* 是否使用HTTPS */
	'use_ssl': false,
	'web_protocal': 'http://',
	
	/* 静态资源 */
	'static_host': 'http://obullxl.github.io',
	
	/* 数据库配置参数 */
	'db_type': process.env.DB_TYPE || 'mysql',
	'db_file': process.env.DB_FILE || global.ROOT + '/ntopic.sqlite',

	/* 日志配置 */
	'log_type': 'console',
	'log_level': 0,
	
	/* 广告推荐显示开关 */
	'ads_show': process.env.ADS_SHOW || false
};
