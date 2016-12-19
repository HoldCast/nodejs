//##先安装：
//G:\www\nodejs\study>npm install async --g

//1.串行无关联 series
var async = require('async');
function exec1() {
    async.series({
        oneFn: function (done) {
            ii = 0;
            setInterval(function () {
                console.log('aaa=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    //只有调用done,并且无异常的时候才执行two的函数,这样达到串行的目的
                    done(null, {one: "one"});
                }
            }, 1500);
        },
        twoFn: function (done) {
            jj = 0;
            setInterval(function () {
                console.log('bbb=' + new Date());
                jj++;
                if (jj > 3) {
                    clearInterval(this);
                    done(null, {two: "two"});
                }
            }, 1000);
        }
    //这里是回调
    },function (err, rs) {
        console.log('err:',err);
        console.log('res:',rs);
    });
}

//2.并行无关联 parallel
function exec2() {
    async.parallel({
        oneFn: function (done) {
            ii = 0;
            setInterval(function () {
                console.log('aaa=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    //这里出错会影响到two的回调
                    done(null, {one: "one"});
                }
            }, 1000);
        },
        twoFn: function (done) {
            jj = 0;
            setInterval(function () {
                console.log('bbb=' + new Date());
                jj++;
                if (jj > 3) {
                    clearInterval(this);
                    done(null, {two: "two"});
                }
            }, 1000);
        },
    },function(err, res) {
        console.log('err:',err);
        console.log('res:',res);
    });
}
//3.串行有关联:waterfall
function exec3() {
    async.waterfall([
        function (done) {
            ii = 0;
            setInterval(function () {
                console.log('aaa=' + new Date());
                ii++;
                if (ii == 3) {
                    clearInterval(this);
                    //这里出错会影响到two的回调
                    done(null, "one 完毕");
                }
            }, 500);
        },
        function (prev,done) {
            jj = 0;
            setInterval(function () {
                console.log('bbb=' + new Date());
                jj++;
                if (jj > 3) {
                    clearInterval(this);
                    done(null, prev + "two 完毕");
                }
            }, 500);
        },
        function (prev,done) {
            mm = 0;
            setInterval(function () {
                console.log(prev+ 'ccc=' + new Date());
                mm++;
                if (mm > 3) {
                    clearInterval(this);
                    done(null, prev + "3 完毕");
                }
            }, 500);
        }
    ],function(err, res) {
        console.log('err:',err);
        console.log('res:',res);
    });
}

exec3();