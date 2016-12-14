/**
 * 用户数据访问模块
 */

const Log = require('../lib/log');
const DAS = require('./das-mysql');

const async = require('async');

/**
 * 数据表名
 */
const USER_BASE   = 'nt_user_base';
const USER_SENSE  = 'nt_user_sense';
const USER_ATTACH = 'nt_user_attach';

/**
 * 常用SQL
 */
// const existUserName

/**
 * 创建用户信息(UserID值)
 */
exports.createUser = function(opts, callback) {
	Log.debug('开始创建用户' + require('util').inspect(opts));

	// 事务
	async.waterfall([
		// 1.获取连接
		function(cback) {
			DAS.fetchConnection(cback);
		},

		// 2.开启事务
		function(conn, cback) {
			conn.beginTransaction(function(err) {
				if(err) {
					Log.warn('UserDAS-创建用户-开启数据库事务失败.');
					cback(err);
					return;
				}

				// 基本信息
				var uid = 0;
				conn.query('INSERT INTO posts SET title=?', title, function(err, result) {
				    if (err) {
				    	Log.warn('UserDAS-创建用户-新建用户基本信息失败.');
				    	return conn.rollback(function() {
				    		cback(err);
				      	});
				    }

				    uid = result.insertId;

				    // 敏感信息
				    conn.query('INSERT INTO posts SET title=?', title, function(err, result) {
					    if (err) {
					    	Log.warn('UserDAS-创建用户-新建用户敏感信息失败.');
					    	return conn.rollback(function() {
					    		cback(err);
					      	});
					    }

					    // 提交事务
					    conn.commit(function(err) {
							if (err) {
								Log.warn('UserDAS-创建用户-提交数据库事务失败.');
								return conn.rollback(function() {
									cback(err);
								});
							}

							// 新建用户成功
							Log.log('UserDAS-创建用户成功' + require('util').inspect(opts));
							cback(uid);
						});
					});
				});
			});
		}
	], function(err, uid) {
		if(err) {
			callback(err);
		} else {
			callback(null, uid);
		}
	});
};

/**
 * 检测用户名是否存在(true/false)
 */
exports.existUserName = function(name, callback) {
	DAS.execSelect({
		'sql'    : `SELECT id FROM ${USER_BASE} WHERE name=? LIMIT 1`,
		'args'   : [name],
		'handler': function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(null, results.length>0);
			}
		}
	});
};

/**
 * 用户名登录(UserSense对象)
 */
exports.onUserLogin = function(uname, passwd, callback) {
	DAS.execSelect({
		'sql'    : `SELECT * FROM ${USER_SENSE} WHERE uname=? AND passwd=? LIMIT 1`,
		'args'   : [uname, passwd],
		'handler': function(err, results) {
			if(err) {
				callback(err);
			} else {
				callback(null, results);
			}
		}
	});
};
