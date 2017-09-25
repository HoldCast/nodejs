const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');
var objMulter = multer({dest: './www/upload/'});
var server = express();

//错误
server.use(bodyParser.urlencoded({extended: false}));
server.use(objMulter.any());

server.post('/', function (req, res) {
    //新文件名
    //'./www/upload/dfb33662df86c75cf4ea8197f9d419f9' + '.png'
    console.log(req.files);
    var files = req.files;
    for (var i = 0; i < files.length; i++) {
        var fileItem = files[i];
        console.log(i,fileItem);
        var newName = fileItem.path + pathLib.parse(fileItem.originalname).ext;
        //重命名
        fs.rename(fileItem.path, newName, function (err) {
            if (err)
                res.send('上传失败');
                return false;

        });
    }

    res.send('全部上传成功!');


    //1.获取原始文件扩展名
    //2.重命名临时文件
});

server.listen(8080);
