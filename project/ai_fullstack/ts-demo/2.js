// 强类型可以杜绝 90% 的错误
function addTs(a, b) {
    return a + b;
}
var res1 = addTs(1, 2);
// const res2 = addTs(1, "2");  // 编译错误
console.log(res1);
