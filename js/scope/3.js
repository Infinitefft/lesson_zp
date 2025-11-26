var name = "sss";

function showName() {
    console.log(name);   // undefined（第6行name会在函数作用域内提升，进行RHS查询时，会先查找函数作用域，再查找全局作用域）
    // 函数作用域中已经找到了所以全局作用域的sss就不会再查找了，所以是undefined
    if (false) {   // 块级作用域
        var name = "eee";    // 编译阶段会变量提升，但是赋值不会提升
    }
    console.log(name);
}

showName();