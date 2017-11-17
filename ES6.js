
/**ES6基本语法总结**/

//1.let const var
const A = '常量,不允许修改,不允许重复定义';
function b() {
    var b = '用法同ES5';
}
{
    let c = '块级作用域,不允许重复声明';
}

//2.字符串连接 反单引号
var aa = 'aa';
var aaStr = `11${aa}22`; //11aa22

//3.结构赋值 -- 模式匹配
var {a,b,c} = {a:12,b:5,c:13};
var [a,b,c] = [12,5,13];
//a//12

//4. (数组变换)...arr
var arr1 = [1,2,3];
//复制数组
var arr2 = Array.form(arr1);    //[1,2,3];
var arr3 = [...arr1];           //[1,2,3];
function fn1(...arr) {
    console.log(arr);//[1,2,3,4]
}
fn1(1,2,3,4);

//5.for of循环(只能循环数组和map), map对象
var arr1 = [11,2,3,4];
for(let name of arr1){
    console.log(name); //11,2,3,4
}
for(let name of arr1.keys()){
    console.log(name); //0,1,2,3
}
for(let name of arr1.entries()){
    console.log(name); //索引和值
}

var map = new Map(); //不能使用for in
map.set('a','aaa'); //删除map.delete('a');
map.set('b','666'); //获取map.get('a');
for(let name of map){ //默认情况下就是 for(let name of map.entries){
    console.log(name); //['a','aaa'], ['b','bbb']
}
for(let [k,v] of map){
    console.log(k,v);
}
for(let [k,v] of map.keys()){
    console.log(k,v);
}
for(let [k,v] of map.values()){
    console.log(k,v);
}


//6.箭头函数
var fn = () => {
    this.a // *** this指向window
};
var age = 20;
var name = 'job';
var person = {
    age,
    name,
    show: () => {
        alert(this.name);
    }
};
person.show();

//7.面向对象 -- 类 -- 构造函数 --函数给默认值
//原写法
function Person1(age,name){
    this.age = age;
    this.name = name;
}
Person1.prototype.showAge = function () {
    alert(this.age);
};
//ES5继承
function Work1(name,age) {
    Person1.apply(this,arguments);
}
Work1.prototype = new Person1();

//ES6
class Person2{
    constructor(name='tom',age=0){
        this.name = name;
        this.age = age;
    }
    showAge(){
        alert(this.age);
    }

}
//var p1 = new Person2('aaa', 1);
//p1.showAge();

//ES6继承
class work2 extends Person2{
    constructor(name='w2',age=32,job='上班'){
        super(name,age);
        this.job = job;

    }
    showJob(){
        alert(this.job);
    }
}
var p2 = new work2('bbb', 36);
p2.showAge();
p2.showJob();

//8.模块和引入模块
/*a.js
//const a = 'a';
//export default a;
//export default function();
//export default {};
* */
//<script src="traceur.js"></script>
//<script src="bootstrap.js"></script>
//<script type="module">
//import modelA from './a.js';
//console.log(modelA); //'a';
// </script>

//9.promise
var p1 = new Promise(function (resolve,reject) {
    resolve('success'); //成功了调用
    //reject('fail'); //失败了调用
});

p1.then(function (value) {
    alert(value);   //success
    return value + 1;
},function (value) {
    alert(value);   //fail
    throw 'err';
}).then(function (value) {
    alert(value);   //success1
}).catch(function (e) {
    console.log(e); //err
});
//异步读取文件
const fs = require('fs');
fs.readFile('1.html',function (err,data) {
    var p1 = new Promise(function (resolve,reject) {
        if(err){
            reject(err);
        }else{
            resolve(data.toString());
        }
    });
    p1.then(function (value) {
        console.log(value);
    },function (value) {
        console.log('err:'+value);
    })
});
//all
var p1 = new Promise();
var p2 = new Promise();
var pAll = Promise.all([p1,p2]).then(function (value) {
    console.log(value); //p1.p2全部返回resolve,就进这里
},function (value) {
    console.log(value); //否则走这里
});
Promise.race([p1,p2]);  //返回的是最先能执行的promise
Promise.reject().then();       //返回失败
Promise.resolve().then();      //返回成功

//10.Generrator -- 生成器(* yield)
function* show() {
    yield 1;    //yield本身没有返回值(undefined)
    yield 2;
    yield 3;
    yield 4;
    //return 5;
}
var res = show();
console.log(res.next());//{value: 1, done: false}
console.log(res.next());//{value: 2, done: false}
console.log(res.next());//{value: 3, done: false}
console.log(res.next());//{value: 4, done: false}
console.log(res.next());//{value: undefined/5, done: true}
//next可以带参数,给上一个yield值

for(let v of show()){
    console.log(v); //1,2,3,4
}
var json = {
    *show(){
        yield 1;    //yield本身没有返回值(undefined)
        yield 2;
        yield 3;
        yield 4;
    }
};



