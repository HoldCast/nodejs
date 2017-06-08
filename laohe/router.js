//-----------------router.js--------------------------------


//路由读取文件,添加需要打开的页面或者读取的文件方法
var openfile = require('./models/optfile');
var url  =  require('url');
var querystring  =  require('querystring');  //post需导入

module.exports = {
    //提交
    submit: function(req,res){
        //---------GET方式--------
        /*
         var rdata = url.parse(req.url,true).query;
         console.log('GET收到的参数:',rdata);
         */
        //-----------POST方式------------
        var post = '';          //定义了一个post变量，用于暂存请求体的信息
        req.on('data', function (chunk) {        //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            post += chunk;
        });
        //-------注意异步-------------
        req.on('end', function () {        //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            post = querystring.parse(post);
            setTimeout(function(){
                console.log('POST收到的参数:',post);
                //显示页面
                if(post.user){
                    openfile.readfile('./views/result1.html',getRecall(req,res));
                }else{
                    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                    res.write('请填写表单元素');
                    res.end('');
                }
            },1000);
        });
    },
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
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    function recall(data){
        res.write(data);
        res.end('');
    }
    return recall;
}

