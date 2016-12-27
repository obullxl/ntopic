/**
 * 公用页面模块
 */

var log = require("../lib/log");
var config = require('../config');
var User = require('../models/user');
var RUtil = require('./rutil');

/**
 * 登录页面
 */
exports.webview = function (req, res) {
    var data = RUtil.front_data(req);
    data.title = '页面测试';

    data.uname = req.query.uname || '';
    data.email = req.query.email || '';
    data.logined = (data.uname !== '');

    res.render(req.query.view, data);
};

/**
 * 信息找回
 */
exports.forget = function (req, res) {
    var data = RUtil.front_data(req);
    data.title = '页面测试';

    data.uname = req.query.uname || '';
    data.email = req.query.email || '';
    data.logined = (data.uname !== '');

    res.render('./forget/' + req.params.page, data);
};

/**
 * 页面导航
 */
exports.routes = function (req, res) {
    var data = RUtil.front_data(req);
    data.title = '页面测试';

    data.uname = req.query.uname || '';
    data.email = req.query.email || '';
    data.logined = (data.uname !== '');

    res.render(req.params.page, data);
};
