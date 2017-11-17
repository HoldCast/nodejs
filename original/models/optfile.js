
/**
* 操作文件
* */

const fs = require('fs');
module.exports = {
    readfile: function (path, recall) {          //异步执行
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log('异步读文件错误!',err);
                recall(err.toString());
            } else {
                recall(data);
                console.log('异步读文件成功!');
            }
        });
        console.log("异步方法执行完毕");
    },
    readfileSync: function (path) {//同步读取
        let data = fs.readFileSync(path, 'utf-8');
        console.log(data);
        console.log("同步方法执行完毕");
        return data;
    },
    writefile: function (path, data, recall) {//异步
        fs.writeFile(path, data, function (err) {
            if (err) {
                throw  err;
            }
            console.log('It\'s  saved!');  //文件被保存
        });
        recall('写文件成功');
    },
    writeFileSync: function (path, data) {  //同步
        fs.writeFileSync(path, data);
        console.log("同步写文件完成");
    },
    readImg: function (path, res) {
        fs.readFile(path, 'binary', function (err, file) {
            if (err) {
                console.log('读取图片错误:',err);
                res.write(err);
            } else {
                console.log("图片");
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.write(file, 'binary');
                res.end();
            }
        });
    }
};