// JS 是动态语言
var bar;
console.log(typeof bar);
// undefined 调用栈执行上下文里顺手就存了
bar = 12;   // number
console.log(typeof bar);
bar = "极客时间";
console.log(typeof bar);
bar = true;
console.log(typeof bar);
bar = null;
console.log(typeof bar);   // Object JS设计的bug
// JS 的值是用“类型标签 + 值”存储的
// 低位的几个 bit 作为类型标记（tag bits）
// 二进制 tag（示例） 对象: 000 ,整数: 001 ,字符串: 010 ...
// 而 null 被设计为了全是 0 ，那么二进制 tag也肯定为000，所以 typeof null 是 Object
// 可以用 Object.prototype.toString.call() 来判断类型
bar = {name: "极客时间"};
console.log(typeof bar);