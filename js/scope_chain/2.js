function bar() {
    var myname = "bar";
    let test1 = 100;
    if (1) {
        let myname = "Chrome 浏览器"
        console.log(test)    // 找到为 1，bar声明在全局作用域中，全局作用域中的test为1
    }
}
function foo() {
    var myname = "foo";
    let test = 2;
    {
        let test = 3;
        bar();
    }
}
var myname = "global";
let myAget = 10;
let test = 1;
foo();