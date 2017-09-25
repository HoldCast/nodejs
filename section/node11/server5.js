const express=require('express');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');

var server=express();



//cookie
server.use(cookieParser());
server.use(cookieSession({
  keys: ['aaa', 'bbb', 'ccc'] //强行加密
}));

server.use('/', function (req, res){
  console.log(req.session);

  res.send('ok');
});

server.listen(8080);
