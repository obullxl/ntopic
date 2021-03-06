#!/bin/env node

/**
 * 应用配置信息
 */

var catg = 'dev';
if (process.env.BAE_ENV_AK) {
    catg = 'bae';
} else if (process.env.OPENSHIFT_GEAR_NAME) {
    catg = 'rhc';
} else if (process.env.HEROKU) {
    catg = 'heroku';
} else if (process.env.VCAP_APP_PORT) {
    catg = 'mopaas';
}

console.log('NTopic配置参数类型: %s', catg);

const config = require('./config/config-' + catg + '.js');
module.exports = {
    /* 端口 */
    'app_port': config['app_port'] || process.env.PORT || process.env.APP_PORT || 3000,

    /* 是否使用HTTPS */
    'use_ssl': config['use_ssl'] || process.env.USE_SSL || false,
    'web_protocal': config['web_protocal'] || 'http://',

    /* 静态资源 */
    'static_host': config['static_host'] || process.env.STATIC_HOST || 'http://obullxl.github.io',

    /* 数据库配置参数 */
    'db_type': config['db_type'] || process.env.DB_TYPE,
    'db_file': config['db_file'] || process.env.DB_FILE || global.ROOT + '/ntopic.sqlite',

    'db_host': config['db_host'] || process.env.DB_HOST,
    'db_port': config['db_port'] || process.env.DB_PORT,
    'db_name': config['db_name'] || process.env.DB_NAME,
    'db_user': config['db_user'] || process.env.DB_USER,
    'db_passwd': config['db_passwd'] || process.env.DB_PASSWD,
    'db_charset': 'UTF8',
    'db_conn_limit': 5,

    /* 日志配置 */
    'log_type': config['log_type'] || process.env.LOG_TYPE || 'console',
    'log_level': config['log_level'] || process.env.LOG_LEVEL || 1, // 0-TRACE, 1-DEBUG, 2-INFO, 3-WARN, 4-ERROR, 5-FETAL

    /* 缓存配置 */
    'cache_type': 'global',

    /* 广告推荐显示开关 */
    'ads_show': config['ads_show'] || process.env.ADS_SHOW || true,

    'uploadPath': './upload/',
    'pageSize': 30
};
