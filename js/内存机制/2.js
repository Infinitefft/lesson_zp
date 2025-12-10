function foo() {
    var a = {name: "极客时间"}
    var b = a;  // 引用式拷贝
    a.name = '极客帮';
    console.log(a);
    console.log(b);
}
foo();