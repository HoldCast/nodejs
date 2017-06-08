//-----------------models/UserBean.js----------------------
var events = require('events');
function UserBean() {
    this.eventEmit = new events.EventEmitter(); //事件发生器
    this.zhuce = function (req, res) {
        console.log("注册");
        req['uname'] = "aa";
        req['pwd'] = "bb";
        this.eventEmit.emit('zhuceSuc', '张三', '123456');  //抛出事件消息

    };

    this.login = function (req, res) {
        console.log("登录");
        res.write("<br> 用户名:" + req['uname']);
        res.write("<br> 密码:" + req['pwd']);
        res.write("<br> 登录成功!");
    };
}

module.exports = UserBean;