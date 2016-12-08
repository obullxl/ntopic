/**
 * MySQL数据库模块
 *
 * 文档：https://github.com/mysqljs/mysql
 */

var log = require('./log');
var config = require("../config");

var options = {
    'host': config.db_host,
    'port': parseInt(config.db_port),
    'database': config.db_name,
    'user': config.db_user,
    'password': config.db_passwd,
    'charset': config.db_charset,
    'connectionLimit': config.db_conn_limit,
    'supportBigNumbers': true,
    'bigNumberStrings': true
};

log.info('MySQL连接信息: ' + require('util').inspect(options));

var mysql = require('mysql');
var pool = mysql.createPool(options);

/**
 * 执行更新
 *
 * 返回参数：
 *     INSERT: `insertId`
 *     INSERT/UPDATE/DELETE: `affectedRows`
 *     UPDATE: `changedRows`
 */
exports.execUpdate = function (options) {
    pool.getConnection(function (error, connection) {
        if (error) {
            log.error('DB-获取数据库连接异常！');
            throw error;
        }

        // 参数
        var sql = options['sql'];
        var args = options['args'] || [];
        var handler = options['handler'];

        var query = connection.query(sql, args, function (error, results) {
            if (error) {
                log.error('DB-执行查询语句异常！');
                throw error;
            }

            // 处理结果
            handler(results);
        });

        log.debug(query.sql);

        // 返回连接池
        connection.release(function (error) {
            if (error) {
                log.error('DB-关闭数据库连接异常！');
                throw error;
            }
        });
    });
};

/**
 * 执行查询
 */
exports.execSelect = this.execUpdate;