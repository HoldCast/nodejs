//--------------------n2_funcall.js---------------------------------    
var    http    =    require('http');    
var    otherfun    =    require('./models/otherfuns');      
http.createServer(function    (request,    response)    {      
        response.writeHead(200,    {'Content-Type':    'text/html;    charset=utf-8'});      
    if(request.url!=="/favicon.ico"){    //清除第2此访问  
        //otherfun.controller(request,response);  
        //otherfun.call(response); 
        otherfun.fun1(response); 
        otherfun.fun2(response); 
        response.end('');    
    }  
}).listen(8000);      
console.log('Server    running    at    http://127.0.0.1:8000/');    
//---普通函数      
function  fun1(res){      
    res.write("你好,我是fun1");      
}      
      
//-------------------models/otherfuns.js--------------------------      
function  controller(req,res){      
    //res.write("发送");      
    call('hello',req,res);      
    res.end("");      
}      
function  call(res){      
    console.log('call');      
}      
