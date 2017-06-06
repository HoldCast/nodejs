const fs=require('fs');

//writeFile(文件名, 内容, 回调)
fs.writeFile("bbb.txt", "新动西", function (err){
  console.log(err);
});
