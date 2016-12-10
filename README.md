NT开源站点
=============

+ 采用`Node.js`+`SemanticUI`构建，具有统一的展示效果；基于Apache v2 License，对使用者无任何约束；

+ 有任何问题或建议，请联系：[obullxl@163.com](obullxl@163.com)，或在Heroku云站点留言：[http://ntopic.cn](http://ntopic.cn)

+ ***Heroku***云效果：[http://ntopic.cn](http://ntopic.cn)，由于是免费的测试服务器，服务器性能不是特别好，响应时间稍长(经测算1~3秒左右)，请耐心等候即可

+ ***OSC-MoPaas***云效果：http://ntopic.oschina.mopaasapp.com，本期望国内服务器响应要好，但很遗憾启动成功了，但是访问却异常，没有系统日志，想排查问题也无门：

~~~
404 Not Found: Requested route ('ntopic.oschina.mopaasapp.com') does not exist.
~~~

NT使用方法：
=============

+ 安装`Node.js`：[http://www.nodejs.org/dist/](http://www.nodejs.org/dist/) 找到最适合的版本，按照完成之后测试一下版本

~~~
NT-MacBook:ntopic ntopic$ node -v
v5.1.0
NT-MacBook:ntopic ntopic$ npm -v
4.0.3
~~~

+ 下载NT源代码
 - GitHub地址：[https://github.com/obullxl/ntopic.git](https://github.com/obullxl/ntopic.git)
 - OSC码云地址：[https://git.oschina.net/obullxl/ntopic.git](https://git.oschina.net/obullxl/ntopic.git)

+ 数据库配置
 - 数据建表文件：源代码目录`./lib/db.sql`文件

+ 启动应用
 - Windows系统，在源代码目录新建`start.bat`文件，内容如下：

~~~
set APP_PORT=80 # 端口号

set DB_TYPE=mysql
set DB_HOST=localhost # MySQL域名
set DB_PORT=3306
set DB_NAME=ntopic # 数据库名
set DB_USER=ntopic # 用户名
set DB_PASSWD=secure # 密码

node index.js
~~~

 - Linux/Mac系统，在源代码目录新建`start.sh`文件，内容如下：

~~~
#!/bin/bash
export APP_PORT=3000

export DB_TYPE=mysql
set DB_HOST=localhost # MySQL域名
set DB_PORT=3306
set DB_NAME=ntopic # 数据库名
set DB_USER=ntopic # 用户名
set DB_PASSWD=secure # 密码

node index.js
~~~

 - Windows在cmd运行`start.bat`，Linux/Mac在Console中运行`sudo ./start.sh`即可

+ 前端页面(`http://localhost:端口号`)
 - Windows系统：[http://localhost](http://localhost)
 - Linux/Mac系统：[http://localhost:3000](http://localhost:3000)

+ 后端页面(`http://localhost:端口号`/admin`)
 - Windows系统：[http://localhost/admin](http://localhost/admin)
 - Linux/Mac系统：[http://localhost:3000/admin](http://localhost:3000/admin)
 - 初始用户名/密码：admin/888888

发布版本
=============
+ ntopic-v1.0.20161210
 - 基本框架搭建：前台展示、后台增、删

待补充
=============

1、系统功能

2、系统架构

3、多云平台部署

4、二次开发

5、多主题
