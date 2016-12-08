#!/bin/env node

/* 全局配置 */
const config = require('./config');
config['db_file'] = __dirname + '/ntopic.sqlite';

/* 应用配置 */
const uuidv4 = require('uuid/v4');
const express = require('express');
const morgan = require('morgan')
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const serveStatic = require('serve-static');
const errorhandler = require('errorhandler');

const app = express();
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('port', config['app_port'] || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(favicon("./favicon.png"));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser('ntopic'));
app.use(session({
	secret: 'ntopic',
	cookie: { maxAge: 60000 },
	genid: function(req) {
    	return uuidv4(); 
	}
}));

/* 开发环境 */
if('development' == app.get('env')) {
	app.use(errorhandler());
}

/* 前台页面 */
var front = require('./routes/front');
app.get('/', front.index);
app.get('/index.html', front.index);
app.get('/index-:catg-:page.html', front.index);
app.get('/index-:catg.html', front.index);

app.get('/about.html', front.about);
app.get('/album.html', front.album);

app.get('/topic-:catg-:id.html', front.topic);
app.post("/topic-reply", front.reply);

/* 登录页面 */
var index = require('./routes/index.js');
app.get('/login.html', index.login);
app.post('/login.html', index.login);
app.get('/logout.html', index.logout);

/* 用户页面 */
var user = require('./routes/user');
app.get('/admin/user-manage.html', user.manage);

/* 文件配置 */
var file = require('./routes/file');
app.get('/file/select', file.select);
app.post('/file/upload', file.upload);

/* 后台管理 */
var admin = require('./routes/admin');
app.get('/admin', admin.index);
app.get('/admin/index.html', admin.index);
app.get('/admin/topic-create.html', admin.create);
app.post('/admin/topic-store.html', admin.store);

app.get('/admin/topic-view-:id.html', admin.view);
app.get('/admin/topic-update-:id.html', admin.update);
app.get('/admin/topic-manage.html', admin.manage);

var album = require('./routes/album');
app.get('/admin/album-create.html', album.create);
app.post('/admin/album-create.html', album.create);

app.get('/admin/album-update-:id.html', album.update);
app.post('/admin/album-update-:id.html', album.update);

app.post('/admin/image-create-:id.html', album.addImg);

// 管理员中间件
app.use("/admin", require("./lib/mware-admin.js")());

// app.use(app.router);
app.use(serveStatic(__dirname + '/public'));
app.use(serveStatic(__dirname + '/upload'));

// 创建服务端
var server = app.listen(app.get('port'), function() {	
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
	var env = process.env;
	for(key in env) {
		if(!(typeof (env[key]) == "function")) {
			console.log('环境变量 ' + key + '\t\t= ' + env[key]);
		}
	}
	
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
	for(key in config) {
		if(!(typeof (config[key]) == "function")) {
			console.log('系统参数 ' + key + '\t\t= ' + config[key]);
		}
	}
	
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
	console.log('启动服务器完成，IP: '+ app.get('ip') +', Web端口: ' + app.get('port'));
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
});
