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
// app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('port', config['app_port'] || 5000);
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

/* ./routes/routes.js */
app.get('/', function(req, res){
	res.send('hello world');
});

// app.use(app.router);
app.use(serveStatic(__dirname + '/public'));
app.use(serveStatic(__dirname + '/upload'));

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
