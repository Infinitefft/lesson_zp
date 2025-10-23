// null 和 undefined
// 变量声明了但没赋值，类型无法确定，是undefined
// 或对象属性/数组元素不存在，
// JS 弱类型语言
let a;
console.log(a);
a = 1; // 变量的类型由值决定
console.log(typeof a);

let object = {
    name: 'aaa',
}
console.log(object.girlfriend,'///');

// null 表示一个空值 不是未定义
// 有值
// 主动赋值给变量，表示这个值是空的。
let b = '原有的值';
b = null;
console.log(b);