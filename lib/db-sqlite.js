/**
 * SQLite数据库模块
 *
 * 文档：https://github.com/mapbox/node-sqlite3/wiki/API
 */

const log = require('./log');
const config = require("../config");

const fs = require("fs");
const dbfile = config['db_file'];
const exists = fs.existsSync(dbfile);

if (exists) {
    console.log('SQLite存在数据文件: %s', dbfile);
} else {
    console.error('SQLite数据文件不存在: %s', dbfile);
}

/**
 * 执行更新
 *
 * 返回参数：
 *     INSERT: `lastID`
 *     UPDATE/DELETE: `changes`
 */
exports.execUpdate = function (options) {
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(dbfile);

    // 参数
    var sql = options['sql'];
    var args = options['args'] || [];
    var handler = options['handler'];

    db.run(sql, args, function (error, results) {
        if (error) {
            log.error('SQLite-执行Update语句异常！');
            throw error;
        }

        // 处理结果
        handler(results);
    });

    log.debug(sql);

    // 关闭连接
    db.close();
};

/**
 * 执行查询
 */
exports.execSelect = function (options) {
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(dbfile);

    // 参数
    var sql = options['sql'];
    var args = options['args'] || [];
    var handler = options['handler'];

    db.all(sql, args, function (error, results) {
        if (error) {
            log.error('SQLite-执行Select语句异常！');
            throw error;
        }

        // 处理结果
        handler(results);
    });

    log.debug(sql);

    // 关闭连接
    db.close();
};
