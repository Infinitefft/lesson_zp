var users;   // 变量的类型由值决定
var data;   // undefined 栈内存
// json 数组 在堆内存中，独立于users，data 之外
// users, data 对json 数组的引用
users = [
    {
        id: 1,
        name: "qqq",
        hometown: "南昌"
    },
    {
        id: 2,
        name: "ggg",
        hometown: "赣州",
    },
    {
        id: 3,
        name: "uuu",
        hometown: "广州"
    }
]  // 存的是地址

// 如何真正的去拷贝一个对象呢？
// 向堆内存申请一个新的空间，存储拷贝后的数据
var data = JSON.parse(JSON.stringify(users));
// 序列化
data[0]['hobbies'] = ["唱歌","看烟花"];
// console.log(JSON.parse(JSON.stringify(users)));
console.log(data, users);