// 会有歧义？
// 大型语言 变量应该先声明，再使用
// console.log(age);   //undefined
// age = 18;   
// var age;   // 变量提升
// JS 脚本语言，它的编译阶段和执行阶段不像JAVA/C++ 一样分开的那么清晰
// 编译阶段有，就在代码执行的一霎那，var 就变量提升了
// 接下来代码进入执行阶段 赋值发生在执行阶段
// 变量提升 不利于代码的可读性，应该废弃的糟粕
// console.log(height);  // 报错 ReferenceError(TDZ)
// 暂时性死区
// 在编译阶段的变量提升是为了编译阶段就知道有哪些变量
// let/const + 暂时性死区 解决了变量提升的问题
console.log(PI);
let height = 188;
const PI = 3.141592;