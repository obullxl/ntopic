
--
-- http://ntopic.b0.upaiyun.com/avatar/Profile-BIG.jpg
-- http://ntopic.b0.upaiyun.com/avatar/Profile-BIG.jpg!snap
-- http://ntopic.b0.upaiyun.com/avatar/Profile-BIG.jpg!small
--

--
-- NT用户基本信息
--
CREATE TABLE nt_user_base (
  id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT 'ID',
  state       TINYINT      NOT NULL COMMENT '状态',
  ctime       DATETIME     COMMENT '创建时间',
  mtime       DATETIME     COMMENT '修改时间',
  ext         VARCHAR(512) COMMENT 'KV扩展参数',
  name        VARCHAR(32)  NOT NULL COMMENT '用户名',
  nick        VARCHAR(32)  COMMENT '昵称',
  avatar      VARCHAR(128) COMMENT '头像',
  resume      VARCHAR(256) COMMENT '个人简介',
  wealth      BIGINT       COMMENT '财富',
  grade       INT          COMMENT '等级',
  ccircle     INT          COMMENT '订阅数量',
  cattach     INT          COMMENT '附件数量',
  sattach     BIGINT       COMMENT '附件总大小',
  ctopic      INT          COMMENT '发布主题数量',
  etopic      INT          COMMENT '拉黑主题数量',
  cimage      INT          COMMENT '发布图片数量',
  eimage      INT          COMMENT '拉黑图片数量',
  creply      INT          COMMENT '发布评论数量',
  ereply      INT          COMMENT '拉黑评论数量',
  clike       INT          COMMENT '点赞数量',
  ccollect    INT          COMMENT '收藏数量',
  primary key (id),
  UNIQUE key nt_user_base_name_u (name)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT用户基本信息数据表';

--
-- NT用户敏感信息
--
CREATE TABLE nt_user_sense (
  id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT 'ID',
  mtime       DATETIME     COMMENT '修改时间',
  ext         VARCHAR(512) COMMENT 'KV扩展参数',
  admin       TINYINT      NOT NULL COMMENT '管理员',
  uname       VARCHAR(32)  NOT NULL COMMENT '用户名',
  email       VARCHAR(64)  NOT NULL COMMENT '电子邮箱',
  passwd      VARCHAR(64)  NOT NULL COMMENT '登录密码',
  ureal       VARCHAR(32)  COMMENT '真实姓名',
  gender      TINYINT      NOT NULL COMMENT '性别',
  ubirth      VARCHAR(10)  COMMENT '出生日期',
  primary key (id),
  UNIQUE key nt_user_base_uname_u (uname),
  UNIQUE key nt_user_base_email_u (email)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT用户敏感信息数据表';

--
-- NT用户附件信息
--
CREATE TABLE nt_user_attach (
  id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT 'ID',
  state       TINYINT      NOT NULL COMMENT '状态',
  ctime       DATETIME     COMMENT '创建时间',
  ext         VARCHAR(128) COMMENT 'KV扩展参数',
  uname       VARCHAR(32)  NOT NULL COMMENT '用户名',
  catg        TINYINT      NOT NULL COMMENT '分类',
  apath       VARCHAR(128) COMMENT '地址',
  asize       BIGINT       COMMENT '大小',
  memo        VARCHAR(128) COMMENT '备注',
  primary key (id),
  KEY idx_nt_user_attach_uname (uname)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT用户附件信息数据表';

--
-- NT圈子基本信息
--
CREATE TABLE nt_circle_base (
  id          BIGINT        NOT NULL AUTO_INCREMENT COMMENT 'ID',
  state       TINYINT       NOT NULL COMMENT '状态',
  ctime       DATETIME      COMMENT '创建时间',
  mtime       DATETIME      COMMENT '修改时间',
  ext         VARCHAR(1024) COMMENT 'KV扩展参数',
  mlogo       VARCHAR(128)  COMMENT 'LOGO地址',
  uname       VARCHAR(32)   NOT NULL COMMENT '创建者',
  cfollow     INT           COMMENT '订阅数量',
  ctopic      INT           COMMENT '主题数量',
  cimage      INT           COMMENT '图片数量',
  creply      INT           COMMENT '评论数量',
  clike       INT           COMMENT '点赞数量',
  name        VARCHAR(64)   COMMENT '名称',
  notice      VARCHAR(1024) COMMENT '公告',
  primary key (id),
  KEY idx_nt_circle_base_state (state)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT圈子基本信息数据表';

--
-- NT圈子订阅信息
--
CREATE TABLE nt_circle_follow (
  id          BIGINT        NOT NULL AUTO_INCREMENT COMMENT 'ID',
  ctime       DATETIME      COMMENT '创建时间',
  ext         VARCHAR(128)  COMMENT 'KV扩展参数',
  circle      BIGINT        NOT NULL '圈子ID',
  uname       VARCHAR(32)   NOT NULL COMMENT '订阅者',
  unick       VARCHAR(32)   COMMENT '昵称',
  admin       TINYINT       NOT NULL COMMENT '管理员',
  ctopic      INT           COMMENT '主题数量',
  creply      INT           COMMENT '评论数量',
  clike       INT           COMMENT '点赞数量',
  name        VARCHAR(64)   COMMENT '名称',
  notice      VARCHAR(1024) COMMENT '公告',
  primary key (id),
  KEY idx_nt_circle_follow_circle (circle),
  KEY idx_nt_circle_follow_uname (uname)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT圈子订阅信息数据表';

--
-- NT主题基本信息
--
CREATE TABLE nt_topic_base (
  id          BIGINT        NOT NULL AUTO_INCREMENT COMMENT 'ID',
  state       TINYINT       NOT NULL COMMENT '状态',
  ctime       DATETIME      COMMENT '创建时间',
  mtime       DATETIME      COMMENT '修改时间',
  ext         VARCHAR(1024) COMMENT 'KV扩展参数',
  circle      BIGINT        NOT NULL '圈子ID',
  uname       VARCHAR(32)   NOT NULL COMMENT '作者',
  stick       TINYINT       COMMENT '置顶标志',
  elite       TINYINT       COMMENT '精华标志',
  cite        TINYINT       COMMENT '引用标志',
  mtext       TINYINT       COMMENT '图文标志',
  cvisit      INT           COMMENT '访问次数',
  creply      INT           COMMENT '评论次数',
  clike       INT           COMMENT '点赞次数',
  ccollect    INT           COMMENT '收藏次数',
  title       VARCHAR(128)  COMMENT '标题',
  summary     VARCHAR(512)  COMMENT '摘要',
  content     LONGTEXT      COMMENT '文章内容',
  primary key (id),
  KEY idx_nt_topic_base_c_s (circle,state),
  KEY idx_nt_topic_base_uname (uname),
  KEY idx_nt_topic_base_stick (stick)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT主题基本信息数据表';

--
-- NT主题图片信息
--
CREATE TABLE nt_topic_image (
  id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT 'ID',
  mtime       DATETIME     COMMENT '修改时间',
  ext         VARCHAR(128) COMMENT 'KV扩展参数',
  circle      BIGINT       COMMENT '圈子ID',
  topic       BIGINT       NOT NULL COMMENT '主题ID',
  mpath       VARCHAR(128) COMMENT '缩略图地址',
  xpath       VARCHAR(128) COMMENT '大图片地址',
  primary key (id),
  KEY idx_nt_topic_image_topic (topic)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT主题图片信息数据表';

--
-- NT主题评论信息
--
CREATE TABLE nt_topic_reply (
  id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT 'ID',
  state       TINYINT      NOT NULL COMMENT '状态',
  mtime       DATETIME     COMMENT '修改时间',
  ext         VARCHAR(256) COMMENT 'KV扩展参数',
  catg        TINYINT      NOT NULL COMMENT '分类',
  circle      BIGINT       COMMENT '圈子ID',
  topic       BIGINT       NOT NULL COMMENT '主题ID',
  target      BIGINT       COMMENT '对象ID',
  uname       VARCHAR(32)  COMMENT '评论者',
  content     LONGTEXT     COMMENT '内容',
  primary key (id),
  KEY idx_nt_topic_reply_c_t_t (catg,topic)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT 'NT主题评论信息数据表';



