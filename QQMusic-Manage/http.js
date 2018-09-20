//引入模块
var express = require('express');
//1, 引入模块
var QQMusicUtil = require('./Dao/QQMusicUtil');
//表单处理引入模块
var bodyParser = require('body-parser');
//引入cookie模块
var cookieParser = require('cookie-parser');
var session = require('express-session');
//图片上传
var formidable = require('formidable');
//引入md5加密模块
var crypto = require('crypto');
var multer = require('multer');
var fs = require("fs");

//创建对象
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
//1,接受表单的请求
app.use(bodyParser.urlencoded({extended: false}));
//设置静态文件
app.use(express.static('public'));
app.use(cookieParser());

//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));


//指定模板引擎
app.set('view engine', 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');

app.get('/index', function (req, res) {
        res.render('index', {
        });
});

//歌单查询
app.get('/songList', function (req, res) {
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "select * from songlist ";
    songList.queryAll(sql, function (songlists) {
      var response={
          songLists:songlists
      }

        res.end(JSON.stringify(response));
    });
});

//歌单删除
app.post('/deSongList', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "delete from songlist where songList_id="+id;
    if(!songList.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//歌单添加
app.post('/addSongList', function (req, res) {
    var name=req.body.name;
    var creator=req.body.creator;
    var img=req.body.img;
    var playVolume=req.body.playvolume;
    var result;

    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "insert into songlist(name,creator,imgUrl,Play_volume) values (?,?,?,?)";
    var params = [name,creator,img,playVolume];
   songList.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//歌曲查询
app.get('/songs', function (req, res) {
    //链接数据库
    song = new QQMusicUtil();
    song.init();
    //取出数据
    var sql = "select songs.song_id,songs.songName,songs.singer,songs.album,songs.imgUrl,songs.time,songlist.name from songs,songlist where songs.songList_id=songlist.songList_id";
    song.queryAll(sql, function (songs) {
        var response={
            songs:songs
        }

        res.end(JSON.stringify(response));
    });
});

//歌单删除
app.post('/deSong', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "delete from songs where song_id="+id;
    if(!songList.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//歌单添加
app.post('/addSong', function (req, res) {

    var songName=req.body.songName;
    var singer=req.body.singer;
    var albume=req.body.albume;
    var songImg=req.body.songImg;
    var songlist=req.body.songlist;
    var time=req.body.time;
    var result;

    console.log(songlist);

    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "insert into songs(songName,singer,album,songList_id,imgUrl,time) values (?,?,?,?,?,?)";
    var params = [songName,singer,albume,songlist,songImg,time];
    songList.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//用户查询
app.get('/user', function (req, res) {
    //链接数据库
    users = new QQMusicUtil();
    users.init();
    //取出数据
    var sql = "select * from user ";
    users.queryAll(sql, function (users) {
        var response={
            users:users
        }

        res.end(JSON.stringify(response));
    });
});

//用户删除
app.post('/deUser', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "delete from user where user_id="+id;
    if(!songList.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//用户添加
app.post('/addUser', function (req, res) {
// identity userName password
    var userName=req.body.userName;
    var password=req.body.password;
    var identity=req.body.identity;
    var result;
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "insert into user(userName,userPwd,identity) values (?,?,?)";
    var params = [userName,password,identity];
    songList.insert(sql,params,function (data) {
        result=data.insertId;
        var response={
            result:result
        }
        res.end(JSON.stringify(response));
    })
});

//收藏查询
app.get('/collect', function (req, res) {
    //链接数据库
    collects = new QQMusicUtil();
    collects.init();
    //取出数据
    var sql = "select collect.collect_id, songlist.name,user.userName from collect,songlist,user where collect.songList_id=songList.songList_id and collect.user_id=user.user_id";
    collects.queryAll(sql, function (collects) {
        var response={
            collects:collects
        }

        res.end(JSON.stringify(response));
    });
});

//用户收藏删除
app.post('/deCollect', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "delete from collect where collect_id="+id;
    if(!songList.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

//标签查询
app.get('/songListTag', function (req, res) {
    //链接数据库
    songListTag = new QQMusicUtil();
    songListTag.init();
    //取出数据
    var sql = "select songlist_tag.id,songlist.name,tags.tagName from songlist_tag,songlist,tags where songlist_tag.songList_id=songList.songList_id and songlist_tag.tag_id=tags.tag_id";
    songListTag.queryAll(sql, function (songListTags) {
        var response={
            songListTags:songListTags
        }

        res.end(JSON.stringify(response));
    });
});

//用户收藏删除
app.post('/deSongListTag', function (req, res) {
    var id=req.body.id;
    var result;
    //链接数据库
    songList = new QQMusicUtil();
    songList.init();
    //取出数据
    var sql = "delete from songlist_tag where id="+id;
    if(!songList.delete(sql)){
        result=1;
    }else{
        result=0;
    }
    var response={
        result:result
    }

    res.end(JSON.stringify(response));
});

// 百度图片上传
app.post("/upload", multer({dest: __dirname + '/public/images/songList/'}).array('file'), function (req, res) {
    var responseJson = {
        code: '1'// 上传的文件信息
    };
    var src_path = req.files[0].path;
    var fileName = new Date().getTime() + ".jpg";
    var des_path = req.files[0].destination + new Date().getTime() + ".jpg";

    console.log(fileName);

    fs.rename(src_path, des_path, function (err) {
        if (err) {
            throw err;
        }
        fs.stat(des_path, function (err, stat) {
            if (err) {
                throw err;
            }
            responseJson['upload_file'] = fileName;

            res.json(responseJson);
        });
    });
});

//设置监听
app.listen(8000);