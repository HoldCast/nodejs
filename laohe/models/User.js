//--------------User.js--------------  
function  User(id,name,age){
    this.id=id;
    this.name=name;
    this.age=age;
    this.enter=function(res){
        res.write(this.name+"进入图书馆,年龄"+this.age);
        res.write('<br\>');
    }
}
module.exports    =    User;