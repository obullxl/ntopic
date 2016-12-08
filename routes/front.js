/**
 * 前台页面模块
 */
var config = require('../config');
var log = require('../lib/log');
var Reply = require('../models/reply');
var Topic = require('../models/topic-front');
var EventProxy = require('eventproxy');
var RUtil = require('./rutil');

/**
 * 关于
 */
exports.about = function(request, response) {
	var data = RUtil.front_data(request);
	data.catg = 'about';

	// 返回页面
	response.render('front-about', data);
};

/**
 * 美图
 */
exports.album = function(request, response) {
	var data = RUtil.front_data(request);
	data.catg = 'album';
	
	// 返回页面
	response.render('front-album', data);
};

/**
 * 首页-列表
 */
exports.index = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));
	
	var data = RUtil.front_data(request);
	data.catg = 'index';

	var vt = request.query.vt;
	if(vt) {
		data.vclean = (vt === "clean");
	} else {
		data.vclean = false;
	}

	// SQL参数
	var args = {};

	// 请求参数
	var catg = request.params.catg;
	if(catg) {
		data.catg = catg;
		args.catgs = [catg];
	}

	var pageSize = config.pageSize || 30;
	var pageNo = request.params.page || 1;
	args.page = (pageNo < 1) ? 1 : pageNo;
	args.offset = (pageNo - 1) * pageSize;
	args.limit = pageSize;

	// log.info("SQL参数：" + require('util').inspect(args));

	// 并行处理
	var ep = EventProxy.create("topics", "topVisits", "topReplys", function(topics, topVisits, topReplys) {
		// 数据
		data.page = pageNo;
		data.topics = topics;
		data.topVisits = topVisits;
		data.topReplys = topReplys;

		// 返回页面
		response.render('front-index', data);
	});

	Topic.findList(args, function(results) {
		ep.emit("topics", results);
	});

	Topic.findTopVisits(args, function(results) {
		ep.emit("topVisits", results);
	});

	Topic.findTopReplys(args, function(results) {
		ep.emit("topReplys", results);
	});
};

/**
 * 主题-查看
 */
exports.topic = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));

	var data = RUtil.front_data(request);
	data.catg = 'index';
	
	var vt = request.query.vt;
	if(vt) {
		data.vclean = (vt === "clean");
	} else {
		data.vclean = false;
	}

	// log.info("Web请求Data：" + require('util').inspect(data));

	// SQL参数
	var args = {};

	// 请求参数
	var id = request.params.id;
	var catg = request.params.catg;
	if(catg) {
		data.catg = catg;
		args.catgs = [catg];
	}

	// log.info("SQL参数：" + require('util').inspect(args));

	// 并行处理
	var ep = EventProxy.create("topic", "visit", "replys", "topVisits", "topReplys", function(topic, visit, replys, topVisits, topReplys) {
		// 数据
		if(topic.length > 0) {
			data.topic = topic[0];
		}
		data.replys = replys;
		data.topVisits = topVisits;
		data.topReplys = topReplys;

		// 返回页面
		response.render('front-topic', data);
	});

	Topic.findID(id, function(results) {
		ep.emit("topic", results);
	});

	Topic.updateVisit(id, function(results) {
		ep.emit("visit", results);
	});

	Reply.findAll(id, function(results) {
		ep.emit("replys", results);
	});

	Topic.findTopVisits(args, function(results) {
		ep.emit("topVisits", results);
	});

	Topic.findTopReplys(args, function(results) {
		ep.emit("topReplys", results);
	});
};

/**
 * 主题回复
 */
exports.reply = function(request, response) {
	// log.info("Web请求：" + require('util').inspect(request));

	var body = request.body;
	// 并行处理
	var ep = EventProxy.create("insert", "update", function(insert, update) {
		// 返回页面
		response.redirect(body.ufrom);
	});

	var reply = {};
	reply.topic = body.topic;
	reply.title = body.title;
	reply.uname = body.uname;
	reply.uemail = body.uemail;
	reply.usite = body.usite;
	reply.content = body.content;
	Reply.insert(reply, function(results) {
		ep.emit("insert", results);
	});

	Topic.updateReply(body.topic, function(results) {
		ep.emit("update", results);
	});
};
