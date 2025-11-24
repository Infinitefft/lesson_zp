const s1 = Symbol('二哈');
const s2 = Symbol('二哈');
console.log(s1 === s2);
const secretKey = Symbol('secret');
console.log(secretKey, "/////");

// 多人协作之中 Why Symbol ?
// 动态  不太安全？
// key string 类型  | Symbol
const a = 'ecut';
const user = {
    [secretKey]: '123456',
    email: '456@gamil.com',
    name: 'aaa',
    a: '456',
    [a]: '123',
}
// user[a] = '123';
console.log(user.ecut, "|", user[a]);

user.email = '123@qq.com';