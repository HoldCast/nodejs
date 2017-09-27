const express = require('express');
const server = express();

//目录1：/user/
var routeUser = express.Router();   //创建路由
server.use('/user', routeUser);
routeUser.get('/1.html', function (req, res) {   //http://xxx.com/user/1.html
    res.send('user1');
});
routeUser.get('/2.html', function (req, res) {   //http://xxx.com/user/2.html
    res.send('user22222');
});


//目录2：/article
var articleRouter = express.Router();
server.use('/article', articleRouter);
articleRouter.get('/10001.html', function (req, res) {   //http://xxxx.com/article/10001.html
    res.send('asdfasdfasdf');
});

//根目录
var routeRoot = express.Router();
server.use('/', routeRoot);
routeRoot.get('/', function(req, res){
    res.send('Root');
});


server.listen(8080);
