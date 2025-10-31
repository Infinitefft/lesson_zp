// 坚持一种风格，遵守公司代码风格
let str1 = "hello world";
let str2 = 'hello world';
// es6 模板字符串
// 其他大型语言都有字符串模板功能，js 不再去拼接
let w = 'world';
let str4 = "hello" + w; // es5
let str3 = `hello ${w}`;  // es6
// String 类 string 类型
// 字符串对象
let str5 = new String("abc");
console.log(str5, 
    str5.valueOf(),
    typeof str5,
    Object.prototype.toString.call(str5),
);
// 为什么？
console.log(str4.length, str5.length);