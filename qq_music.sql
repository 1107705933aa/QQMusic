/*
MySQL Data Transfer
Source Host: localhost
Source Database: qq_music
Target Host: localhost
Target Database: qq_music
Date: 2018/8/11 14:21:22
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `collect_id` int(4) NOT NULL AUTO_INCREMENT,
  `songList_id` int(4) NOT NULL,
  `user_id` int(4) NOT NULL,
  PRIMARY KEY (`collect_id`),
  KEY `songListid` (`songList_id`),
  KEY `userid` (`user_id`),
  CONSTRAINT `songListid` FOREIGN KEY (`songList_id`) REFERENCES `songlist` (`songList_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for songlist
-- ----------------------------
DROP TABLE IF EXISTS `songlist`;
CREATE TABLE `songlist` (
  `songList_id` int(4) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `creator` char(20) NOT NULL,
  `imgUrl` char(50) NOT NULL,
  PRIMARY KEY (`songList_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for songlist_tag
-- ----------------------------
DROP TABLE IF EXISTS `songlist_tag`;
CREATE TABLE `songlist_tag` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `songList_id` int(4) NOT NULL,
  `tag_id` int(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `songid` (`songList_id`),
  KEY `tagid` (`tag_id`),
  CONSTRAINT `tagid` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `songid` FOREIGN KEY (`songList_id`) REFERENCES `songlist` (`songList_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for songs
-- ----------------------------
DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `song_id` int(4) NOT NULL AUTO_INCREMENT,
  `songName` char(20) NOT NULL,
  `singer` char(20) NOT NULL,
  `album` char(50) NOT NULL,
  `songList_id` int(4) DEFAULT NULL,
  `imgUrl` char(50) NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`song_id`),
  KEY `songlist` (`songList_id`),
  CONSTRAINT `songlist` FOREIGN KEY (`songList_id`) REFERENCES `songlist` (`songList_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tag_id` int(4) NOT NULL AUTO_INCREMENT,
  `tagName` char(20) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(4) NOT NULL AUTO_INCREMENT,
  `userName` char(20) NOT NULL,
  `userPwd` char(20) NOT NULL,
  `identity` char(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `collect` VALUES ('1', '1', '1');
INSERT INTO `songlist` VALUES ('1', 'songList1', 'creator1', 'images/');
INSERT INTO `songlist` VALUES ('2', 'songList2', 'creator2', 'images//');
INSERT INTO `songlist_tag` VALUES ('1', '1', '1');
INSERT INTO `songlist_tag` VALUES ('2', '1', '2');
INSERT INTO `songlist_tag` VALUES ('3', '1', '3');
INSERT INTO `songlist_tag` VALUES ('4', '2', '1');
INSERT INTO `songlist_tag` VALUES ('5', '2', '5');
INSERT INTO `songs` VALUES ('1', 'song1', 'singer1', 'album1', '1', 'imgUrl', '00:03:11');
INSERT INTO `tags` VALUES ('1', '现场音乐');
INSERT INTO `tags` VALUES ('2', '流行');
INSERT INTO `tags` VALUES ('3', '国语');
INSERT INTO `tags` VALUES ('4', '英语');
INSERT INTO `tags` VALUES ('5', '嘻哈');
INSERT INTO `tags` VALUES ('6', '宣泄');
INSERT INTO `tags` VALUES ('7', '乡村');
INSERT INTO `tags` VALUES ('8', '城市');
INSERT INTO `tags` VALUES ('9', '粤语');
INSERT INTO `user` VALUES ('1', 'user1', 'user1', 'manger');
INSERT INTO `user` VALUES ('2', 'user2', 'user2', 'manger');
