#!/bin/env node
/**
 * 应用配置信息
 */
module.exports = {
	/* 端口 */
	'app_port': process.env.APP_PORT || process.env.OPENSHIFT_NODEJS_PORT,
	
	/* 是否使用HTTPS */
	'use_ssl': true,
	'web_protocal': 'https://',
	
	/* 静态资源 */
	'static_host': 'https://' + process.env.OPENSHIFT_APP_DNS,
	
	/* 数据库配置参数 */
	'db_host': process.env.OPENSHIFT_MYSQL_DB_HOST,
	'db_port': process.env.OPENSHIFT_MYSQL_DB_PORT,
	'db_name': process.env.OPENSHIFT_GEAR_NAME,
	'db_user': process.env.OPENSHIFT_MYSQL_DB_USERNAME,
	'db_passwd': process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
	
	/* 日志配置 */
	'log_type': 'console',
	'log_level': 3,
	
	/* 广告推荐显示开关 */
	'ads_show': true
};
