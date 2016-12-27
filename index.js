#!/bin/env node

/* 全局配置 */
const config = require('./config');
config['db_file'] = __dirname + '/../ntopic.sqlite';

/* 应用配置 */
const express = require('express');

const app = express();
// app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('port', config['app_port'] || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(require('serve-favicon')("./favicon.png"));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(require('method-override')('_method'));

const secret = 'ntopic';
app.use(require('cookie-parser')(secret));
app.use(require('express-session')({
	resave: false,
	secret: secret,
	cookie: { maxAge: 3600000 },
	saveUninitialized: true,
	genid: function(req) {
    	return require('uuid/v4')();
	}
}));

/* 开发环境 */
if('development' == app.get('env')) {
	app.use(require('errorhandler')());
}

/* ./routes/routes.js */
// 管理员中间件
app.use("/admin", require("./lib/mware-admin.js")());

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
app.get('/regist.html', index.regist);
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

/* 开发页面 */
const webview = require('./routes/webview');
app.all('/webview.html', webview.webview);
app.all('/forget/:page.html', webview.forget);
app.all('/:page.html', webview.routes);

/*
app.get('/', function(req, res){
	res.send('hello world');
});
*/

// app.use(app.router);

app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));
app.use('/upload', express.static('upload'));

// 创建服务端
app.listen(app.get('port'), function() {
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
	console.log('启动服务器完成-Web端口: ' + app.get('port'));
	console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
});
