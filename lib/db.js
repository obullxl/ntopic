/**
 * 数据库模块
 */
const MYSQL = 'mysql';
const SQLITE = 'sqlite';

const log = require('./log');
const config = require("../config");

var dbtype = MYSQL;
if (config['db_type'] === SQLITE) {
    dbtype = SQLITE;
}

log.info('DB类型: ' + dbtype + '\t\t= ' + __filename);

/* 数据库 */
const db = require('./db-' + dbtype);

/**
 * 执行更新
 *
 * options['sql'] SQL-占位符
 * options['args'] 数值-SQL占位符值
 * options['handler'] 处理器-SQL执行结果
 */
exports.execUpdate = function (options) {
    db.execUpdate(options);
};

/**
 * 执行查询
 *
 * options['sql'] SQL-占位符
 * options['args'] 数值-SQL占位符值
 * options['handler'] 处理器-SQL执行结果
 */
exports.execSelect = function (options) {
    db.execSelect(options);
};
