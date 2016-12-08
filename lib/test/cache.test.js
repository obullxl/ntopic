/**
 * 缓存测试
 */

var cache = require('../cache.js');
var assert = require('assert');

cache.set('testKey1', 'testValue1');
assert.equal(cache.get('testKey1'), 'testValue1', 'cache test1 error');
console.log(require('util').inspect(cache.keySet()));

cache.set('testKey2', 'testValue2');
assert.equal(cache.get('testKey2'), 'testValue2', 'cache test2 error');
console.log(require('util').inspect(cache.keySet()));

cache.remove('testKey1');
assert.ok(!cache.exist('testKey1'), 'remove test1 error');
assert.equal(cache.get('testKey2'), 'testValue2', 'cache remove test2 error');
console.log(require('util').inspect(cache.keySet()));

cache.removeAll();
assert.ok(!cache.exist('testKey1'), 'removeAll test1 error');
assert.ok(!cache.exist('testKey2'), 'removeAll test2 error');
console.log(require('util').inspect(cache.keySet()));
