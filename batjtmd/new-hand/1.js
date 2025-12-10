function add() {
    // let res = 0;
    // // length arguments[i] 数组
    // for (let i = 0; i < arguments.length; i++) {
    //     res += arguments[i];
    // }
    // return res;
    // console.log(arguments.__proto__);
    // return arguments.reduce((s, x) => s + x, 0);
    console.log(JSON.stringify(arguments));
    console.log(JSON.stringify([1, 2, 3]));
    const args = [...arguments];
    console.log(args,
        Object.prototype.toString.call(args),
        args instanceof Array
    )
}
console.log(add(1, 2));
console.log(add(1, 2, 3));
console.log([1, 2, 3, 4, 5 ,6].reduce((s, x) => s + x, 0));