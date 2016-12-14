/**
 * MySQL数据库模块
 *
 * 文档：https://github.com/mysqljs/mysql
 */

const log = require('../lib/log');
const config = require("../config");
const async = require('async');

const options = {
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

/* 连接池 */
const pool = require('mysql').createPool(options);

/**
 * 连接池
 */
exports.fetchPool = function() {
    return pool;
};

/**
 * 获取数据库连接
 */
exports.fetchConnetion = function(callback) {
    return pool.getConnection(function(err, conn) {
        callback(err, conn);
    });
};

/**
 * 释放数据库连接
 */
exports.freeConnetion = function(conn) {
    return conn.release();
};

/**
 * 1.执行更新
 *
 * 返回参数：
 *     INSERT: `insertId`
 *     INSERT/UPDATE/DELETE: `affectedRows`
 *     UPDATE: `changedRows`
 *
 * 2.执行查询
 */
const execUpdate = function (options) {
    async.waterfall([
        // 1.获取连接
        function (callback) {
            pool.getConnection(function (err, conn) {
                if (err) {
                    log.error('DB-获取数据库连接异常-' + require('util').inspect(err));
                }

                callback(err, conn);
            })
        },

        // 2.执行SQL+释放连接
        function (conn, callback) {
            var query = conn.query(options['sql'], (options['args'] || []), function (err, results) {
                if (err) {
                    log.error('DB-执行SQL异常-' + require('util').inspect(err));
                } else {
                    conn.release();
                }

                callback(err, results);
            });

            log.debug(query.sql);
        }
    ], function (err, results) {
        options['handler'](err, results);
    });
};

/**
 * 发布服务
 */
exports.execUpdate = execUpdate;
exports.execSelect = execUpdate;
