const crypto=require('crypto');   //加密库(内置库)

var obj=crypto.createHash('md5'); //散列算法

obj.update('123456');

var str=obj.digest('hex');  //16进制

console.log(str);
