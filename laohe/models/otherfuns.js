//支持多个函数      
module.exports = {      
    getVisit:function(){      
    	return  visitnum ++;      
    },      
    add:function(a,b){      
    	return  a + b;      
    },
    fun1: function  (res) {
    	// body...
    	console.log('i m fun1');
    	res.write('fun1')
    },
    fun2: function  (res) {
    	// body...
    	console.log('i m fun2');
    	res.write('fun2')
    }      
}      