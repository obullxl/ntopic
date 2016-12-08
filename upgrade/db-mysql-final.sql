/**
 * 创建数据库
 */
CREATE DATABASE osnode DEFAULT CHARSET=UTF8;

GRANT ALL PRIVILEGES ON osnode.* TO 'osnode'@'%' IDENTIFIED BY 'site';
GRANT ALL PRIVILEGES ON osnode.* TO 'osnode'@'localhost' IDENTIFIED BY 'site';
GRANT ALL PRIVILEGES ON osnode.* TO 'osnode'@'MININT-UM0FAEO' IDENTIFIED BY 'site';

use osnode;

/**
 * 配置数据表
 */
CREATE TABLE atom_config (
  catg 	VARCHAR(64) NOT NULL	COMMENT '配置分类',
  name	VARCHAR(64) NOT NULL	COMMENT 'Key名称',
  state VARCHAR(20) DEFAULT 'T' COMMENT '状态',
  value VARCHAR(255) 			COMMENT '配置值',
  cvalue VARCHAR(255) 			COMMENT '原配置值',
  gmt_create DATETIME COMMENT '记录创建时间',
  gmt_modify DATETIME COMMENT '记录修改时间',
  PRIMARY KEY(catg, name)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '参数配置数据表';

/**
 * 票据数据表
 */
CREATE TABLE atom_ticket (
  name VARCHAR(64) NOT NULL COMMENT '单据名称',
  ticket BIGINT(20) DEFAULT '1' COMMENT '单据值',
  stamp BIGINT(20) DEFAULT '0' COMMENT '时间戳',
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '统一单据数据表';

/**
 * 用户数据表
 */
CREATE TABLE atom_user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  uname 	VARCHAR(128) 	COMMENT '唯一, 用户名',
  passwd 	VARCHAR(255) 	COMMENT '明文密码',
  uemail 	VARCHAR(255) 	COMMENT '电子邮件',
  gmt_create DATETIME 	COMMENT '记录创建时间',
  gmt_modify DATETIME 	COMMENT '记录修改时间',
  UNIQUE KEY atom_user_uname_u (uname)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '用户信息数据表';

INSERT INTO atom_user(uname, passwd, uemail, gmt_create, gmt_modify) VALUES("admin", "21218cca77804d2ba1922c33e0151105", "obullxl@gmail.com", NOW(), NOW());

/**
 * 主题数据表
 */
CREATE TABLE atom_topic (
  id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  state VARCHAR(20) 	DEFAULT 'T' COMMENT '状态标识, T-有效, F-无效',
  catg 	VARCHAR(255) 				COMMENT '分类, blog-博客, news-咨询, album-美图, ...',
  tflag VARCHAR(20) 	DEFAULT 'F' COMMENT '置顶标识, T-置顶, F-非置顶',
  rflag VARCHAR(20) 	DEFAULT 'F' COMMENT '引用标识, T-引用外部资源, F-原创资源',
  rfrom VARCHAR(255) 				COMMENT '引用来源',
  mflag VARCHAR(20) 	DEFAULT 'F' COMMENT '多媒体标识, F-非多媒体, T-多媒体类型-IMAGE',
  mpath VARCHAR(128) 				COMMENT '多媒体路径',
  mcount BIGINT 		DEFAULT '0' COMMENT '多媒体数量',
  treply VARCHAR(20) 	DEFAULT 'T' COMMENT '评论开关标识, F-关闭评论, T-开放评论, C-评论审核',
  visit BIGINT 			DEFAULT '0' COMMENT '主题访问次数',
  reply BIGINT 			DEFAULT '0' COMMENT '主题评论次数',
  title VARCHAR(255) 				COMMENT '标题',
  summary VARCHAR(255) 				COMMENT '摘要',
  content text 						COMMENT '内容',
  gmt_create DATETIME COMMENT '记录创建时间',
  gmt_modify DATETIME COMMENT '记录修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '主题信息数据表';

/**
 * 评论数据表
 */
CREATE TABLE atom_reply (
  id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  state VARCHAR(20) DEFAULT 'T' COMMENT '状态, T-有效',
  topic VARCHAR(255) 			COMMENT '主题信息-TopicID',
  title VARCHAR(255) 			COMMENT '评论标题-TopicTitle',
  uname VARCHAR(128)			COMMENT '用户名',
  uemail VARCHAR(255) 			COMMENT '用户电子邮件',
  usite VARCHAR(255) 			COMMENT '用户站点',
  content text 					COMMENT '评论内容',
  gmt_create DATETIME COMMENT '记录创建时间',
  gmt_modify DATETIME COMMENT '记录修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '评论信息数据表';

/**
 * 图片数据表
 */
CREATE TABLE atom_image (
  id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
  state VARCHAR(20) DEFAULT 'T' COMMENT '状态, T-有效',
  topic VARCHAR(255) 			COMMENT '主题信息-TopicID',
  title VARCHAR(255) 			COMMENT '评论标题-TopicTitle',
  mpath VARCHAR(255) 			COMMENT '图片路径',
  summary VARCHAR(255) 			COMMENT '图片描述',
  gmt_create DATETIME COMMENT '记录创建时间',
  gmt_modify DATETIME COMMENT '记录修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '图片信息数据表';
