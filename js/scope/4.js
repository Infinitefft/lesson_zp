let name = "sss";

function showName() {
    console.log(name);
    if (false) {   // 块级作用域
        let name = "eee";    // 编译阶段会变量提升，但是赋值不会提升
    }
}

showName();