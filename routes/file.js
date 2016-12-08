/**
 * 文件模块
 */
var fs = require('fs');
var log = require('../lib/log');
var config = require('../config');

/**
 * 选择文件
 */
exports.select = function(request, response) {
	response.render('file-upload', {});
};

/**
 * 上传文件
 */
exports.upload = function(request, response) {
	var files = request.files;
	for(key in files) {
		var file = files[key];
		if(file.size <= 0) {
			fs.unlink(file.path, function(error) {
				if(error) {
					log.error("删除空文件[" + file.path + "]失败: " + error.message);
				}
			});
			
			continue;
		}

		var dstPath = config.uploadPath + file.name;

		console.log("File[" + key + "]:" + file.path + ", " + file.name + ", " + file.size + ", " + dstPath);

		// 移动文件
		fs.renameSync(file.path, dstPath);
	}

	response.render('file-upload', {});
};
