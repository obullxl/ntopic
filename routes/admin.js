/*
 * 主题模块
 */
var config = require('../config');
var log = require('../lib/log');
var Topic = require('../models/topic-admin');
var EventProxy = require('eventproxy');
var RUtil = require('./rutil');

/**
 * 后台主页面
 */
exports.index = function(request, response) {
	response.redirect("/admin/topic-manage.html");
};

/**
 * 创建主题页面
 */
exports.create = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));

	var data = RUtil.data(request);
	data.vpage = "topic-create";
	data.title = '创建主题';
	data.breadcrumbs[2].label = '创建主题';

	// log.info("Web返回：\n" + require('util').inspect(data));

	response.render('admin/topic-create', data);
};

/**
 * 更新主题页面
 */
exports.update = function(request, response) {
	var id = request.params.id;
	// log.info("更新主题: " + id);
	// log.info("Web请求：" + require('util').inspect(request));

	var data = RUtil.data(request);
	data.vpage = "topic-manage";
	data.title = '编辑主题';
	data.breadcrumbs[2].label = '编辑主题(' + id + ')';

	Topic.findID(id, function(results) {
		if(results.length > 0) {
			data.topic = results[0];
		}

		response.render('admin/topic-update', data);
	});
};

/**
 * 增加或是更新主题信息<br/> 请求JSON数据：
 * 
 * <pre>
 * {
 * 	catg: 'TOP',
 * 	title: '主题标题',
 * 	summary: '主题描述',
 * 	content: '主题内容'
 * }
 * </pre>
 * 
 * 返回JSON数据：
 * 
 * <pre>
 * {
 * 	success: true / false,
 * 	bizLog: '',
 * 	respCode: 'SYSTEM_ERROR',
 * 	respDesp: '系统异常'
 * }
 * </pre>
 */
exports.store = function(request, response) {
	var body = request.body;
	// log.info("JSON请求数据：\n" + require('util').inspect(body));

	var topic = {};
	topic.id = body.id || 0;
	topic.catg = body.catg;
	topic.mflag = 'F';
	topic.mpath = '';
	topic.title = body.title;
	topic.summary = body.summary;
	topic.content = body.content;

	if(topic.id <= 0) {
		// log.info("新增主题:\n" + require('util').inspect(topic));
		Topic.insert(topic, function(results) {
			// log.info("新增主题成功:\n" + require('util').inspect(results));
			topic.id = results.insertId;

			response.json({
				success: true,
				bizLog: topic.id
			});
		});
	} else {
		// log.info("更新主题:\n" + require('util').inspect(topic));
		// log.info("主题内容:\n" + topic.content);
		Topic.update(topic, function(results) {
			log.info("更新主题成功:\n" + require('util').inspect(results));

			response.json({
				success: true,
				bizLog: topic.id
			});
		});
	}
};

/**
 * 查看主题页面
 */
exports.view = function(request, response) {
	var tpcId = request.params.id;

	var data = RUtil.data(request);
	data.vpage = "topic-manage";
	data.tpcId = tpcId;
	data.title = '查看主题';
	data.breadcrumbs[2].label = '查看主题(' + tpcId + ')';

	Topic.findID(tpcId, function(results) {
		// log.info("主题信息: " + require('util').inspect(results));

		if(results.length > 0) {
			data.topic = results[0];
		}

		var vt = request.query.v;
		if(vt) {
			response.render('admin/topic-view-' + vt, data);
		} else {
			response.render('admin/topic-view-lean', data);
		}
	});
};

/**
 * 主题管理页面
 */
exports.manage = function(request, response) {
	var data = RUtil.data(request);
	data.vpage = "topic-manage";
	data.title = '主题管理';
	data.breadcrumbs[2].label = '主题管理';

	// 数据类型
	var catgs = [];
	if(request.query.t) {
		catgs.push(request.query.t);
		data.catg = request.query.t;
	} else {
		catgs = data.topicCatgCodes;
	}

	// 分页信息
	var pageSize = config.pageSize || 30;
	var pageNo = request.query.p || 1;
	pageNo = (pageNo < 1) ? 1 : pageNo;

	var args = {
		catgs: catgs,
		offset: (pageNo - 1) * pageSize,
		limit: pageSize
	};

	// 并行处理
	var ep = EventProxy.create("count", "topics", function(count, topics) {
		var pages = (count + pageSize - 1) / pageSize;
		var start = pageNo - 5;
		start = (start > 0) ? start : 1;
		var finish = pageNo + 5;
		finish = (finish > pages) ? pages : finish;

		pages = [];
		for(i = start; i <= finish; i++) {
			pages.push(i);
		}

		// 数据
		data.page = pageNo;
		data.pages = pages;
		data.count = count;
		data.topics = topics;

		// log.info("结果数据: " + require('util').inspect(data));

		// 返回页面
		response.render('admin/topic-manage', data);
	});

	Topic.count(args, function(count) {
		ep.emit("count", count);
	});

	Topic.findPage(args, function(results) {
		ep.emit("topics", results);
	});
};

/**
 * 系统参数
 */
exports.envargs = function(request, response) {
	var data = RUtil.data(request);
	data.vpage = "system-envargs";
	data.title = '系统管理';
	data.breadcrumbs[1].label = '系统管理',
	data.breadcrumbs[1].href = '/admin/system-envargs.html',
	data.breadcrumbs[2].label = '系统参数';
	
	data.config = config;
	data.env = process.env;
	
};
