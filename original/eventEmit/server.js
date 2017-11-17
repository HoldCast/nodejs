/*
 Events
 events.EventEmitter
 emitter.addListener(event, listener)==on //添加监听
 emitter.on(event, listener)
 emitter.once(event, listener)//一次性的监听器
 emitter.removeListener(event, listener) //删除指定监听
 emitter.removeAllListeners([event]) //删除所有监听
 emitter.setMaxListeners(n) //默认情况下当一个事件的监听超过10个时，EventEmitter 将打印警告信息，0表无限制
 emitter.listeners(event) //返回特定事件的事件监听器集合
 emitter.emit(event, [arg1], [arg2], [...])  //用提供的参数按顺序执行每个事件监听器。
 */

/*
 emitter.on('someEvent', function(arg1, arg2) {
 console.log('listener2', arg1, arg2);
 });
 emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); //抛出事件
 */
var http = require('http');
var events = require("events");
function UserBean() {
    this.eventEmit = new events.EventEmitter(); //事件发生器
    this.zhuce = function (req, res) {
        console.log("注册");
        req['uname'] = "aa";
        req['pwd'] = "bb";
        this.eventEmit.emit('zhuceSuc', '参数1', '参数2');
    };
    this.login = function (req, res) {
        console.log("登录");
        res.write("<br> 用户名:" + req['uname']);
        res.write("<br> 密码:" + req['pwd']);
        res.write("<br> 登录成功!");
    };
}

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html;  charset=utf-8'});
    if (request.url !== "/favicon.ico") {
        user = new UserBean();
        //监听事件
        user.eventEmit.once('zhuceSuc', function (uname, pwd) {
            response.write('注册成功');
            console.log(uname, pwd);
            user.login(request, response);
            response.end('');
        });//注册监听
        user.zhuce(request, response);
    }
}).listen(8000);

console.log('Server  running  at  http://127.0.0.1:8000/');

