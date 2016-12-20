//1.安装mysql支持
/**   npm install mysql  **/
//2.安装node.js的mysqlpool模块
/** npm install -g node-mysql   //-g表全局   */
//3.创建连接池类
/** models/OptPool.js   */
//4.调用：
var OptPool = require('./models/OptPool');
var optPool = new OptPool();
var pool = optPool.getPool();

//执行SQL语句

pool.getConnection(function(err,conn){
    //----插入
    var userAddSql = 'insert into user (uname,pwd) values(?,?)';
    var param = ['eee','eee'];
    /*conn.query(userAddSql,param,function(err,rs){
        if(err){
            console.log('insert err:',err.message);
            return;
        }
        console.log('insert success');
        //conn.release(); //放回连接池
    });*/
    //查询
    conn.query('SELECT * from user', function(err, rs) {
        if (err) {
            console.log('[query] - :'+err);
            return;
        }
        for(var i=0;i<rs.length;i++){
            console.log(rs[i]);
        }
        conn.release(); //放回连接池
    });
});

