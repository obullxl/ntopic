
/**
 * 主题数据表
 */
ALTER TABLE atom_topic ADD mcount BIGINT DEFAULT '0' AFTER mpath;
ALTER TABLE atom_topic ADD treply VARCHAR(20) DEFAULT 'T' AFTER mcount;

/**
 * 图片数据表
 */
ALTER TABLE atom_image ADD title VARCHAR(255) AFTER topic;
