//querystring
const querystring = require('querystring');//解析json字符串
//var json = querystring.parse("user=blue&pass=123456&age=18");
//url
const urlLib = require('url'); //var obj=urlLib.parse(req.url, true);
//var obj = urlLib.parse("http://www.zhinengshe.com/index?a=12&b=5", true);
//fs
const fs = require('fs');
function fsTset() {
    //readFile(文件名, 回调)
    fs.readFile('aaa.txt', function (err, data) {
        if (err) {
            console.log('读取失败');
        } else {
            console.log(data.toString());
        }
    });
    //writeFile(文件名, 内容, 回调)
    fs.writeFile("bbb.txt", "内容", function (err) {
        console.log(err);
    });
}
//mysql
const mysql = require('mysql');

//http
const http = require('http');
http.createServer(function (req, res) {
    var obj = urlLib.parse(req.url, true);
    var url = obj.pathname;
    var GET = obj.query;
    //POST——req
    var str = '';   //接收数据
    //data——有一段数据到达(很多次)
    var i = 0;
    req.on('data', function (data) {
        console.log(`第${i++}次收到数据`);
        str += data;
    });
    //end——数据全部到达(一次)
    req.on('end', function () {
        var POST = querystring.parse(str);
        console.log(url, GET, POST);
        //区分——接口、文件
        if (url == '/user') {
            switch (GET.act) {
                case 'reg':
                    //1.检查用户名是否已经有了
                    if (users[GET.user]) {
                        res.write('{"ok": false, "msg": "此用户已存在"}');
                    } else {
                        //2.插入users
                        users[GET.user] = GET.pass;
                        res.write('{"ok": true, "msg": "注册成功"}');
                    }
                    break;
                case 'login':
                    //1.检查用户是否存在
                    if (users[GET.user] == null) {
                        res.write('{"ok": false, "msg": "此用户不存在"}');
                        //2.检查用户密码
                    } else if (users[GET.user] != GET.pass) {
                        res.write('{"ok": false, "msg": "用户名或密码有误"}');
                    } else {
                        res.write('{"ok": true, "msg": "登录成功"}');
                    }
                    break;
                default:
                    res.write('{"ok": false, "msg": "未知的act"}');
            }
            res.end();
        }
        //读取文件
        else {
            var file_name = './www' + url;
            fs.readFile(file_name, function (err, data) {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
                res.end();
            });
        }
        ;
    });


}).listen(8080);

//模块的引用,创建,发布等,node8

/**----------------------------------------------------------------------------------------------**/
//express框架 node9
const express = require('express'); //需要install
var server = express();
server.use(expressStatic('./www')); //直接访问www目录,需要install
server.listen(8080);
server.get('/', function () {
    console.log('GET');
});
server.post('/', function () {
    console.log('POST');
});
//get||post
server.use('/login', function (req, res) {
    console.log(req.query);
    var user = req.query['user'];
    var pass = req.query['pass'];

    if (users[user] == null) {
        res.send({ok: false, msg: '此用户不存在'});
    } else {
        if (users[user] != pass) {
            res.send({ok: false, msg: '密码错了'});
        } else {
            res.send({ok: true, msg: '成功'});
        }
    }
});
//中间件
const bodyParser = require('body-parser');
//第一步
server.use(bodyParser.urlencoded({
    extended: false,                 //true:扩展模式(暂时没什么用),false:普通模式
    limit: 2 * 1024 * 1024           //限制-2M,默认100Kb
}));
//第二步
server.use('/', function (req, res) {
    console.log(req.query); //GET数据
    console.log(req.body);  //POST数据
});
//next
server.use('/', function (req, res, next) {
    console.log('a');
    if (true) {
        next();//根据具体情况选择next
    }
});
server.use('/', function (req, res, next) {
    console.log('next');
});
//1.自定义中间件
server.use(function (req, res, next) {
    var str = '';
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        req.body = querystring.parse(str);
        next();
    });
});
//2.
//server.use(bodyParser.urlencoded({}));
server.use('/', function (req, res) {
    console.log(req.body);
});
const bodyParser2 = require('./libs/my-body-parser');//node10
server.use(bodyParser2.postData());
server.use('/', function (req, res) {
    console.log(req.body);
});




