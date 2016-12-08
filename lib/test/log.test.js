/**
 * 日志测试
 */

var log = require('../log.js');
var config = require('../../config.js');

log.fetal('1-test-1');
log.trace('1-trace-message');
log.debug('1-debug-message');
log.info('1-info-message');
log.warn('1-warn-message');
log.error('1-error-message');
log.fetal('1-fetal-message');

config.log_level = 2;
log.fetal('2-test-2');
log.trace('2-trace-message');
log.debug('2-debug-message');
log.info('2-info-message');
log.warn('2-warn-message');
log.error('2-error-message');
log.fetal('2-fetal-message');
