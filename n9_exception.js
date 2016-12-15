/**
 * Created by Administrator on 2016/12/4.
 */
//-------------n9_exception.js---------------

// 通过对异常的抛出来解决很多地方的判断!!!
var http = require('http');
var url = require('url');
var router = require('./router');
var exception = require('./models/Exception');
http.createServer(function (request, response) {
    if (request.url !== "/favicon.ico") { //清除第2此访问
        var pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');//替换掉前面的/
        try {
            //router[pathname](request,response);
            data = exception.expfun(0);
            response.write(data);
            response.end('');
        } catch (err) {
            console.log('错误: ' + err);
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            response.write(err.toString());
            response.end('');
        }
        console.log("server执行完毕");
    }
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
