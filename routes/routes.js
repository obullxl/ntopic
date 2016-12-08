
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