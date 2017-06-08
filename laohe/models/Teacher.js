//-------------------models/Teacher.js---------  
var  User  =  require('./User');
function  Teacher(id,name,age){
    User.apply(this,[id,name,age]); //继承
    this.teach=function(res){
        res.write(this.name+"老师讲课,id:"+this.id+'年龄:'+this.age);
    }
}
module.exports    =    Teacher;