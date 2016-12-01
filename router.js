//-----------------router.js--------------------------------


//路由读取文件,添加需要打开的页面或者读取的文件方法
var openfile = require('./models/optfile');

module.exports = {
    //登录
    login: function(req,res){
        openfile.readfile('./views/login.html',getRecall(req,res));
    },
    //登录2
    login2: function(req,res){
        openfile.readfile('./views/login2.html',getRecall(req,res));
    },
    //注册
    register: function(req,res){
        openfile.readfile('./views/register.html',getRecall(req,res));
    },
    //异步写文件
    writefile: function(req,res){
        var content = '哈哈哈,写文件成功2!';
        openfile.writefile('./views/one.txt',content,getRecall(req,res));
    },
    showimg: function(req,res){
        openfile.readImg('./images/pig.png',res);
        console.log('访问图片');
    },
    showimg2: function(req,res){
        openfile.readImg('./images/font.png',res);
        console.log('img2');
    }
};

//操作文件的方式
function getRecall(req,res){
    //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    function recall(data){
        res.write(data);
        res.end('');
    }
    return recall;
}
