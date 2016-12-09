/**
 * 用户数据表
 */
CREATE TABLE atom_user (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  uname varchar(128),
  passwd varchar(255),
  uemail varchar(255),
  gmt_create datetime,
  gmt_modify datetime,
  UNIQUE KEY atom_user_uname_u (uname)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO atom_user(uname, passwd, uemail, gmt_create, gmt_modify) VALUES("admin", "21218cca77804d2ba1922c33e0151105", "obullxl@163.com", NOW(), NOW());
INSERT INTO atom_user(uname, passwd, uemail, gmt_create, gmt_modify) VALUES("ntopic", "21218cca77804d2ba1922c33e0151105", "ntopic.cn@gmail.com", NOW(), NOW());

/**
 * 主题数据表
 */
CREATE TABLE atom_topic (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  state varchar(20) DEFAULT 'T',
  catg varchar(255),
  tflag varchar(20) DEFAULT 'F',
  rflag varchar(20) DEFAULT 'F',
  rfrom varchar(255),
  mflag varchar(20) DEFAULT 'F',
  mpath varchar(128),
  visit bigint DEFAULT '0',
  reply bigint DEFAULT '0',
  title varchar(255),
  summary varchar(255),
  content text,
  gmt_create datetime,
  gmt_modify datetime
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/**
 * 评论数据表
 */
CREATE TABLE atom_reply (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  state varchar(20) DEFAULT 'T',
  topic varchar(255),
  title varchar(255),
  uname varchar(128),
  uemail varchar(255),
  usite varchar(255),
  content text,
  gmt_create datetime,
  gmt_modify datetime
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/**
 * 图片数据表
 */
CREATE TABLE atom_image (
  id bigint AUTO_INCREMENT PRIMARY KEY,
  state varchar(20) DEFAULT 'T',
  topic varchar(255),
  mpath varchar(255),
  summary varchar(255),
  gmt_create datetime,
  gmt_modify datetime
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;
