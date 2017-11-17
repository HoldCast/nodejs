/**
 * 模块引入
 */
module.exports={
    expfun: function(flag){
        if(flag==0){
            throw  '我是例外';
        }
        return  "success";
    }
};