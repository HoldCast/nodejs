const express=require('express');
const cookieParser=require('cookie-parser');

var server=express();



//cookie
server.use(cookieParser('wesdfw4r34tf'));

server.use('/', function (req, res){
  req.secret='wesdfw4r34tf'; //可以不用写
  res.cookie('user', 'blue', {signed: true}); //签名
  res.cookie('user2', 'blue2');

  console.log('signed cookie：', req.signedCookies);
  console.log('unsigned cookie：', req.cookies);

  res.send('ok');
});

server.listen(8080);
