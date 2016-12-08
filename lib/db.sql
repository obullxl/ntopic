
ALTER TABLE atom_topic CHANGE visit_count visit bigint DEFAULT '0';
ALTER TABLE atom_topic CHANGE reply_count reply bigint DEFAULT '0';

ALTER TABLE atom_topic ADD state varchar(20) DEFAULT 'T' AFTER id;
ALTER TABLE atom_topic ADD topt varchar(20) DEFAULT 'F' AFTER catg;
ALTER TABLE atom_topic ADD rflag varchar(20) DEFAULT 'F' AFTER topt;
ALTER TABLE atom_topic ADD rfrom varchar(255) AFTER rflag;

ALTER TABLE atom_topic ADD mflag varchar(20) DEFAULT 'F' AFTER rfrom;
ALTER TABLE atom_topic ADD mpath varchar(20) AFTER mflag;
ALTER TABLE atom_topic CHANGE topt tflag varchar(20) DEFAULT 'F';

ALTER TABLE atom_topic DROP COLUMN poster_id;
ALTER TABLE atom_topic DROP COLUMN poster_name;

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

INSERT INTO atom_user(uname, passwd, uemail, gmt_create, gmt_modify) VALUES("老牛啊", "21218cca77804d2ba1922c33e0151105", "obullxl@gmail.com", NOW(), NOW());

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

ALTER TABLE atom_reply CHANGE uemail uemail varchar(255) DEFAULT '';

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
