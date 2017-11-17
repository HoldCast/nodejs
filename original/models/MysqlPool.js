
/**
* 连接mysql
*/

const mysql = require('mysql');  //调用MySQL模块
class MysqlPool{
    constructor(){
        this.flag = true; //是否连接过
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'learn',
            port: '3306'
        });
    }
    getPool(){
        if (this.flag) {
            //监听connection事件 this.pool.connect(function(){});
            this.pool.on('connection', function (connection) {
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            });
        }
        return this.pool;
    }
}
module.exports = MysqlPool;

/* //引用
const MysqlPool = require('./models/MysqlPool');
const db =  new MysqlPool().getPool();
db.query(`SELECT * FROM admin_table`, (err, data)=>{});
* */

