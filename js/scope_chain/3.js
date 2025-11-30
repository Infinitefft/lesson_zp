// 特殊的地方

function foo() {
    var myname = 'foo';
    let test1 = 1;
    const test2 = 2;
    var innerBar = {    // 声明在栈内存，存的是指针，值在堆内存
        getName() {
            console.log(test1);
            return myname;
        },
        setName(newname) {
            myname = newname;
        }
    }
    // return 可以被外部访问
    return innerBar;   // 闭包形成的条件 函数嵌套函数
}
// bar 是innerBar对象的一个引用
var bar = foo();   // foo 出栈
// bar 里面的变量要垃圾回收吧？ 不会回收
bar.setName('bar');   // setName 的执行上下文会创建
bar.getName();
console.log(bar.getName());