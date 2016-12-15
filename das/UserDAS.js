/**
 * 用户数据访问模块
 */

const Log = require('../lib/log');
const DAS = require('./das-mysql');

const async = require('async');

/**
 * 数据表名
 */
const USER_BASE = 'nt_user_base';
const USER_SENSE = 'nt_user_sense';
const USER_ATTACH = 'nt_user_attach';

/**
 * 常用SQL
 */
// const existUserName

/**
 * 用户状态枚举对象
 */
const StateEnums = {
    LOCK: {state: 0, message: '锁定'},
    REGST: {state: 1, message: '注册'}
};

/**
 * 用户基本信息枚举
 */
exports.findBaseStateEnums = function () {
    return StateEnums;
};

/**
 * 创建用户信息
 *
 * 请求参数:
 * {
 *   name: 'ntopic',
 *   email: 'ntopic.cn@gmaill.com',
 *   passwd: '密文'
 * }
 *
 * 返回结果:
 * {
 *   userID: 1L,
 *   senseID: 2L
 * }
 */
exports.createUser = function (opts, callback) {
    Log.debug('开始创建用户' + require('util').inspect(opts));

    // 1.获取连接
    const step1 = function (cback) {
        DAS.fetchConnection(function (err, conn) {
            cback(err, conn);
        });
    };

    // 2.开启事务
    const step2 = function (conn, cback) {
        conn.beginTransaction(function (err) {
            if (err) {
                Log.warn('UserDAS-创建用户-开启数据库事务失败.');
                cback(err, conn);
                return;
            }

            cback(conn);
        });
    };

    // 3.存储基本信息
    const step3 = function (conn, cback) {
        var sql = 'INSERT INTO ${USER_BASE}(state,ctime,mtime,name,nick';
        sql += ',wealth,grade,ccircle,cattach,sattach,ctopic,etopic,cimage,eimage,creply,ereply,clike,ccollect';
        sql += ') VALUES(?,NOW(),NOW(),?,?,0,0,0,0,0,0,0,0,0,0,0,0,0)';

        const args = [StateEnums.REGST.code, opts.name, opts.name];

        Log.warn('UserDAS-创建用户-新建用户基本信息[' + sql + '].');
        conn.query(sql, args, function (err, result) {
            if (err) {
                Log.warn('UserDAS-创建用户-新建用户基本信息失败.');
                cback(err, conn);
                return;
            }

            const uid = result.insertId;
            Log.warn('UserDAS-创建用户-新建用户基本信息成功[${uid}].');
            cback(null, conn, uid);
        });
    };

    // 4.存储敏感信息
    const step4 = function (conn, uid, cback) {
        var sql = 'INSERT INTO ${USER_SENSE}(mtime,admin,uname,email,passwd,gender';
        sql += ') VALUES(NOW(),0,?,?,?,0)';

        const args = [opts.name, opts.email, opts.passwd];

        Log.warn('UserDAS-创建用户-新建用户敏感信息[' + sql + ']');
        conn.query(sql, args, function (err, result) {
            if (err) {
                Log.warn('UserDAS-创建用户-新建用户敏感信息失败.');
                cback(err, conn);
                return;
            }

            const sid = result.insertId;
            Log.warn('UserDAS-创建用户-新建用户敏感信息成功[${sid}].');
            cback(null, conn, uid, sid);
        });
    };

    // 5.提交数据库事务
    const step5 = function (conn, uid, sid, cback) {
        Log.warn('UserDAS-创建用户-新建用户信息成功-提交事务.');
        conn.commit(function (err) {
            if (err) {
                Log.warn('UserDAS-创建用户-提交数据库事务失败.');
                cback(err, conn);
                return;
            }

            // 新建用户成功
            Log.log('UserDAS-创建用户成功' + require('util').inspect(opts));
            cback(conn, uid, sid);
        });
    };

    // 最终处理器
    const final = function (err, conn, uid, sid) {
        if (err) {
            Log.warn('UserDAS-创建用户-新建用户信息失败-回滚事务.');

            callback(err);

            if (conn) {
                return conn.rollback();
            }
        } else {
            callback(null, {
                'userID': uid,
                'senseID': sid
            });
        }
    };

    // 编排
    async.waterfall([step1, step2, step3, step4, step5], final);
};

/**
 * 检测用户名是否存在(true/false)
 */
exports.existUserName = function (name, callback) {
    DAS.execSelect({
        'sql': 'SELECT id FROM ${USER_SENSE} WHERE name=? LIMIT 1',
        'args': [name],
        'handler': function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results.length > 0);
            }
        }
    });
};

/**
 * 检测电子邮箱是否存在(true/false)
 */
exports.existEmailBox = function (email, callback) {
    DAS.execSelect({
        'sql': 'SELECT id FROM ${USER_BASE} WHERE email=? LIMIT 1',
        'args': [email],
        'handler': function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results.length > 0);
            }
        }
    });
};

/**
 * 用户名登录(UserSense对象)
 */
exports.onUserLogin = function (uname, passwd, callback) {
    DAS.execSelect({
        'sql': 'SELECT * FROM ${USER_SENSE} WHERE uname=? AND passwd=? LIMIT 1',
        'args': [uname, passwd],
        'handler': function (err, usense) {
            if (err) {
                callback(err);
            } else {
                callback(null, usense);
            }
        }
    });
};
