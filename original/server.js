const http = require('http');
const url = require('url');
const router = require('./models/router');
http.createServer(function (request, response) {
    if (request.url !== "/favicon.ico") { //清除第2此访问
        var pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');//替换掉前面的/
        console.log('pathname:',pathname);
        try {
            //通过路由处理
            router[pathname](request,response);
        } catch (err) {
            console.log('错误: ' + err);
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            response.write(err.toString());
            response.end('');
        }
        console.log("server执行完毕");
    }
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
