/**
 * Created by Administrator on 2016/12/4.
 */
module.exports={
    expfun: function(flag){
        if(flag==0){
            throw  '我是例外';
        }
        return  "success";
    }
};