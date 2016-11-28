//-----------------router.js--------------------------------
//路由读取文件,登录和注册,路由选择
var openfile = require('./models/optfile');
function getRecall(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    function recall(data){
        res.write(data);
        res.end('');
    }
    return recall;
}

module.exports = {
    //登录
    login:function(req,res){
        openfile.readfile('./views/login.html',getRecall(req,res));
    },
    //注册
    register:function(req,res){
        openfile.readfile('./views/register.html',getRecall(req,res));
    },
    //异步写文件
    writefile: function(req,res){
        var content = '哈哈哈,写文件成功2!'
        openfile.writefile('./views/one.txt',content,getRecall(req,res));
    },
    showimg: function(req,res){
        openfile.readImg('./images/pig.png',res);
        console.log('访问图片');
    }
}
