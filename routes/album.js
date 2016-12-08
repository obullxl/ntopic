/*
 * 相册模块（前台+后台）
 */
var config = require('../config');
var log = require('../lib/log');
var Topic = require('../models/topic-admin');
var Image = require('../models/image');
var EventProxy = require('eventproxy');
var RUtil = require('./rutil');

/**
 * 创建相册页面
 */
exports.create = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));
	var method = request.method || '';
	var data = RUtil.album_data(request);
	data.vpage = "album-create";
	data.title = '创建相册';
	data.breadcrumbs[2].label = '创建相册';
	
	// 表单页面
	if(method.toUpperCase() === "GET") {
		response.render('admin/album-create', data);
	}

	// 创建请求
	else if(method.toUpperCase() === "POST") {
		var body = request.body;
		log.info("JSON请求数据：\n" + require('util').inspect(body));

		var topic = {};
		topic.catg = body.catg;
		topic.title = body.title;
		topic.mflag = 'image';
		topic.mpath = body.mpath;
		topic.summary = body.summary;
		topic.content = '';

		// 增加主题
		log.info("新增相册:\n" + require('util').inspect(topic));
		Topic.insert(topic, function(results) {
			// log.info("新增主题成功:\n" + require('util').inspect(results));
			topic.id = results.insertId;

			response.json({
				success: true,
				bizLog: topic.id
			});
		});
	}
};

/**
 * 更新相册页面
 */
exports.update = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));
	var id = request.params.id;
	var method = request.method || '';
	var data = RUtil.album_data(request);
	data.vpage = "album-manage";
	data.title = '编辑相册';
	data.breadcrumbs[2].label = '编辑相册(' + id + ')';

	// 表单页面
	if(method.toUpperCase() === "GET") {
		Topic.findID(id, function(results) {
			if(results.length > 0) {
				data.topic = results[0];
			}

			response.render('admin/album-update', data);
		});
	}

	// 创建请求
	else if(method.toUpperCase() === "POST") {
		var topic = {};
		topic.id = id;
		topic.catg = body.catg;
		topic.title = body.title;
		topic.mflag = 'image';
		topic.mpath = body.mpath;
		topic.summary = body.summary;
		topic.content = '';

		// log.info("更新相册:\n" + require('util').inspect(topic));
		Topic.update(topic, function(results) {
			// log.info("更新主题成功:\n" + require('util').inspect(results));

			response.json({
				success: true,
				bizLog: topic.id
			});
		});
	}
};

/**
 * 相册增加图片
 */
exports.addImg = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));
	var id = request.params.id;
	var data = RUtil.album_data(request);
	data.vpage = "album-create";
	data.title = '编辑相册';
	data.breadcrumbs[2].label = '编辑相册(' + id + ')';

	// 创建请求
	var image = {};
	image.topic = id;
	image.mpath = body.image;
	image.summary = body.itext;

	// log.info("增加图片:\n" + require('util').inspect(image));
	Image.insert(image, function(results) {
		// log.info("更新主题成功:\n" + require('util').inspect(results));

		response.json({
			success: true,
			bizLog: image.id
		});
	});
};
