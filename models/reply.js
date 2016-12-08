/**
 * 模块依赖
 */
var db = require("../lib/db");

var fields_all = "id, state, topic, title, uname, uemail, usite, content, gmt_create, gmt_modify";

/**
 * DAO: insert
 */
exports.insert = function(obj, handler) {
	db.execUpdate({
		"sql": "INSERT INTO atom_reply(topic, title, uname, uemail, usite, content, gmt_create, gmt_modify) VALUES(?, ?, ?, ?, ?, ?, NOW(), NOW())",
		"args": [obj.topic, obj.title, obj.uname, obj.uemail, obj.usite, obj.content],
		"handler": handler
	});
};

/**
 * DAO: findID
 */
exports.findAll = function(tpcId, handler) {
	db.execUpdate({
		"sql": "SELECT * FROM atom_reply WHERE topic=? ORDER BY id ASC",
		"args": [tpcId],
		"handler": handler
	});
};
