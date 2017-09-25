const jade=require('jade');

var str=jade.renderFile('./views/6.jade', {pretty: true}); //写入文件并美化

console.log(str);
