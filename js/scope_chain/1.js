function bar() {
    console.log(myname);
}
function foo() {
    var myname = 'foo';
    bar();  // 执行时
}
var myname = 'global';
foo();