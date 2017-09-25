const express=require('express');
const bodyParser=require('body-parser');

var server=express();
server.listen(8080);

//第一步
server.use(bodyParser.urlencoded({
  extended: false,                 //true:扩展模式(暂时没什么用),false:普通模式
  limit:    2*1024*1024           //限制-2M,默认100Kb
}));

//第二步
server.use('/', function (req, res){
  //console.log(req.query); //GET
  console.log(req.body); //POST
});

//req.query   GET
//req.body    POST
