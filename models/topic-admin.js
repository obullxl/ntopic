/**
 * 模块依赖
 */
var db = require("../lib/db");

var fields_title = "id, state, catg, tflag, rflag, rfrom, mflag, mpath, visit, reply, title, gmt_create, gmt_modify";
var fields_summary = "id, state, catg, tflag, rflag, rfrom, mflag, mpath, visit, reply, title, summary, gmt_create, gmt_modify";
var fields_all = "id, state, catg, tflag, rflag, rfrom, mflag, mpath, visit, reply, title, summary, content, gmt_create, gmt_modify";

/**
 * DAO: insert
 */
exports.insert = function(tpc, handler) {
	db.execUpdate({
		"sql": "INSERT INTO atom_topic(catg, mflag, mpath, title, summary, content, gmt_create, gmt_modify) VALUES(?, ?, ?, ?, ?, ?, NOW(), NOW())",
		"args": [tpc.catg, tpc.mflag, tpc.mpath, tpc.title, tpc.summary, tpc.content],
		"handler": handler
	});
};

/**
 * DAO: update
 */
exports.update = function(tpc, handler) {
	db.execUpdate({
		"sql": "UPDATE atom_topic SET catg=?, mflag=?, mpath=?, title=?, summary=?, content=?, gmt_modify=NOW() WHERE id=?",
		"args": [tpc.catg, tpc.mflag, tpc.mpath, tpc.title, tpc.summary, tpc.content, tpc.id],
		"handler": handler
	});
};

/**
 * DAO: delete
 */
exports.remove = function(id, handler) {
	db.execUpdate({
		"sql": "DELETE FROM atom_topic WHERE id=?",
		"args": [id],
		"handler": handler
	});
};

/**
 * DAO: findID
 */
exports.findID = function(id, handler) {
	db.execUpdate({
		"sql": "SELECT * FROM atom_topic WHERE id=?",
		"args": [id],
		"handler": handler
	});
};

/**
 * DAO: findAll
 */
exports.findAll = function(handler) {
	db.execUpdate({
		"sql": "SELECT * FROM atom_topic ORDER BY id DESC",
		"handler": handler
	});
};

/**
 * DAO: count
 */
exports.count = function(args, handler) {
	db.execUpdate({
		"sql": "SELECT COUNT(*) AS count FROM atom_topic WHERE catg IN (?)",
		args: [args.catgs],
		"handler": function(results) {
			handler(parseInt(results[0].count));
		}
	});
};

/**
 * DAO: findPage
 */
exports.findPage = function(args, handler) {
	db.execUpdate({
		"sql": "SELECT " + fields_title + " FROM atom_topic WHERE catg IN (?) ORDER BY id DESC LIMIT ?,?",
		args: [args.catgs, args.offset, args.limit],
		"handler": handler
	});
};

/**
 * DAO: findMinID
 */
exports.findMinID = function(minId, handler) {
	db.execUpdate({
		"sql": "SELECT * FROM atom_topic WHERE id>?",
		"args": [minId],
		"handler": handler
	});
};
