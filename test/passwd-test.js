#!/bin/env node

var crypto = require('crypto');

var txt = '888888';
console.log(txt + '<=>' + crypto.createHash('md5').update(txt).digest('hex'));

txt = '12321';
console.log(txt + '<=>' + crypto.createHash('md5').update(txt).digest('hex'));

